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
  fakeOrganisationsGetResponse,
  fakeOrganisationsSharedWithResponse
} from "../../../../Helpers"
import reducer from "./networkAgencyCodes.story.reducer"

const TestNetworkAgencyCodesProvider = ({ children, value }) => {
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
      orgVal,
      revokeModal,
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
    orgVal: "",
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
        viewDeal,
        setViewDeal: val => dispatch({ type: "UPDATE_VALUE", key: "viewDeal", value: val }),
        assignedDealCodes: get(fakeDealCodesGetResponse, "data", []),
        availableDealCodes: get(fakeAgencyCodeGetResponse, "data", []),
        orgVal,
        setOrgVal: val => dispatch({ type: "UPDATE_VALUE", key: "orgVal", value: val }),
        organisations: get(fakeOrganisationsGetResponse, "data", []),
        onRevokeShares: () => console.log("Revoke was fired"),
        revokeModal,
        setRevoke: val => dispatch({ type: "UPDATE_VALUE", key: "revokeModal", value: val }),
        sharedOrganisations: get(fakeOrganisationsSharedWithResponse, "data"),
        onSubmitShare: body => console.log(body),
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

TestNetworkAgencyCodesProvider.defaultProps = {
  children: null,
  value: {}
}

TestNetworkAgencyCodesProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestNetworkAgencyCodesProvider
