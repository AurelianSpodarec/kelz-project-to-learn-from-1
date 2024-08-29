/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import { fakeProviderGetResponse } from "../../../Helpers"
import reducer from "./providers.story.reducer"
import { testData } from "./providers.story.helpers"

const TestProvidersProvider = ({ children }) => {
  const [
    { data, viewData, page, perPage, showDeleted, search, selectedProvider, sorting },
    dispatch
  ] = React.useReducer(reducer, {
    page: 1,
    perPage: 10,
    showDeleted: false,
    search: "",
    selectedProvider: null,
    sorting: { direction: "asc", dataKey: "provider_name" },
    data: testData,
    viewData: get(fakeProviderGetResponse, "data", {})
  })

  return (
    <Provider
      value={{
        data,
        viewData,
        selectedProvider,
        onProviderSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedProvider", value: row }),
        onProviderDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedProvider", value: null }),
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
        onDeleteProvider: val => console.log("delete this:", val),
        selectLoading: false
      }}
    >
      {children}
    </Provider>
  )
}

TestProvidersProvider.defaultProps = {
  children: null
}

TestProvidersProvider.propTypes = {
  children: PropTypes.any
}

export default TestProvidersProvider
