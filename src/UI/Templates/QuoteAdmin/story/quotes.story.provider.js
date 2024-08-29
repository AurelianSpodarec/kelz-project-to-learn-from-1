import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import { fakeQuotesGetResponse, fakeQuoteGetResponse } from "../../../Helpers"
import reducer from "./quotes.story.reducer"

const TestQuotesProvider = ({ children, value }) => {
  const [
    { data, viewData, page, perPage, showSimulated, search, selectedQuote, sorting, filter },
    dispatch
  ] = React.useReducer(reducer, {
    data: get(fakeQuotesGetResponse, "data", []),
    viewData: get(fakeQuoteGetResponse, "data", {}),
    page: 1,
    perPage: 10,
    showSimulated: false,
    search: "",
    selectedQuote: null,
    sorting: { direction: "asc", dataKey: "last_name" },
    filter: "client_name"
  })

  return (
    <Provider
      value={{
        data,
        viewData,
        selectedQuote,
        onQuoteSelect: row => dispatch({ type: "UPDATE_VALUE", key: "selectedQuote", value: row }),
        onQuoteDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedQuote", value: null }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total: 50, page, perPage },
        showSimulated,
        setShowSimulated: val =>
          dispatch({ type: "UPDATE_VALUE", key: "showSimulated", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val }),
        filter,
        hasShowSimulated: true,
        hasActions: true,
        hasStatusFilters: false,
        selectLoading: false,
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestQuotesProvider.defaultProps = {
  children: null,
  value: {}
}

TestQuotesProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestQuotesProvider
