import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./networks.story.reducer"
import { fakeNetworksGetResponse } from "../../../Helpers"

const TestNetworksProvider = ({ children, value }) => {
  const [{ page, perPage, showDeleted, search, selectedNetwork, sorting, filter }, dispatch] =
    React.useReducer(reducer, {
      page: 1,
      perPage: 10,
      showDeleted: false,
      search: "",
      selectedNetwork: null,
      sorting: { direction: "asc", dataKey: "name" },
      filter: "name"
    })

  return (
    <Provider
      value={{
        data: get(fakeNetworksGetResponse, "data", []),
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
        pagination: { total: 50, page, perPage },
        showDeleted,
        setShowDeleted: val => dispatch({ type: "UPDATE_VALUE", key: "showDeleted", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val }),
        filter,
        hasActions: true,
        hasShowSimulated: true,
        selectLoading: false,
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestNetworksProvider.defaultProps = {
  children: null,
  value: {}
}

TestNetworksProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestNetworksProvider
