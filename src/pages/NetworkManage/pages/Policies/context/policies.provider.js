import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, usePost, useDelete, usePatch, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../../../../../UI/Templates/PolicyAdmin"

// Helpers
import { getOrderBy } from "../../../../../UI/Helpers"
import reducer from "./policies.reducer"

const PoliciesProvider = ({ children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const t = useTranslations()

  // State
  const [
    {
      data,
      viewData,
      showSimulated,
      hasShowSimulated,
      status,
      hasStatusFilter,
      search,
      filter,
      selectedPolicy,
      sorting,
      page,
      perPage,
      total,
      editModal,
      deleteModal,
      declineUnderwritingModal,
      declinePolicyModal,
      messagingModal,
      exclusionsModal,
      reference,
      selectedExclusion
    },
    dispatch
  ] = React.useReducer(reducer, {
    data: [],
    viewData: {},
    showSimulated: false,
    hasShowSimulated: false,
    status: [],
    hasStatusFilter: true,
    search: "",
    selectedPolicy: null,
    selectedExclusion: null,
    sorting: { direction: "asc", dataKey: "name" },
    filter: "client_name",
    page: 1,
    perPage: 10,
    total: null,
    messagingModal: false,
    deleteModal: false,
    exclusionsModal: false,
    declineUnderwritingModal: false,
    declinePolicyModal: false,
    reference: ""
  })

  // Set the query search if search is truthy
  let querySearch = {}
  if (search) {
    querySearch = {
      [filter]: search
    }
  }

  // Index Policys query
  const {
    loading: queryLoading,
    error: queryError,
    refetch: queryRefetch
  } = useGet({
    endpoint: "/policies",
    query: {
      limit: perPage,
      order_by: getOrderBy(sorting),
      simulated: showSimulated,
      status,
      page,
      with: ["organisation", "client", "salesAgent", "provider", "exclusions"],
      ...querySearch
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("POLICIES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Policy data query
  const {
    loading: viewLoading,
    error: viewError,
    refetch: viewRefetch
  } = useGet({
    endpoint: "/policies/:slug",
    skip: !selectedPolicy,
    params: {
      slug: get(selectedPolicy, "slug", "")
    },
    query: {
      with: ["organisation", "client", "salesAgent", "provider"],
      status
    },
    onCompleted: res => {
      const newData = get(res, "data", {})
      dispatch({ type: "UPDATE_VALUE", key: "viewData", value: newData })
    },
    onError: () => {
      addAlert({
        message: t("POLICY_VIEW_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Policy exclusions data query
  const {
    loading: exclusionsLoading,
    error: exclusionsError,
    data: exclusionsData,
    refetch: exclusionsRefetch
  } = useGet({
    endpoint: "/policies/:slug/exclusions",
    skip: !selectedPolicy || get(selectedPolicy, "status", "") !== "AWAITING_TERMS",
    params: {
      slug: get(selectedPolicy, "slug", "")
    },
    onError: () => {
      addAlert({
        message: t("EXCLUSIONS_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Add policy exclusion
  const [onCreateExclusion, { loading: addExclusionLoading, error: addExclusionError }] = usePost({
    endpoint: "/policies/:slug/exclusions",
    params: {
      slug: get(selectedPolicy, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("EXCLUSION_ADD_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      exclusionsRefetch()
    },
    onError: () => {
      addAlert({
        message: t("EXCLUSION_ADD_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Delete exclusion mutation
  const [onDeleteExclusion, { loading: deleteExclusionLoading }] = useDelete({
    endpoint: "/policies/:slug/exclusions/:exclusion",
    params: {
      slug: get(selectedPolicy, "slug", ""),
      exclusion: get(selectedExclusion, "id", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("EXCLUSION_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 2
      })
      viewRefetch()
    },
    onError: () => {
      addAlert({
        message: t("EXCLUSION_DELETE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Update exclusion mutation
  const [onUpdateExclusion, { loading: updateExclusionLoading }] = usePatch({
    endpoint: "/policies/:slug/exclusions/:exclusion",
    params: {
      slug: get(selectedPolicy, "slug", ""),
      exclusion: get(selectedExclusion, "id", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("EXCLUSION_UPDATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "editModal", value: false })
      viewRefetch()
    },
    onError: () => {
      addAlert({
        message: t("EXCLUSION_UPDATE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Accept underwriting
  const [
    onAcceptUnderwriting,
    { loading: acceptUnderwritingLoading, error: acceptUnderwritingError }
  ] = usePatch({
    endpoint: "/policies/:slug/accept-underwriting",
    params: {
      slug: get(selectedPolicy, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("UNDERWRITING_ACCEPT_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
    },
    onError: () => {
      addAlert({
        message: t("UNDERWRITING_ACCEPT_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Accept underwriting with exclusions
  const [
    onAcceptUnderwritingExclusions,
    { loading: acceptUnderwritingExclusionsLoading, error: acceptUnderwritingExclusionsError }
  ] = usePatch({
    endpoint: "/policies/:slug/accept-underwriting",
    params: {
      slug: get(selectedPolicy, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("UNDERWRITING_EXCLUSIONS_ACCEPT_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
    },
    onError: () => {
      addAlert({
        message: t("UNDERWRITING_EXCLUSIONS_ACCEPT_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Decline underwriting
  const [
    onDeclineUnderwriting,
    { loading: declineUnderwritingLoading, error: declineUnderwritingError }
  ] = usePatch({
    endpoint: "/policies/:slug/decline-underwriting",
    params: {
      slug: get(selectedPolicy, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("UNDERWRITING_DECLINE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "declineUnderwritingModal", value: false })
    },
    onError: () => {
      addAlert({
        message: t("UNDERWRITING_DECLINE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Accept Policy
  const [onAcceptPolicy, { loading: acceptPolicyLoading, error: acceptPolicyError }] = usePatch({
    endpoint: "/policies/:slug/accept",
    params: {
      slug: get(selectedPolicy, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("POLICY_ACCEPT_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      queryRefetch()
    },
    onError: () => {
      addAlert({
        message: t("POLICY_ACCEPT_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Decline policy
  const [onDeclinePolicy, { loading: declinePolicyLoading, error: declinePolicyError }] = usePatch({
    endpoint: "/policies/:slug/decline",
    params: {
      slug: get(selectedPolicy, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("POLICY_DECLINE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "declinePolicyModal", value: false })
    },
    onError: () => {
      addAlert({
        message: t("POLICY_DECLINE_ERROR"),
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
        exclusionsData,
        showSimulated,
        hasShowSimulated,
        status,
        hasStatusFilter,
        search,
        selectedPolicy,
        sorting,
        page,
        perPage,
        total,
        messagingModal,
        exclusionsModal,
        reference,
        selectedExclusion,
        queryLoading,
        queryRefetch,
        viewLoading,
        viewRefetch,
        exclusionsLoading,
        exclusionsRefetch,
        addExclusionLoading,
        deleteExclusionLoading,
        updateExclusionLoading,
        editModal,
        deleteModal,
        onAcceptUnderwriting,
        acceptUnderwritingLoading,
        onAcceptUnderwritingExclusions,
        acceptUnderwritingExclusionsLoading,
        onDeclineUnderwriting,
        declineUnderwritingLoading,
        acceptPolicyLoading,
        onDeclinePolicy,
        declineUnderwritingModal,
        declinePolicyLoading,
        declinePolicyModal,
        setShowSimulated: val =>
          dispatch({ type: "UPDATE_VALUE", key: "showSimulated", value: val }),
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val }),
        filter,
        setStatus: val => dispatch({ type: "UPDATE_VALUE", key: "status", value: [val] }),
        setStatusFilter: val =>
          dispatch({ type: "UPDATE_VALUE", key: "hasStatusFilter", value: val }),
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        onPolicySelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedPolicy", value: row }),
        onPolicyDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedPolicy", value: null }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        pagination: { total, page, perPage },
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        setEditModal: val => dispatch({ type: "UPDATE_VALUE", key: "editModal", value: val }),
        setDeleteModal: val => dispatch({ type: "UPDATE_VALUE", key: "deleteModal", value: val }),
        setMessagingModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "messagingModal", value: val }),
        setExclusionsModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "exclusionsModal", value: val }),
        setDeclineUnderwritingModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "declineUnderwritingModal", value: val }),
        setDeclinePolicyModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "declinePolicyModal", value: val }),
        onExclusionSelect: exclusion =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedExclusion", value: exclusion }),
        onCreateExclusion,
        onDeleteExclusion,
        onUpdateExclusion,
        setReference: val => {
          dispatch({ type: "UPDATE_VALUE", key: "reference", value: val })
        },
        onPolicyAccept: body => {
          onAcceptPolicy({ body })
          dispatch({ type: "UPDATE_VALUE", key: "reference", value: "" })
        }
      }}
    >
      {children}
      <ApiError
        error={
          queryError ||
          viewError ||
          exclusionsError ||
          addExclusionError ||
          acceptUnderwritingExclusionsError ||
          acceptUnderwritingError ||
          declineUnderwritingError ||
          acceptPolicyError ||
          declinePolicyError
        }
      />
    </Provider>
  )
}

PoliciesProvider.defaultProps = {
  children: null
}

PoliciesProvider.propTypes = {
  children: PropTypes.any
}

export default PoliciesProvider
