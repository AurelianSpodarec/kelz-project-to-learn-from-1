import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import { fakeSharedAgencyCodesGetResponse } from "../../../../Helpers"
import reducer from "./sharedAgencyCodes.story.reducer"

const TestSharedAgencyCodesProvider = ({ children, value }) => {
  const [{ data, search, sorting, page, perPage, total, filter }, dispatch] = React.useReducer(
    reducer,
    {
      data: get(fakeSharedAgencyCodesGetResponse, "data", []),
      search: "",
      filter: "",
      sorting: { direction: "asc", dataKey: "created_at" },
      page: 1,
      perPage: 10,
      total: null
    }
  )

  return (
    <Provider
      value={{
        data,
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total: 50, page, perPage },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        total,
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val }),
        filter,
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestSharedAgencyCodesProvider.defaultProps = {
  children: null,
  value: {}
}

TestSharedAgencyCodesProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestSharedAgencyCodesProvider
