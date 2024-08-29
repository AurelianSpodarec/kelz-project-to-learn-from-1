import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useParams } from "react-router-dom"
import { useGet, ApiError } from "@4cplatform/elements/Api"

// Components
import { Provider } from "./manage.context"

// Helpers
import reducer from "./manage.reducer"

const ProviderManageProvider = ({ children }) => {
  const { slug } = useParams()
  const [{ data, hasUnsavedProviderDetails }, dispatch] = React.useReducer(reducer, {
    data: {},
    hasUnsavedProviderDetails: false
  })

  // Fetch the Provider for the page
  const { loading, error, refetch } = useGet({
    endpoint: "/providers/:slug",
    skip: !slug,
    params: {
      slug
    },
    query: {
      with: ["additionalContactDetails"]
    },
    onCompleted: res => {
      const provider = get(res, "data", {})
      dispatch({ type: "FETCH_COMPLETE", data: provider })
    }
  })

  return (
    <Provider
      value={{
        provider: data,
        providerRefetch: refetch,
        providerLoading: loading,
        hasUnsavedProviderDetails,
        setHasUnsavedProviderDetails: val =>
          dispatch({ type: "UPDATE_VALUE", key: "hasUnsavedProviderDetails", value: val }),
        onUpdateProvider: val => dispatch({ type: "UPDATE_VALUE", key: "data", value: val })
      }}
    >
      {children}
      <ApiError error={error} />
    </Provider>
  )
}

ProviderManageProvider.defaultProps = {
  children: null
}

ProviderManageProvider.propTypes = {
  children: PropTypes.any
}

export default ProviderManageProvider
