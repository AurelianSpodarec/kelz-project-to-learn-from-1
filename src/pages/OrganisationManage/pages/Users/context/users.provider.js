import React, { useReducer, useEffect, useContext } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"
import { get, findIndex, isEmpty, find } from "lodash"
import { useGet, usePatch, ApiError, usePost } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"
import { ConfigContext } from "@4cplatform/elements/Config"

// Components
import { Provider } from "../../../../../UI/Templates/UserAdmin"

// Helpers
import reducer from "./users.reducer"
import { PageContext } from "../../../../../UI/Organisms"
import { getOrderBy } from "../../../../../UI/Helpers"
import { OrganisationManageContext } from "../../../context/manage.context"

const OrganisationUsersProvider = ({ children }) => {
  const { API_SCOPE } = useContext(ConfigContext)
  const { addAlert } = useContext(AlertsContext)
  const { setPanelStatus } = useContext(PageContext)
  const { organisation } = useContext(OrganisationManageContext)

  const { pathname } = useLocation()
  const t = useTranslations()

  // State
  const [
    { page, perPage, showDeleted, search, selectedUser, sorting, total, data, createUserRoute },
    dispatch
  ] = useReducer(reducer, {
    page: 1,
    perPage: 10,
    showDeleted: false,
    search: "",
    selectedUser: null,
    sorting: { direction: "asc", dataKey: "last_name" },
    total: null,
    data: [],
    createUserRoute: null
  })

  useEffect(() => {
    if (get(organisation, "id", false))
      dispatch({
        type: "UPDATE_VALUE",
        key: "createUserRoute",
        value: `${pathname}/users/add?parent_id=${get(organisation, "id")}`
      })
  }, [organisation, pathname])

  // Index Users query
  const { loading, error, refetch } = useGet({
    endpoint: "/users",
    query: {
      last_name: search,
      page,
      limit: perPage,
      deleted: showDeleted,
      parent_type: "ORGANISATION",
      parent_name: get(organisation, "name", ""),
      order_by: getOrderBy(sorting),
      with: ["settings"]
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: "There was an error fetching the users",
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Optional function for firing after update actions
  const onPatch = async (user = {}) => {
    if (isEmpty(user)) {
      await refetch()
    } else {
      const i = findIndex(data, { slug: get(user, "slug") })
      dispatch({
        type: "UPDATE_VALUE",
        key: "data",
        value: [...data.slice(0, i), user, ...data.slice(i + 1)]
      })
    }
    setPanelStatus("closed")
  }

  // Edit User mutation
  const [onEditUserSubmit, { loading: editLoading, error: editError }] = usePatch({
    endpoint: "/users/:slug",
    params: {
      slug: get(selectedUser, "slug", "")
    },
    onCompleted: res => {
      // Display success message
      addAlert({
        message: "User successfully edited",
        type: "success",
        dismissible: true,
        timeout: 5
      })
      onPatch(get(res, "data"))
    },
    onError: () => {
      addAlert({
        message: "There was an error updating the user",
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Reset two-factor authentication for a user
  const [
    resetTwoFactorAuthForAUser,
    { loading: twoFactorResetLoading, error: twoFactorResetError }
  ] = usePatch({
    endpoint: "/auth/two-factor-authentication/:user/reset",
    params: {
      user: get(selectedUser, "slug", "")
    },
    onCompleted: () => {
      // Display success message
      addAlert({
        message: t("TWOFA_RESET_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
    },
    onError: () => {
      addAlert({
        message: t("TWOFA_RESET_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Resend Confirmation
  const [
    resendConfirmation,
    { loading: resendConfirmationLoading, error: resendConfirmationError }
  ] = usePost({
    endpoint: "/auth/user-activation/:id/resend",
    params: {
      id: get(selectedUser, "id", "")
    },
    body: {
      email: get(selectedUser, "email", ""),
      scope: "4c-api"
    },
    onCompleted: () => {
      // Display success message
      addAlert({
        message: t("RESEND_CONFIRMATION_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
    },
    onError: () => {
      addAlert({
        message: t("RESEND_CONFIRMATION_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Reset Password Request
  const [
    resetPasswordRequest,
    { loading: resetPasswordRequestLoading, error: resetPasswordRequestError }
  ] = usePost({
    endpoint: "/auth/forgotten-password",
    body: { email: get(selectedUser, "email", ""), scope: API_SCOPE },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("ADMIN_FORGOTTEN_PASSWORD_SUCCESS")
      })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("ADMIN_FORGOTTEN_PASSWORD_ERROR")
      })
    }
  })

  const simulationModeId = get(
    find(get(selectedUser, "settings", []), ["key", "SIMULATION_MODE"]),
    "id",
    ""
  )
  const simulationModeValue = get(
    find(get(selectedUser, "settings", []), ["key", "SIMULATION_MODE"]),
    "data.value",
    false
  )

  // Toggle simulation mode
  const [toggleSimulation, { loading: toggleSimulationLoading, error: toggleSimulationError }] =
    usePatch({
      endpoint: "/users/:user/settings/:id",
      params: {
        user: get(selectedUser, "slug", ""),
        id: simulationModeId
      },
      body: {
        data: {
          value: !simulationModeValue
        }
      },
      onCompleted: () => {
        // Display success message
        addAlert({
          message: !simulationModeValue
            ? t("SIMULATION_MODE_ENABLE_SUCCESS")
            : t("SIMULATION_MODE_DISABLE_SUCCESS"),
          type: "success",
          dismissible: true,
          timeout: 5
        })
        onPatch()
      },
      onError: () => {
        addAlert({
          message: !simulationModeValue
            ? t("SIMULATION_MODE_ENABLE_ERROR")
            : t("SIMULATION_MODE_DISABLE_ERROR"),
          type: "error",
          dismissible: true,
          timeout: 5
        })
      }
    })

  return (
    <Provider
      value={{
        data,
        queryLoading: loading,
        editLoading,
        editError,
        error,
        onEditUserSubmit,
        selectedUser,
        twoFactorResetLoading,
        resetTwoFactorAuthForAUser,
        resendConfirmation,
        resendConfirmationLoading,
        toggleSimulation,
        toggleSimulationLoading,
        resetPasswordRequest,
        resetPasswordRequestError,
        resetPasswordRequestLoading,
        onUserSelect: row => dispatch({ type: "UPDATE_VALUE", key: "selectedUser", value: row }),
        onUserDeselect: () => dispatch({ type: "UPDATE_VALUE", key: "selectedUser", value: null }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total, page, perPage },
        showDeleted,
        setShowDeleted: val => dispatch({ type: "UPDATE_SHOW_DELETED", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        onPatch,
        createUserRoute,
        sorting
      }}
    >
      {children}
      <ApiError
        error={
          error ||
          editError ||
          twoFactorResetError ||
          resendConfirmationError ||
          toggleSimulationError ||
          resetPasswordRequestError
        }
      />
    </Provider>
  )
}

OrganisationUsersProvider.defaultProps = {
  children: null
}

OrganisationUsersProvider.propTypes = {
  children: PropTypes.any
}

export default OrganisationUsersProvider
