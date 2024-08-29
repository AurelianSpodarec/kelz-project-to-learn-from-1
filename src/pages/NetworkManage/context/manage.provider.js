import React, { useReducer } from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useParams } from "react-router-dom"
import { useGet, ApiError } from "@4cplatform/elements/Api"

// Components
import { Provider } from "./manage.context"

// Helpers
import reducer from "./manage.reducer"

const NetworkManageProvider = ({ children }) => {
  const { slug } = useParams()
  const [{ data, hasUnsavedNetworkDetails }, dispatch] = useReducer(reducer, {
    data: {},
    hasUnsavedNetworkDetails: false
  })

  // Fetch the Network for the page
  const { loading, error, refetch } = useGet({
    endpoint: "/networks/:slug",
    params: {
      slug
    },
    query: {
      with: ["address"]
    },
    onCompleted: res => {
      const network = get(res, "data", {})
      dispatch({ type: "FETCH_COMPLETE", data: network })
    }
  })

  return (
    <Provider
      value={{
        network: data,
        networkRefetch: refetch,
        networkLoading: loading,
        hasUnsavedNetworkDetails,
        setHasUnsavedNetworkDetails: val =>
          dispatch({ type: "UPDATE_VALUE", key: "hasUnsavedNetworkDetails", value: val }),
        onUpdateNetwork: val => dispatch({ type: "UPDATE_VALUE", key: "data", value: val })
      }}
    >
      {children}
      <ApiError error={error} />
    </Provider>
  )
}

NetworkManageProvider.defaultProps = {
  children: null
}

NetworkManageProvider.propTypes = {
  children: PropTypes.any
}

export default NetworkManageProvider
