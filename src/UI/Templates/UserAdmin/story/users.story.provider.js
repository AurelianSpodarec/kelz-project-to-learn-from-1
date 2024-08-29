/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"

// Components
import { Provider } from ".."

// Helpers
import { testData } from "./users.story.helpers"
import reducer from "./users.story.reducer"

const TestUsersProvider = ({ children }) => {
  const [
    { page, perPage, hasParentFilter, parentType, showDeleted, search, selectedUser, sorting },
    dispatch
  ] = React.useReducer(reducer, {
    page: 1,
    perPage: 10,
    showDeleted: false,
    search: "",
    parentType: "",
    hasParentFilter: true,
    selectedUser: null,
    sorting: { direction: "asc", dataKey: "last_name" }
  })

  return (
    <Provider
      value={{
        data: testData,
        onEditUserSubmit: data => console.log(data),
        selectedUser,
        onUserSelect: row => dispatch({ type: "UPDATE_VALUE", key: "selectedUser", value: row }),
        onUserDeselect: () => dispatch({ type: "UPDATE_VALUE", key: "selectedUser", value: null }),
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
        selectLoading: false,
        parentType,
        hasParentFilter,
        sorting
      }}
    >
      {children}
    </Provider>
  )
}

TestUsersProvider.propTypes = {
  children: PropTypes.any
}

export default TestUsersProvider
