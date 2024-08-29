import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, ApiError } from "@4cplatform/elements/Api"

// Components
import { Provider } from "../../../UI/Templates/ApiStatusAdmin"

// Helpers
import reducer from "./status.reducer"

const ApiStatusProvider = ({ children }) => {
  const [{ data, page, perPage, total }, dispatch] = React.useReducer(reducer, {
    data: [],
    page: 1,
    perPage: 10,
    total: null
  })

  // Fetch Quote API Status
  const { loading: isLoading, error } = useGet({
    endpoint: "/api-status",
    query: {
      page,
      limit: perPage
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])

      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    }
  })

  return (
    <Provider
      value={{
        data,
        isLoading,
        page,
        perPage,
        pagination: { total, page, perPage },
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val })
      }}
    >
      {children}
      <ApiError error={error} />
    </Provider>
  )
}

ApiStatusProvider.defaultProps = {
  children: null
}

ApiStatusProvider.propTypes = {
  children: PropTypes.any
}

export default ApiStatusProvider
