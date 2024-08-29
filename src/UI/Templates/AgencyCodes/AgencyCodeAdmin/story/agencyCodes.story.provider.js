/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from "../../agencyCodes.context"

// Helpers
import {
  fakeAgencyCodesGetResponse,
  fakeAgencyCodeGetResponse,
  fakeDealCodesGetResponse
} from "../../../../Helpers"
import reducer from "./agencyCodes.story.reducer"

const TestAgencyCodesProvider = ({ children, value }) => {
  const [
    {
      data,
      viewData,
      search,
      selectedAgencyCode,
      sorting,
      page,
      perPage,
      total,
      viewDeal,
      addRequestModal
    },
    dispatch
  ] = React.useReducer(reducer, {
    data: get(fakeAgencyCodesGetResponse, "data", []),
    viewData: get(fakeAgencyCodeGetResponse, "data", {}),
    search: "",
    selectedAgencyCode: null,
    sorting: { direction: "asc", dataKey: "created_at" },
    page: 1,
    perPage: 10,
    total: null,
    viewDeal: { isOpen: false, slug: null },
    addRequestModal: false
  })

  return (
    <Provider
      value={{
        data,
        viewData,
        selectedAgencyCode,
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total: 50, page, perPage },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        total,
        onAgencyCodeSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedAgencyCode", value: row }),
        onAgencyCodeDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedAgencyCode", value: null }),
        hasActions: true,
        viewDeal,
        setViewDeal: val => dispatch({ type: "UPDATE_VALUE", key: "viewDeal", value: val }),
        assignedDealCodes: get(fakeDealCodesGetResponse, "data", []),
        availableDealCodes: get(fakeAgencyCodeGetResponse, "data", []),
        addRequestModal,
        setAddRequestModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "addRequestModal", value: val }),
        onAddAgencyCode: body => console.log(body),
        onRequestAgencyCode: body => console.log(body),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestAgencyCodesProvider.defaultProps = {
  children: null,
  value: {}
}

TestAgencyCodesProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestAgencyCodesProvider
