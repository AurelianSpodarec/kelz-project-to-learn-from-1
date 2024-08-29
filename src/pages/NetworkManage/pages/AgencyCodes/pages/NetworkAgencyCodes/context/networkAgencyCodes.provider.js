import React from "react"
import PropTypes from "prop-types"
import { useLocation, useHistory } from "react-router-dom"
import queryString from "query-string"
import { get } from "lodash"
import { useGet, usePatch, useDelete, ApiError, usePost } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"
import { usePrevious } from "@4cplatform/elements/Hooks"

// Components
import { Provider } from "../../../../../../../UI/Templates/AgencyCodes"

// Helpers
import { PageContext } from "../../../../../../../UI/Organisms"
import { getOrderBy } from "../../../../../../../UI/Helpers"
import { NetworkManageContext } from "../../../../../context/manage.context"
import reducer from "./networkAgencyCodes.reducer"

const NetworkAgencyCodesProvider = ({ children, isSharedWith }) => {
  // State
  const [
    {
      data,
      sharedData,
      viewData,
      search,
      selectedAgencyCode,
      sorting,
      page,
      sharedPage,
      perPage,
      sharedPerPage,
      total,
      sharedTotal,
      activateModal,
      suspendModal,
      deleteModal,
      viewDeal,
      revokeModal,
      sharedOrganisationsPage,
      sharedOrganisationsPerPage,
      sharedOrganisations,
      sharedOrganisationsTotal,
      orgVal,
      addRequestModal
    },
    dispatch
  ] = React.useReducer(reducer, {
    data: [],
    sharedData: [],
    viewData: {},
    search: "",
    selectedAgencyCode: null,
    sorting: { direction: "asc", dataKey: "product_type" },
    page: 1,
    sharedPage: 1,
    perPage: 10,
    sharedPerPage: 10,
    total: null,
    sharedTotal: null,
    activateModal: false,
    declineModal: false,
    suspendModal: false,
    deleteModal: false,
    viewDeal: { isOpen: false, slug: null },
    revokeModal: false,
    sharedOrganisationsPage: 1,
    sharedOrganisationsPerPage: 5,
    sharedOrganisations: [],
    orgVal: "",
    addRequestModal: false
  })

  const { addAlert } = React.useContext(AlertsContext)
  const { setPanelStatus } = React.useContext(PageContext)
  const { network, networkLoading } = React.useContext(NetworkManageContext)
  const t = useTranslations()
  const location = useLocation()
  const history = useHistory()
  const prevSelectedAgencyCode = usePrevious(selectedAgencyCode)
  const qs = queryString.parse(location.search)

  // Use efect for removing qs when closing panel with tabs
  React.useEffect(() => {
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
    endpoint: "/networks/:slug/agency-codes",
    params: {
      slug: get(network, "slug", "")
    },
    query: {
      limit: perPage,
      order_by: getOrderBy(sorting),
      page,
      with: ["provider"]
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
    },
    skip: !get(network, "slug", "")
  })

  // Index Shared Agency Codes query
  const {
    loading: sharedQueryLoading,
    error: sharedQueryError,
    refetch: sharedQueryRefetch
  } = useGet({
    endpoint: "/networks/:slug/shared-agency-codes",
    params: {
      slug: get(network, "slug", "")
    },
    query: {
      limit: perPage,
      order_by: getOrderBy(sorting),
      page,
      with: ["provider"]
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])

      dispatch({ type: "SHARED_FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(network, "slug", "")
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

  // Agency Code addition mutation
  const [onAddAgencyCode, { loading: addAgencyCodeLoading, error: addAgencyCodeError }] = usePost({
    endpoint: "/networks/:slug/agency-codes",
    params: {
      slug: get(network, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("AGENCY_CODE_ADD_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      queryRefetch()
      dispatch({ type: "ADD_REQUEST_AGENCY_CODE" })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODE_ADD_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Agency Code request mutation
  const [
    onRequestAgencyCode,
    { loading: requestAgencyCodeLoading, error: requestAgencyCodeError }
  ] = usePost({
    endpoint: "/networks/:slug/agency-code-requests",
    params: {
      slug: get(network, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("AGENCY_CODE_REQUEST_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "ADD_REQUEST_AGENCY_CODE" })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODE_REQUEST_ERROR"),
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
      sharedQueryRefetch()
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
      sharedQueryRefetch()
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
      sharedQueryRefetch()
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
  const [onSuspendDealCode, { loading: suspendDealCodeLoading, error: suspendDealCodeError }] =
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
  const [
    onReinstateDealCode,
    { loading: reinstateDealCodeLoading, error: reinstateDealCodeError }
  ] = usePost({
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
  const [onUnassignDealCode, { loading: unassignDealCodeLoading, error: unassignDealCodeError }] =
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

  // Get organisations shared with
  const {
    loading: sharedOrganisationsLoading,
    error: sharedOrganisationsError,
    refetch: sharedOrganisationsRefetch
  } = useGet({
    endpoint: "/networks/:slug/agency-codes/:code/organisations-shared-with",
    params: {
      slug: get(network, "slug", ""),
      code: get(selectedAgencyCode, "slug", "")
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])

      dispatch({ type: "FETCH_SHARED_ORGANISATIONS_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("NETWORK_SHARED_ORGANISATIONS_INDEX_ERROR"),
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(network, "slug", "") || !get(selectedAgencyCode, "slug", "")
  })

  // Share an agency code
  const [share, { loading: shareLoading, error: shareError }] = usePost({
    endpoint: "/networks/:slug/agency-codes/:code/share",
    params: {
      slug: get(network, "slug", ""),
      code: get(selectedAgencyCode, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("AGENCY_CODE_SHARE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      viewRefetch()
      queryRefetch()
      sharedQueryRefetch()
      sharedOrganisationsRefetch()
      setPanelStatus("open")
    }
  })

  // Revoke all agency code shares
  const [revoke, { loading: revokeLoading, error: revokeError }] = usePost({
    endpoint: "/networks/:slug/agency-codes/:code/revoke-shares",
    params: {
      slug: get(network, "slug", ""),
      code: get(selectedAgencyCode, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("AGENCY_CODE_SHARE_REVOKE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      viewRefetch()
      queryRefetch()
      sharedQueryRefetch()
      sharedOrganisationsRefetch()
      setPanelStatus("open")
      dispatch({ type: "UPDATE_VALUE", key: "revokeModal", value: false })
    }
  })

  // Get member organisations
  const {
    data: organisations,
    loading: suggestionsLoading,
    error: suggestionsError
  } = useGet({
    endpoint: "/networks/:slug/agency-codes/:code/organisations-not-shared-with",
    params: {
      slug: get(network, "slug", ""),
      code: get(selectedAgencyCode, "slug", "")
    },
    query: {
      name: orgVal,
      limit: 5,
      member_organisations: true
    },
    skip: !orgVal
  })

  return (
    <Provider
      value={{
        data: isSharedWith ? sharedData : data,
        viewData,
        selectedAgencyCode,
        sorting,
        page: isSharedWith ? sharedPage : page,
        perPage: isSharedWith ? sharedPerPage : perPage,
        total: isSharedWith ? sharedTotal : total,
        queryRefetch: isSharedWith ? sharedQueryRefetch : queryRefetch,
        queryLoading: queryLoading || networkLoading || sharedQueryLoading,
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
        pagination: isSharedWith
          ? { total: sharedTotal, page: sharedPage, perPage: sharedPerPage }
          : { total, page, perPage },
        setPage: val =>
          dispatch({ type: "UPDATE_VALUE", key: isSharedWith ? "sharedPage" : "page", value: val }),
        setPerPage: val =>
          dispatch({
            type: "UPDATE_VALUE",
            key: isSharedWith ? "sharedPerPage" : "perPage",
            value: val
          }),
        activateModal,
        setActivateModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "activateModal", value: val }),
        onActivate,
        activateLoading,
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
        onUnassignDealCode,
        unassignDealCodeLoading,
        onSuspendDealCode,
        suspendDealCodeLoading,
        onReinstateDealCode,
        reinstateDealCodeLoading,
        viewDeal,
        setViewDeal: val => dispatch({ type: "UPDATE_VALUE", key: "viewDeal", value: val }),
        onSubmitShare: body => share({ body }),
        shareLoading,
        onRevokeShares: () => revoke(),
        revokeModal,
        setRevoke: val => dispatch({ type: "UPDATE_VALUE", key: "revokeModal", value: val }),
        revokeLoading,
        sharedOrganisations,
        sharedOrganisationsLoading,
        sharedOrganisationsPagination: {
          total: sharedOrganisationsTotal,
          page: sharedOrganisationsPage,
          perPage: sharedOrganisationsPerPage
        },
        setSharedOrganisationsPage: val =>
          dispatch({ type: "UPDATE_VALUE", key: "sharedOrganisationsPage", value: val }),
        setSharedOrganisationsPerPage: val =>
          dispatch({ type: "UPDATE_VALUE", key: "sharedOrganisationsPerPage", value: val }),
        organisations,
        suggestionsLoading,
        orgVal,
        setOrgVal: val => dispatch({ type: "UPDATE_VALUE", key: "orgVal", value: val }),
        isSharedWith,
        addRequestModal,
        setAddRequestModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "addRequestModal", value: val }),
        onAddAgencyCode,
        addAgencyCodeLoading,
        onRequestAgencyCode,
        requestAgencyCodeLoading
      }}
    >
      {children}
      <ApiError
        error={
          queryError ||
          viewError ||
          suspendError ||
          activateError ||
          deleteError ||
          assignedDealCodesError ||
          availableDealCodesError ||
          suspendDealCodeError ||
          reinstateDealCodeError ||
          unassignDealCodeError ||
          assignDealCodeError ||
          sharedOrganisationsError ||
          shareError ||
          revokeError ||
          suggestionsError ||
          sharedQueryError ||
          addAgencyCodeError ||
          requestAgencyCodeError
        }
      />
    </Provider>
  )
}

NetworkAgencyCodesProvider.defaultProps = {
  children: null,
  isSharedWith: false
}

NetworkAgencyCodesProvider.propTypes = {
  children: PropTypes.any,
  isSharedWith: PropTypes.bool
}

export default NetworkAgencyCodesProvider
