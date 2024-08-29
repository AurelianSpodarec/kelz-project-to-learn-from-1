import React, { useContext, useReducer } from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import { usePost, usePatch, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { AuthContext } from "@4cplatform/elements/Auth"
import { useTranslations } from "@4cplatform/elements/Translations"
import { Provider } from "../../../../../UI/Templates/MyAccountDetails"

// Helpers
import { PageContext } from "../../../../../UI/Organisms"
import reducer from "./details.reducer"

const SelfServiceProvider = ({ children }) => {
  const { authUserRefetch } = useContext(AuthContext)
  const { selfServiceData, selfServiceLoading, selfServiceUpdate } = useContext(PageContext)
  const { addAlert } = useContext(AlertsContext)

  const t = useTranslations()

  // Manage state, using authUser as the default data value
  const [{ detailsOpen, changePasswordOpen, twofaOpen, twofaGoogle }, dispatch] = useReducer(
    reducer,
    {
      detailsOpen: false,
      changePasswordOpen: false,
      twofaOpen: false,
      twofaGoogle: {}
    }
  )

  // Update authenticated user
  const [onUpdateDetailsSubmit, { loading: updateLoading, error: updateError }] = usePatch({
    endpoint: "/self-service",
    onCompleted: res => {
      // Update the user in the Page state, add a success message, and close the modal
      const newUser = get(res, "data", {})
      selfServiceUpdate(newUser)
      addAlert({
        type: "success",
        message: "Your details have been successfully updated",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "detailsOpen", value: false })
    }
  })

  // Setup 2fa
  const [onTwofaSetup, { loading: twofaSetupLoading, error: twofaSetupError }] = usePost({
    endpoint: "/auth/two-factor-authentication/setup",
    onCompleted: res => {
      const google = get(res, "data", {})
      if (!isEmpty(google)) {
        dispatch({ type: "UPDATE_VALUE", key: "twofaGoogle", value: google })
      }
      authUserRefetch()
      addAlert({
        type: "success",
        message: t("TWOFA_SETUP_SUCCESS")
      })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("TWOFA_SETUP_ERROR")
      })
    }
  })

  // Complete 2fa
  const [onTwofaComplete, { loading: twofaCompleteLoading, error: twofaCompleteError }] = usePost({
    endpoint: "/auth/two-factor-authentication/complete-setup",
    onCompleted: () => {
      authUserRefetch()
      dispatch({ type: "UPDATE_VALUE", key: "twofaOpen", value: false })
      if (!isEmpty(twofaGoogle)) {
        dispatch({ type: "UPDATE_VALUE", key: "twofaGoogle", value: {} })
      }
      addAlert({
        type: "success",
        message: t("TWOFA_COMPLETE_SUCCESS")
      })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("TWOFA_COMPLETE_ERROR")
      })
    }
  })

  // Reset 2fa
  const [onTwofaReset, { loading: twofaResetLoading, error: twofaResetError }] = usePost({
    endpoint: "/auth/two-factor-authentication/reset",
    onCompleted: () => {
      authUserRefetch()
      addAlert({
        type: "success",
        message: t("TWOFA_RESET_SUCCESS")
      })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("TWOFA_RESET_ERROR")
      })
    }
  })

  // Change password
  const [onChangePassword, { loading: changePasswordLoading, error: changePasswordError }] =
    usePost({
      endpoint: "/auth/self-service/change-password",
      onCompleted: () => {
        dispatch({ type: "UPDATE_VALUE", key: "changePasswordOpen", value: false })
        addAlert({
          type: "success",
          message: t("CHANGE_PASSWORD_SUCCESS")
        })
      },
      onError: () => {
        addAlert({
          type: "error",
          message: t("CHANGE_PASSWORD_ERROR")
        })
      }
    })

  // Update settings
  const [onChangeSetting, { error: updateSettingError }] = usePatch({
    endpoint: "/users/:slug/settings/:settingID",
    params: {
      slug: get(selfServiceData, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: "Your settings have been successfully updated",
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        user: selfServiceData,
        userLoading: selfServiceLoading,
        onUpdateDetailsSubmit,
        onChangeSetting,
        updateLoading,
        toggleUpdateDetails: value => dispatch({ type: "UPDATE_VALUE", key: "detailsOpen", value }),
        detailsOpen,
        changePasswordOpen,
        toggleChangePassword: value =>
          dispatch({ type: "UPDATE_VALUE", key: "changePasswordOpen", value }),
        onChangePassword,
        changePasswordLoading,
        twofaOpen,
        toggleTwofa: value => dispatch({ type: "UPDATE_VALUE", key: "twofaOpen", value }),
        onTwofaSetup,
        twofaSetupLoading,
        twofaGoogle,
        onTwofaComplete,
        twofaCompleteLoading,
        onTwofaReset,
        twofaResetLoading
      }}
    >
      {children}
      <ApiError
        error={
          updateError ||
          changePasswordError ||
          twofaSetupError ||
          twofaCompleteError ||
          twofaResetError ||
          updateSettingError
        }
      />
    </Provider>
  )
}

SelfServiceProvider.defaultProps = {
  children: null
}

SelfServiceProvider.propTypes = {
  children: PropTypes.any
}

export default SelfServiceProvider
