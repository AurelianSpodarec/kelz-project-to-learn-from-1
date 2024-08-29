import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useLocation, useHistory } from "react-router-dom"
import queryString from "query-string"
import { get } from "lodash"
import { useGet, usePatch, useDelete, ApiError, usePost } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"
import { usePrevious } from "@4cplatform/elements/Hooks"

// Components
import { Provider } from "../../../../../UI/Templates/AgencyCodes"

// Helpers
import { PageContext } from "../../../../../UI/Organisms"
import { getOrderBy } from "../../../../../UI/Helpers"
import reducer from "./agencyCodes.reducer"

const AgencyCodesProvider = ({ isPending, children }) => {
  // State
  const [
    {
      data,
      viewData,
      search,
      selectedAgencyCode,
      sorting,
      page,
      perPage,
      total,
      activateModal,
      declineModal,
      suspendModal,
      deleteModal,
      viewDeal
    },
    dispatch
  ] = React.useReducer(reducer, {
    data: [],
    viewData: {},
    search: "",
    selectedAgencyCode: null,
    sorting: { direction: "asc", dataKey: "product_type" },
    page: 1,
    perPage: 10,
    total: null,
    activateModal: false,
    declineModal: false,
    suspendModal: false,
    deleteModal: false,
    viewDeal: { isOpen: false, slug: null }
  })

  const { addAlert } = React.useContext(AlertsContext)
  const { setPanelStatus } = React.useContext(PageContext)
  const t = useTranslations()
  const location = useLocation()
  const history = useHistory()
  const prevSelectedAgencyCode = usePrevious(selectedAgencyCode)
  const qs = queryString.parse(location.search)

  // Use efect for removing qs when closing panel with tabs
  useEffect(() => {
    if (
      selectedAgencyCode === null &&
      selectedAgencyCode !== prevSelectedAgencyCode &&
      prevSelectedAgencyCode !== undefined
    ) {
      history.replace({
        search: queryString.exclude(location.search, ["agency_codes_panel"])
      })
    }
  }, [prevSelectedAgencyCode, selectedAgencyCode, history, location])

  // Index Agency Codes query
  const {
    loading: queryLoading,
    error: queryError,
    refetch: queryRefetch
  } = useGet({
    endpoint: "/agency-codes",
    query: {
      limit: perPage,
      order_by: getOrderBy(sorting),
      pending: isPending,
      page,
      with: ["owner", "provider"]
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Agency Code data query
  const {
    loading: viewLoading,
    error: viewError,
    refetch: viewRefetch
  } = useGet({
    endpoint: "/agency-codes/:slug",
    skip: !selectedAgencyCode,
    params: {
      slug: get(selectedAgencyCode, "slug", "")
    },
    query: {
      with: ["provider", "owner"]
    },
    onCompleted: res => {
      const newData = get(res, "data", {})
      dispatch({ type: "UPDATE_VALUE", key: "viewData", value: newData })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODE_VIEW_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Activate Agency Code addition mutation
  const [onActivate, { loading: activateLoading, error: activateError }] = usePatch({
    endpoint: "/agency-codes/:slug/activate",
    params: {
      slug: get(selectedAgencyCode, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("AGENCY_CODE_ACTIVATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      viewRefetch()
      queryRefetch()
      setPanelStatus("closed")
      dispatch({ type: "ACTIVATE_AGENCY_CODE" })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODE_ACTIVATE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Decline Agency Code addition mutation
  const [onDecline, { loading: declineLoading, error: declineError }] = usePatch({
    endpoint: "/agency-codes/:slug/decline",
    params: {
      slug: get(selectedAgencyCode, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("AGENCY_CODE_DECLINE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      viewRefetch()
      queryRefetch()
      setPanelStatus("closed")
      dispatch({ type: "DECLINE_AGENCY_CODE" })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODE_ACTIVATE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Suspend Agency Code mutation
  const [onSuspend, { loading: suspendLoading, error: suspendError }] = usePatch({
    endpoint: "/agency-codes/:slug/suspend",
    params: {
      slug: get(selectedAgencyCode, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("AGENCY_CODE_SUSPEND_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      viewRefetch()
      queryRefetch()
      setPanelStatus("closed")
      dispatch({ type: "SUSPEND_AGENCY_CODE" })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODE_SUSPEND_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Delete Agency Code mutation
  const [onDelete, { loading: deleteLoading, error: deleteError }] = useDelete({
    endpoint: "/agency-codes/:slug",
    params: {
      slug: get(selectedAgencyCode, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("AGENCY_CODE_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      queryRefetch()
      setPanelStatus("closed")
      dispatch({ type: "DELETE_AGENCY_CODE" })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODE_DELETE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Index deal codes from agency codes query
  const {
    data: assignedDealCodes,
    loading: assignedDealCodesLoading,
    error: assignedDealCodesError,
    refetch: refetchAssignedDealCodes
  } = useGet({
    endpoint: "/agency-codes/:slug/deal-codes",
    params: {
      slug: get(selectedAgencyCode, "slug", "")
    },
    onError: () => {
      addAlert({
        message: t("DEAL_CODES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(selectedAgencyCode, "slug", "") || get(qs, "agency_codes_panel") !== "deal_codes"
  })

  // Index available deal codes from agency codes query
  const {
    data: availableDealCodes,
    loading: availableDealCodesLoading,
    error: availableDealCodesError,
    refetch: refetchAvailableDealCodes
  } = useGet({
    endpoint: "/agency-codes/:slug/available-deal-codes",
    params: {
      slug: get(selectedAgencyCode, "slug", "")
    },
    onError: () => {
      addAlert({
        message: t("DEAL_CODES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(selectedAgencyCode, "slug", "")
  })

  // Suspend deal code mutation
  const [suspendDealCode, { loading: suspendDealCodeLoading, error: suspendDealCodeError }] =
    usePost({
      endpoint: "/agency-codes/:slug/deal-codes/:deal/suspend",
      params: {
        slug: get(selectedAgencyCode, "slug", ""),
        deal: get(viewDeal, "slug", null)
      },
      onCompleted: () => {
        addAlert({
          message: t("DEAL_CODE_SUSPEND_SUCCESS"),
          type: "success",
          dismissible: true,
          timeout: 5
        })
        refetchAssignedDealCodes()
        refetchAvailableDealCodes()
        dispatch({ type: "UPDATE_VALUE", key: "viewDeal", value: { isOpen: false, slug: null } })
      },
      onError: () => {
        addAlert({
          message: t("DEAL_CODE_SUSPEND_ERROR"),
          type: "error",
          dismissible: true,
          timeout: 5
        })
      }
    })

  // Reinstate deal code mutation
  const [reinstateDealCode, { loading: reinstateDealCodeLoading, error: reinstateDealCodeError }] =
    usePost({
      endpoint: "/agency-codes/:slug/deal-codes/:deal/reinstate",
      params: {
        slug: get(selectedAgencyCode, "slug", ""),
        deal: get(viewDeal, "slug", null)
      },
      onCompleted: () => {
        addAlert({
          message: t("DEAL_CODE_REINSTATE_SUCCESS"),
          type: "success",
          dismissible: true,
          timeout: 5
        })
        refetchAssignedDealCodes()
        refetchAvailableDealCodes()
        dispatch({ type: "UPDATE_VALUE", key: "viewDeal", value: { isOpen: false, slug: null } })
      },
      onError: () => {
        addAlert({
          message: t("DEAL_CODE_REINSTATE_ERROR"),
          type: "error",
          dismissible: true,
          timeout: 5
        })
      }
    })

  // Unassign deal code mutation
  const [unassignDealCode, { loading: unassignDealCodeLoading, error: unassignDealCodeError }] =
    usePost({
      endpoint: "/agency-codes/:slug/deal-codes/:deal/unassign",
      params: {
        slug: get(selectedAgencyCode, "slug", ""),
        deal: get(viewDeal, "slug", null)
      },
      onCompleted: () => {
        addAlert({
          message: t("DEAL_CODE_UNASSIGN_SUCCESS"),
          type: "success",
          dismissible: true,
          timeout: 5
        })
        refetchAssignedDealCodes()
        refetchAvailableDealCodes()
        dispatch({ type: "UPDATE_VALUE", key: "viewDeal", value: { isOpen: false, slug: null } })
      },
      onError: () => {
        addAlert({
          message: t("DEAL_CODE_UNASSIGN_ERROR"),
          type: "error",
          dismissible: true,
          timeout: 5
        })
      }
    })

  // Assign deal code mutation
  const [assignDealCode, { loading: assignDealCodeLoading, error: assignDealCodeError }] = usePost({
    endpoint: "/agency-codes/:slug/deal-codes/:deal/assign",
    onCompleted: () => {
      addAlert({
        message: t("DEAL_CODE_ASSIGN_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      refetchAssignedDealCodes()
      refetchAvailableDealCodes()
      dispatch({ type: "UPDATE_VALUE", key: "viewDeal", value: { isOpen: false, slug: null } })
    },
    onError: () => {
      addAlert({
        message: t("DEAL_CODE_ASSIGN_ERROR"),
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
        viewData,
        selectedAgencyCode,
        sorting,
        page,
        perPage,
        total,
        queryLoading,
        queryRefetch,
        viewLoading,
        viewRefetch,
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        onAgencyCodeSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedAgencyCode", value: row }),
        onAgencyCodeDeselect: () => {
          dispatch({ type: "UPDATE_VALUE", key: "selectedAgencyCode", value: null })
          dispatch({ type: "UPDATE_VALUE", key: "viewData", value: {} })
        },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        pagination: { total, page, perPage },
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        isPending,
        activateModal,
        setActivateModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "activateModal", value: val }),
        onActivate,
        activateLoading,
        declineModal,
        setDeclineModal: val => dispatch({ type: "UPDATE_VALUE", key: "declineModal", value: val }),
        onDecline,
        declineLoading,
        suspendModal,
        setSuspendModal: val => dispatch({ type: "UPDATE_VALUE", key: "suspendModal", value: val }),
        onSuspend,
        suspendLoading,
        deleteModal,
        setDeleteModal: val => dispatch({ type: "UPDATE_VALUE", key: "deleteModal", value: val }),
        onDelete,
        deleteLoading,
        assignedDealCodes,
        assignedDealCodesLoading,
        availableDealCodes,
        availableDealCodesLoading,
        onAssignDealCode: body => {
          const deal = get(body, "deal_code_slug", "")
          assignDealCode({ params: { deal, slug: get(selectedAgencyCode, "slug", "") } })
        },
        assignDealCodeLoading,
        onUnassignDealCode: () => unassignDealCode(),
        unassignDealCodeLoading,
        onSuspendDealCode: () => suspendDealCode(),
        suspendDealCodeLoading,
        onReinstateDealCode: () => reinstateDealCode(),
        reinstateDealCodeLoading,
        viewDeal,
        setViewDeal: val => dispatch({ type: "UPDATE_VALUE", key: "viewDeal", value: val })
      }}
    >
      {children}
      <ApiError
        error={
          queryError ||
          viewError ||
          activateError ||
          declineError ||
          suspendError ||
          deleteError ||
          assignedDealCodesError ||
          availableDealCodesError ||
          suspendDealCodeError ||
          reinstateDealCodeError ||
          unassignDealCodeError ||
          assignDealCodeError
        }
      />
    </Provider>
  )
}

AgencyCodesProvider.defaultProps = {
  isPending: false,
  children: null
}

AgencyCodesProvider.propTypes = {
  isPending: PropTypes.bool,
  children: PropTypes.any
}

export default AgencyCodesProvider
