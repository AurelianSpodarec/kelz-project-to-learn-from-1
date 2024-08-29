import React, { useReducer } from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./status.story.reducer"
import { fakeApiStatusGetResponse } from "../../../Helpers"

const TestApiStatusProvider = ({ children, value }) => {
  const [{ page, perPage, total, sorting }, dispatch] = useReducer(reducer, {
    page: 1,
    perPage: 5,
    total: 50,
    sorting: { direction: "asc", dataKey: "name" }
  })

  return (
    <Provider
      value={{
        data: get(fakeApiStatusGetResponse, "data", []),
        page,
        perPage,
        pagination: { total, page, perPage },
        sorting,
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestApiStatusProvider.defaultProps = {
  children: null,
  value: {}
}

TestApiStatusProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestApiStatusProvider
