import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../../../../../UI/Templates/AgencyCodes"
import { NetworkManageContext } from "../../../context/manage.context"

// Helpers
import { getOrderBy } from "../../../../../UI/Helpers"
import reducer from "./codeRequests.reducer"

const NetworkAgencyCodeRequestsProvider = ({ isPending, children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { network } = React.useContext(NetworkManageContext)
  const t = useTranslations()

  // State
  const [{ data, selectedRequest, sorting, page, perPage, total }, dispatch] = React.useReducer(
    reducer,
    {
      data: [],
      selectedRequest: null,
      sorting: { direction: "asc", dataKey: "product_type" },
      page: 1,
      perPage: 10,
      total: null
    }
  )

  // Index Network Agency Code Requests query
  const {
    loading: queryLoading,
    error: queryError,
    refetch: queryRefetch
  } = useGet({
    endpoint: "/networks/:network/agency-code-requests",
    params: {
      network: get(network, "slug", "")
    },
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
        message: t("NETWORK_AGENCY_CODE_REQUESTS_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(network, "slug", false)
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
        isPending
      }}
    >
      {children}
      <ApiError error={queryError} />
    </Provider>
  )
}

NetworkAgencyCodeRequestsProvider.defaultProps = {
  isPending: false,
  children: null
}

NetworkAgencyCodeRequestsProvider.propTypes = {
  isPending: PropTypes.bool,
  children: PropTypes.any
}

export default NetworkAgencyCodeRequestsProvider
