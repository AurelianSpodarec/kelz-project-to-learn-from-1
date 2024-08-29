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
  fakeDealCodesGetResponse,
  fakeUsersSharedWithResponse,
  fakeUsersGetResponse
} from "../../../../Helpers"
import reducer from "./organisationAgencyCodes.story.reducer"

const TestOrganisationAgencyCodesProvider = ({ children, value }) => {
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
      filter,
      viewDeal,
      userVal,
      revokeModal,
      addRequestModal
    },
    dispatch
  ] = React.useReducer(reducer, {
    data: get(fakeAgencyCodesGetResponse, "data", []),
    viewData: get(fakeAgencyCodeGetResponse, "data", {}),
    search: "",
    filter: "",
    selectedAgencyCode: null,
    sorting: { direction: "asc", dataKey: "created_at" },
    page: 1,
    perPage: 10,
    total: null,
    viewDeal: { isOpen: false, slug: null },
    userVal: "",
    revokeModal: false,
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
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val }),
        setNotesModal: val => dispatch({ type: "UPDATE_VALUE", key: "notesModal", value: val }),
        setpolicySummaryModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "policySummaryModal", value: val }),
        setPanelBodyContent: val =>
          dispatch({ type: "UPDATE_VALUE", key: "panelBodyContent", value: val }),
        setActiveButton: val => dispatch({ type: "UPDATE_VALUE", key: "activeButton", value: val }),
        filter,
        hasActions: true,
        viewDeal,
        setViewDeal: val => dispatch({ type: "UPDATE_VALUE", key: "viewDeal", value: val }),
        assignedDealCodes: get(fakeDealCodesGetResponse, "data", []),
        availableDealCodes: get(fakeAgencyCodeGetResponse, "data", []),
        userVal,
        setUserVal: val => dispatch({ type: "UPDATE_VALUE", key: "userVal", value: val }),
        users: get(fakeUsersGetResponse, "data", []),
        onRevokeShares: () => console.log("Revoke was fired"),
        revokeModal,
        setRevoke: val => dispatch({ type: "UPDATE_VALUE", key: "revokeModal", value: val }),
        sharedUsers: get(fakeUsersSharedWithResponse, "data"),
        onSubmitShare: body => console.log(body),
        type: "default",
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

TestOrganisationAgencyCodesProvider.defaultProps = {
  children: null,
  value: {}
}

TestOrganisationAgencyCodesProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestOrganisationAgencyCodesProvider
