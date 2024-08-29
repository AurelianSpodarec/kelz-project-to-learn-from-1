import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useParams } from "react-router-dom"
import { useGet, ApiError } from "@4cplatform/elements/Api"

// Components
import { Provider } from "./manage.context"

// Helpers
import reducer from "./manage.reducer"

const OrganisationManageProvider = ({ children }) => {
  const { slug } = useParams()
  const [{ data }, dispatch] = React.useReducer(reducer, { data: {} })

  // Fetch the Organisation for the page
  const { loading, error, refetch } = useGet({
    endpoint: "/organisations/:slug",
    params: {
      slug
    },
    query: {
      with: ["address", "network"]
    },
    onCompleted: res => {
      const organisation = get(res, "data", {})
      dispatch({ type: "FETCH_COMPLETE", data: organisation })
    }
  })

  return (
    <Provider
      value={{
        organisation: data,
        organisationRefetch: refetch,
        organisationLoading: loading,
        onUpdateOrganisation: val => dispatch({ type: "UPDATE_VALUE", key: "data", value: val })
      }}
    >
      {children}
      <ApiError error={error} />
    </Provider>
  )
}

OrganisationManageProvider.defaultProps = {
  children: null
}

OrganisationManageProvider.propTypes = {
  children: PropTypes.any
}

export default OrganisationManageProvider
