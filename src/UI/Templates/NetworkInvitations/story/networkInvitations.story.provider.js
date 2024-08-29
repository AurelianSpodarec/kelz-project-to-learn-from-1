/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./networkInvitations.story.reducer"
import { fakeOrganisationsGetResponse, fakeNetworkInvitationsGetResponse } from "../../../Helpers"

const TestNetworkInvitationsProvider = ({ children, value }) => {
  const [{ page, perPage, search, sorting, orgVal, addOpen, cancel }, dispatch] = React.useReducer(
    reducer,
    {
      page: 1,
      perPage: 10,
      search: "",
      sorting: { direction: "asc", dataKey: "name" },
      orgVal: "",
      addOpen: false,
      cancel: { isOpen: false, invitation: null }
    }
  )

  return (
    <Provider
      value={{
        data: get(fakeNetworkInvitationsGetResponse, "data", []),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        pagination: { total: 50, page, perPage },
        sorting,
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        onDeleteInvitation: val => console.log(val),
        onInviteOrganisation: val => console.log(val),
        organisations: get(fakeOrganisationsGetResponse, "data", []),
        orgVal,
        setOrgVal: val => dispatch({ type: "UPDATE_VALUE", key: "orgVal", value: val }),
        setAddOpen: val => dispatch({ type: "UPDATE_VALUE", key: "addOpen", value: val }),
        addOpen,
        cancel,
        setCancel: val => dispatch({ type: "UPDATE_VALUE", key: "cancel", value: val }),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestNetworkInvitationsProvider.defaultProps = {
  children: null,
  value: {}
}

TestNetworkInvitationsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestNetworkInvitationsProvider
