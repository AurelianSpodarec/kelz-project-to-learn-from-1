/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./networkApplications.story.reducer"
import { fakeNetworkApplicationsGetResponse } from "../../../Helpers"

const TestNetworkApplicationsProvider = ({ children, value }) => {
  const [{ page, perPage, search, sorting, modal }, dispatch] = React.useReducer(reducer, {
    page: 1,
    perPage: 10,
    search: "",
    sorting: { direction: "asc", dataKey: "name" },
    modal: { isOpen: false, type: null, id: null }
  })

  return (
    <Provider
      value={{
        data: get(fakeNetworkApplicationsGetResponse, "data", []),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total: 50, page, perPage },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        onAcceptApplication: data => console.log(data),
        onRejectApplication: data => console.log(data),
        modal,
        setModal: val => dispatch({ type: "UPDATE_VALUE", key: "modal", value: val }),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestNetworkApplicationsProvider.defaultProps = {
  children: null,
  value: {}
}

TestNetworkApplicationsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestNetworkApplicationsProvider
