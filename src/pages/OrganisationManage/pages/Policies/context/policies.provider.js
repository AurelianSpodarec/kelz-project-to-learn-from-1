import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"

// Helpers
import { Provider } from "../../../../../UI/Templates/PolicyAdmin"
import { OrganisationManageContext } from "../../../context/manage.context"
import { getOrderBy } from "../../../../../UI/Helpers"
import reducer from "./policies.reducer"

const OrganisationPoliciesProvider = ({ children, isSimulated }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { organisation } = React.useContext(OrganisationManageContext)

  // State
  const [{ page, perPage, search, sorting, filter, total, data, selectedPolicySlug }, dispatch] =
    React.useReducer(reducer, {
      page: 1,
      perPage: 10,
      search: "",
      sorting: { direction: "asc", dataKey: "created_at" },
      filter: "client_name",
      total: null,
      data: [],
      selectedPolicySlug: ""
    })

  // Set the query search if search is truthy
  let querySearch = {}
  if (search) {
    querySearch = {
      [filter]: search
    }
  }

  // Index policies
  const { loading, error } = useGet({
    endpoint: "/policies",
    query: {
      page,
      limit: perPage,
      order_by: getOrderBy(sorting),
      simulated: isSimulated,
      with: ["client", "salesAgent"],
      organisation_name: get(organisation, "name", ""),
      status: ["ACCEPTED", "ONBOARDED"],
      ...querySearch
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: "There was an error fetching the policies",
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Get policy
  const {
    data: selectedPolicy,
    loading: selectLoading,
    error: selectError
  } = useGet({
    endpoint: "/policies/:slug",
    skip: !selectedPolicySlug,
    params: {
      slug: selectedPolicySlug
    },
    query: {
      with: ["client"]
    },
    onError: () => {
      addAlert({
        message: "There was an error fetching the policy",
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

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
        pagination: { total, page, perPage },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val }),
        filter,
        hasShowSimulated: false,
        hasActions: true,
        queryLoading: loading,
        hasStatusFilter: false,
        selectedPolicy,
        selectLoading,
        onPolicySelect: val =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedPolicySlug", value: get(val, "slug", "") })
      }}
    >
      {children}
      <ApiError error={error || selectError} />
    </Provider>
  )
}

OrganisationPoliciesProvider.defaultProps = {
  children: null,
  isSimulated: false
}

OrganisationPoliciesProvider.propTypes = {
  children: PropTypes.any,
  isSimulated: PropTypes.bool
}

export default OrganisationPoliciesProvider
