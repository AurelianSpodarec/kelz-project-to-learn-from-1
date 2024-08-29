import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, useDelete, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"

// Components
import { Provider } from "../../../UI/Templates/NetworkAdmin"

// Helpers
import { PageContext } from "../../../UI/Organisms"
import { getOrderBy } from "../../../UI/Helpers"
import reducer from "./networks.reducer"

const NetworksProvider = ({ children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { setPanelStatus } = React.useContext(PageContext)

  // State
  const [{ page, perPage, showDeleted, search, selectedNetwork, sorting, total, data }, dispatch] =
    React.useReducer(reducer, {
      page: 1,
      perPage: 10,
      showDeleted: false,
      search: "",
      selectedNetwork: null,
      sorting: { direction: "asc", dataKey: "name" },
      total: null,
      data: []
    })

  // Index Networks query
  const { loading, error, refetch } = useGet({
    endpoint: "/networks",
    query: {
      name: search,
      page,
      limit: perPage,
      deleted: showDeleted,
      order_by: getOrderBy(sorting),
      with: ["address"]
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: "There was an error fetching the networks",
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Delete Network mutation
  const [deleteNetwork, { loading: deleteLoading }] = useDelete({
    endpoint: "/networks/:network",
    params: {
      network: get(selectedNetwork, "slug", "")
    },
    onCompleted: () => {
      // Display success message, refetch index query
      addAlert({
        message: "Network has been successfully deleted",
        type: "success",
        dismissible: true,
        timeout: 5
      })
      refetch()
      setPanelStatus("closed")
    },
    onError: err => console.error(err)
  })

  return (
    <Provider
      value={{
        data,
        selectedNetwork,
        onNetworkSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedNetwork", value: row }),
        onNetworkDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedNetwork", value: null }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total, page, perPage },
        showDeleted,
        setShowDeleted: val => dispatch({ type: "UPDATE_VALUE", key: "showDeleted", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        queryLoading: loading,
        deleteLoading,
        onDeleteNetwork: () => {
          deleteNetwork()
        }
      }}
    >
      {children}
      <ApiError error={error} />
    </Provider>
  )
}

NetworksProvider.defaultProps = {
  children: null
}

NetworksProvider.propTypes = {
  children: PropTypes.any
}

export default NetworksProvider
