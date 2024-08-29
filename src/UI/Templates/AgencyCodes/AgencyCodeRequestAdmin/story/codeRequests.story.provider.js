import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from "../../agencyCodes.context"

// Helpers
import { fakeAgencyCodesRequestsGetResponse } from "../../../../Helpers"
import reducer from "./codeRequests.story.reducer"

const TestAgencyCodeRequestsProvider = ({ children, value }) => {
  const [{ data, selectedRequest, sorting, page, perPage, total, declineModal }, dispatch] =
    React.useReducer(reducer, {
      data: get(fakeAgencyCodesRequestsGetResponse, "data", []),
      selectedRequest: null,
      sorting: { direction: "asc", dataKey: "created_at" },
      page: 1,
      perPage: 10,
      total: null,
      declineModal: false
    })

  return (
    <Provider
      value={{
        data,
        selectedRequest,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total: 50, page, perPage },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        total,
        onRequestSelect: row => {
          dispatch({ type: "UPDATE_VALUE", key: "selectedRequest", value: row })
        },
        onRequestDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedRequest", value: null }),
        declineModal,
        setDeclineModal: val => dispatch({ type: "UPDATE_VALUE", key: "declineModal", value: val }),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestAgencyCodeRequestsProvider.defaultProps = {
  children: null,
  value: {}
}

TestAgencyCodeRequestsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestAgencyCodeRequestsProvider
