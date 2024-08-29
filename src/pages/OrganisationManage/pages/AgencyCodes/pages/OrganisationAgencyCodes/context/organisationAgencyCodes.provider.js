import React from "react"
import PropTypes from "prop-types"
import { useLocation, useHistory } from "react-router-dom"
import queryString from "query-string"
import { get } from "lodash"
import { useGet, usePatch, useDelete, ApiError, usePost } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"
import { usePrevious } from "@4cplatform/elements/Hooks"
import { nullFunc } from "@4cplatform/elements/Helpers"

// Components
import { Provider } from "../../../../../../../UI/Templates/AgencyCodes"

// Helpers
import { PageContext } from "../../../../../../../UI/Organisms"
import { getOrderBy } from "../../../../../../../UI/Helpers"
import { OrganisationManageContext } from "../../../../../context/manage.context"
import reducer from "./organisationAgencyCodes.reducer"

const OrganisationAgencyCodesProvider = ({ children, type }) => {
  // State
  const [
    {
      data,
      sharedFromNetworkData,
      sharedWithUsersData,
      assignedToUsersData,
      viewData,
      search,
      selectedAgencyCode,
      sorting,
      page,
      sharedFromNetworkPage,
      sharedWithUsersPage,
      assignedToUsersPage,
      perPage,
      sharedFromNetworkPerPage,
      sharedWithUsersPerPage,
      assignedToUsersPerPage,
      total,
      sharedFromNetworkTotal,
      sharedWithUsersTotal,
      assignedToUsersTotal,
      activateModal,
      suspendModal,
      deleteModal,
      viewDeal,
      revokeModal,
      sharedUsersPage,
      sharedUsersPerPage,
      sharedUsers,
      sharedUsersTotal,
      userVal,
      addRequestModal
    },
    dispatch
  ] = React.useReducer(reducer, {
    data: [],
    sharedFromNetworkData: [],
    sharedWithUsersData: [],
    assignedToUsersData: [],
    viewData: {},
    search: "",
    selectedAgencyCode: null,
    sorting: { direction: "asc", dataKey: "product_type" },
    page: 1,
    sharedFromNetworkPage: 1,
    sharedWithUsersPage: 1,
    assignedToUsersPage: 1,
    perPage: 10,
    sharedFromNetworkPerPage: 10,
    sharedWithUsersPerPage: 10,
    assignedToUsersPerPage: 10,
    total: null,
    sharedWithUsersTotal: null,
    sharedFromNetworkTotal: null,
    assignedToUsersTotal: null,
    activateModal: false,
    declineModal: false,
    suspendModal: false,
    deleteModal: false,
    viewDeal: { isOpen: false, slug: null },
    revokeModal: false,
    sharedUsersPage: 1,
    sharedUsersPerPage: 5,
    sharedUsers: [],
    userVal: "",
    addRequestModal: false
  })

  // Values pulled from context, state, and location
  const { addAlert } = React.useContext(AlertsContext)
  const { setPanelStatus, selfServiceData: user } = React.useContext(PageContext)
  const { organisation, organisationLoading } = React.useContext(OrganisationManageContext)
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
    endpoint: "/organisations/:slug/agency-codes",
    params: {
      slug: get(organisation, "slug", "")
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
    skip: !get(organisation, "slug", "") || organisationLoading
  })

  // Agency Code addition mutation
  const [onAddAgencyCode, { loading: addAgencyCodeLoading, error: addAgencyCodeError }] = usePost({
    endpoint: "/organisations/:slug/agency-codes",
    params: {
      slug: get(organisation, "slug", "")
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
    endpoint: "/organisations/:slug/agency-code-requests",
    params: {
      slug: get(organisation, "slug", "")
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

  // Index Inherited Agency Codes query
  const {
    loading: sharedFromNetworkQueryLoading,
    error: sharedFromNetworkQueryError,
    refetch: sharedFromNetworkQueryRefetch
  } = useGet({
    endpoint: "/organisations/:slug/inherited-agency-codes",
    params: {
      slug: get(organisation, "slug", "")
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

      dispatch({ type: "SHARED_FROM_NETWORK_FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    },
    skip:
      get(user, "parent.parent.type", "") !== "NETWORK" ||
      !get(organisation, "slug", "") ||
      organisationLoading
  })

  // Shared with users
  const {
    loading: sharedWithUsersQueryLoading,
    error: sharedWithUsersQueryError,
    refetch: sharedWithUsersQueryRefetch
  } = useGet({
    endpoint: "/organisations/:slug/shared-agency-codes",
    params: {
      slug: get(organisation, "slug", "")
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

      dispatch({ type: "SHARED_WITH_USERS_FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(organisation, "slug", "") || organisationLoading
  })

  // Assigned to users
  const {
    loading: assignedToUsersQueryLoading,
    error: assignedToUsersqueryError,
    refetch: assignedToUsersQueryRefetch
  } = useGet({
    endpoint: "/organisations/:slug/user-agency-codes",
    params: {
      slug: get(organisation, "slug", "")
    },
    query: {
      limit: perPage,
      order_by: getOrderBy(sorting),
      page,
      with: ["provider", "owner"]
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])

      dispatch({ type: "ASSIGNED_TO_USERS_FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(organisation, "slug", "") || organisationLoading
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
      sharedFromNetworkQueryRefetch()
      sharedWithUsersQueryRefetch()
      assignedToUsersQueryRefetch()
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
      sharedFromNetworkQueryRefetch()
      sharedWithUsersQueryRefetch()
      assignedToUsersQueryRefetch()
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
      sharedFromNetworkQueryRefetch()
      sharedWithUsersQueryRefetch()
      assignedToUsersQueryRefetch()
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

  // Get users shared with
  const {
    loading: sharedUsersLoading,
    error: sharedUsersError,
    refetch: sharedUsersRefetch
  } = useGet({
    endpoint: "/organisations/:slug/agency-codes/:code/users-shared-with",
    params: {
      slug: get(organisation, "slug", ""),
      code: get(selectedAgencyCode, "slug", "")
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])

      dispatch({ type: "FETCH_SHARED_USERS_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("ORGANISATION_SHARED_USERS_INDEX_ERROR"),
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(organisation, "slug", "") || !get(selectedAgencyCode, "slug", "")
  })

  // Share an agency code
  const [share, { loading: shareLoading, error: shareError }] = usePost({
    endpoint: "/organisations/:slug/agency-codes/:code/share",
    params: {
      slug: get(organisation, "slug", ""),
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
      sharedFromNetworkQueryRefetch()
      sharedWithUsersQueryRefetch()
      assignedToUsersQueryRefetch()
      sharedUsersRefetch()
      setPanelStatus("open")
    }
  })

  // Revoke all agency code shares
  const [revoke, { loading: revokeLoading, error: revokeError }] = usePost({
    endpoint: "/organisations/:slug/agency-codes/:code/revoke-shares",
    params: {
      slug: get(organisation, "slug", ""),
      code: get(selectedAgencyCode, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("AGENCY_CODE_SHARE_REVOKE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "revokeModal", value: false })
      viewRefetch()
      queryRefetch()
      sharedFromNetworkQueryRefetch()
      sharedWithUsersQueryRefetch()
      assignedToUsersQueryRefetch()
      sharedUsersRefetch()
      setPanelStatus("closed")
    }
  })

  // Get organisation users
  const {
    data: users,
    loading: suggestionsLoading,
    error: suggestionsError
  } = useGet({
    endpoint: "/organisations/:slug/agency-codes/:code/users-not-shared-with",
    params: {
      slug: get(organisation, "slug", ""),
      code: get(selectedAgencyCode, "slug", "")
    },
    query: {
      last_name: userVal,
      limit: 5
    },
    skip: !userVal
  })

  /**
   * Parsed variables based on the passed type prop
   */
  const parsedData = (() => {
    switch (type) {
      case "default":
        return data
      case "shared_from_network":
        return sharedFromNetworkData
      case "shared_with_users":
        return sharedWithUsersData
      case "assigned_to_users":
        return assignedToUsersData
      default:
        return []
    }
  })()

  const parsedPagination = (() => {
    switch (type) {
      case "default":
        return { total, page, perPage }
      case "shared_from_network":
        return {
          total: sharedFromNetworkTotal,
          page: sharedFromNetworkPage,
          perPage: sharedFromNetworkPerPage
        }
      case "shared_with_users":
        return {
          total: sharedWithUsersTotal,
          page: sharedWithUsersPage,
          perPage: sharedWithUsersPerPage
        }
      case "assigned_to_users": {
        return {
          total: assignedToUsersTotal,
          page: assignedToUsersPage,
          perPage: assignedToUsersPerPage
        }
      }
      default:
        return { total: null, page: 1, perPage: 10 }
    }
  })()

  const parsedRefetch = (() => {
    switch (type) {
      case "default":
        return queryRefetch
      case "shared_from_network":
        return sharedFromNetworkQueryRefetch
      case "shared_with_users":
        return sharedWithUsersQueryRefetch
      case "assigned_to_users":
        return assignedToUsersQueryRefetch
      default:
        return nullFunc
    }
  })()

  const parsedPageKey = (() => {
    switch (type) {
      case "default":
        return "page"
      case "shared_from_network":
        return "sharedFromNetworkPage"
      case "shared_with_users":
        return "sharedWithUsersPage"
      case "assigned_to_users":
        return "assignedToUsersPage"
      default:
        return "page"
    }
  })()

  const parsedPerPageKey = (() => {
    switch (type) {
      case "default":
        return "perPage"
      case "shared_from_network":
        return "sharedFromNetworkPerPage"
      case "shared_with_users":
        return "sharedWithUsersPerPage"
      case "assigned_to_users":
        return "assignedToUsersPerPage"
      default:
        return "perPage"
    }
  })()

  return (
    <Provider
      value={{
        data: parsedData,
        viewData,
        selectedAgencyCode,
        sorting,
        page: get(parsedPagination, "page", 1),
        perPage: get(parsedPagination, "perPage", 10),
        total: get(parsedPagination, "total", null),
        queryRefetch: parsedRefetch,
        queryLoading:
          queryLoading ||
          organisationLoading ||
          sharedFromNetworkQueryLoading ||
          sharedWithUsersQueryLoading ||
          assignedToUsersQueryLoading,
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
        pagination: parsedPagination,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: parsedPageKey, value: val }),
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: parsedPerPageKey, value: val }),
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
        setViewDeal: val => dispatch({ type: "UPDATE_VALUE", key: "viewDeal", value: val }),
        setDeleteModal: val => dispatch({ type: "UPDATE_VALUE", key: "deleteModal", value: val }),
        onSubmitShare: body => share({ body }),
        shareLoading,
        onRevokeShares: () => revoke(),
        revokeModal,
        setRevoke: val => dispatch({ type: "UPDATE_VALUE", key: "revokeModal", value: val }),
        revokeLoading,
        sharedUsers,
        sharedUsersLoading,
        sharedUsersPagination: {
          total: sharedUsersTotal,
          page: sharedUsersPage,
          perPage: sharedUsersPerPage
        },
        setSharedUsersPage: val =>
          dispatch({ type: "UPDATE_VALUE", key: "sharedUsersPage", value: val }),
        setSharedUsersPerPage: val =>
          dispatch({ type: "UPDATE_VALUE", key: "sharedUsersPerPage", value: val }),
        users,
        suggestionsLoading,
        userVal,
        setUserVal: val => dispatch({ type: "UPDATE_VALUE", key: "userVal", value: val }),
        type,
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
          sharedFromNetworkQueryError ||
          assignedToUsersqueryError ||
          sharedWithUsersQueryError ||
          sharedUsersError ||
          shareError ||
          revokeError ||
          suggestionsError ||
          addAgencyCodeError ||
          requestAgencyCodeError
        }
      />
    </Provider>
  )
}

OrganisationAgencyCodesProvider.defaultProps = {
  children: null,
  type: "default"
}

OrganisationAgencyCodesProvider.propTypes = {
  children: PropTypes.any,
  type: PropTypes.oneOf([
    "default",
    "shared_from_network",
    "shared_with_users",
    "assigned_to_users"
  ])
}

export default OrganisationAgencyCodesProvider
