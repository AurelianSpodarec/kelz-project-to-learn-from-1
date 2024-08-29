import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, usePatch, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../../../../../UI/Templates/AgencyCodes"

// Helpers
import { PageContext } from "../../../../../UI/Organisms"
import { getOrderBy } from "../../../../../UI/Helpers"
import reducer from "./codeRequests.reducer"

const AgencyCodeRequestsProvider = ({ isPending, children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { setPanelStatus } = React.useContext(PageContext)
  const t = useTranslations()

  // State
  const [
    { data, selectedRequest, sorting, page, perPage, total, acceptModal, declineModal },
    dispatch
  ] = React.useReducer(reducer, {
    data: [],
    selectedRequest: null,
    sorting: { direction: "asc", dataKey: "product_type" },
    page: 1,
    perPage: 10,
    total: null,
    acceptModal: false,
    declineModal: false
  })

  // Index Agency Code Requests query
  const {
    loading: queryLoading,
    error: queryError,
    refetch: queryRefetch
  } = useGet({
    endpoint: "/agency-code-requests",
    query: {
      limit: perPage,
      order_by: getOrderBy(sorting),
      pending: true,
      page
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODE_REQUESTS_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Accept Agency Code Request mutation
  const [onAccept, { loading: acceptLoading, error: acceptError }] = usePatch({
    endpoint: "/agency-code-requests/:slug/accept",
    params: {
      slug: get(selectedRequest, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("AGENCY_CODE_REQUEST_ACCEPT_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      queryRefetch()
      setPanelStatus("closed")
      dispatch({ type: "REQUEST_ACCEPT" })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODE_REQUEST_ACCEPT_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Decline Agency Code Request mutation
  const [onDecline, { loading: declineLoading, error: declineError }] = usePatch({
    endpoint: "/agency-code-requests/:slug/decline",
    params: {
      slug: get(selectedRequest, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("AGENCY_CODE_REQUEST_DECLINE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      queryRefetch()
      setPanelStatus("closed")
      dispatch({ type: "REQUEST_DECLINE" })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODE_REQUEST_DECLINE_ERROR"),
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
        selectedRequest,
        sorting,
        page,
        perPage,
        total,
        queryLoading,
        queryRefetch,
        onRequestSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedRequest", value: row }),
        onRequestDeselect: () => {
          dispatch({ type: "UPDATE_VALUE", key: "selectedRequest", value: null })
        },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        pagination: { total, page, perPage },
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        isPending,
        acceptModal,
        setAcceptModal: val => dispatch({ type: "UPDATE_VALUE", key: "acceptModal", value: val }),
        onAccept,
        acceptLoading,
        declineModal,
        setDeclineModal: val => dispatch({ type: "UPDATE_VALUE", key: "declineModal", value: val }),
        onDecline,
        declineLoading
      }}
    >
      {children}
      <ApiError error={queryError || declineError || acceptError} />
    </Provider>
  )
}

AgencyCodeRequestsProvider.defaultProps = {
  isPending: false,
  children: null
}

AgencyCodeRequestsProvider.propTypes = {
  isPending: PropTypes.bool,
  children: PropTypes.any
}

export default AgencyCodeRequestsProvider
