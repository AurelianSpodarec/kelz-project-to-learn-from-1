/* eslint-disable no-console */
import React from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import queryString from "query-string"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import {
  fakePoliciesGetResponse,
  fakePolicyGetResponse,
  fakePolicyExclusionsGetResponse
} from "../../../Helpers"
import reducer from "./policies.story.reducer"

const TestPoliciesProvider = ({ children, value }) => {
  const history = useHistory()
  const [
    {
      data,
      viewData,
      exclusionsData,
      page,
      perPage,
      showSimulated,
      search,
      editModal,
      deleteModal,
      exclusionsModal,
      selectedPolicy,
      declineUnderwritingModal,
      declinePolicyModal,
      sorting,
      filter,
      status
    },
    dispatch
  ] = React.useReducer(reducer, {
    data: get(fakePoliciesGetResponse, "data", []),
    viewData: get(fakePolicyGetResponse, "data", {}),
    exclusionsData: get(fakePolicyExclusionsGetResponse, "data", []),
    page: 1,
    perPage: 10,
    showSimulated: false,
    search: "",
    selectedPolicy: null,
    sorting: { direction: "asc", dataKey: "last_name" },
    filter: "client_name",
    editModal: false,
    deleteModal: false,
    exclusionsModal: false,
    declineUnderwritingModal: false,
    declinePolicyModal: false,
    status: ""
  })

  return (
    <Provider
      value={{
        data,
        viewData,
        exclusionsData,
        selectedPolicy,
        editModal,
        deleteModal,
        declineUnderwritingModal,
        declinePolicyModal,
        onPolicySelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedPolicy", value: row }),
        onPolicyDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedPolicy", value: null }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total: 50, page, perPage },
        showSimulated,
        setShowSimulated: simulated => {
          const simulatedSearch = queryString.stringify({ simulated })
          history.replace({ search: simulatedSearch })
          dispatch({ type: "UPDATE_VALUE", key: "showSimulated", value: simulated })
        },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val }),
        setEditModal: val => dispatch({ type: "UPDATE_VALUE", key: "editModal", value: val }),
        setDeleteModal: val => dispatch({ type: "UPDATE_VALUE", key: "deleteModal", value: val }),
        setExclusionsModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "exclusionsModal", value: val }),
        onDeclineUnderwriting: val => console.log(val),
        setReference: val => dispatch({ type: "UPDATE_VALUE", key: "reference", value: val }),
        setDeclineUnderwritingModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "declineUnderwritingModal", value: val }),
        setDeclinePolicyModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "declinePolicyModal", value: val }),
        exclusionsModal,
        filter,
        hasShowSimulated: true,
        hasActions: true,
        hasStatusFilters: false,
        selectLoading: false,
        status,
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestPoliciesProvider.defaultProps = {
  children: null,
  value: {}
}

TestPoliciesProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestPoliciesProvider
