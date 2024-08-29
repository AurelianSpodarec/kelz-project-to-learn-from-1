/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import { fakeNetworkOrganisationsGetResponse } from "../../../Helpers"
import reducer from "./networkOrganisations.story.reducer"

const TestNetworkOrganisationsProvider = ({ children, value }) => {
  const [{ page, perPage, search, selectedOrganisation, sorting }, dispatch] = React.useReducer(
    reducer,
    {
      page: 1,
      perPage: 5,
      search: "",
      selectedOrganisation: null,
      sorting: { direction: "asc", dataKey: "last_name" }
    }
  )

  return (
    <Provider
      value={{
        data: get(fakeNetworkOrganisationsGetResponse, "data", []),
        selectedOrganisation,
        onOrganisationSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedOrganisation", value: row }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        sorting,
        pagination: { total: 50, page, perPage },
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        onRemoveOrganisation: () => console.log("Remove organisation"),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestNetworkOrganisationsProvider.defaultProps = {
  children: null,
  value: {}
}

TestNetworkOrganisationsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestNetworkOrganisationsProvider
