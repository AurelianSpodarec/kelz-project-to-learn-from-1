/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./organisations.story.reducer"
import { fakeOrganisationsGetResponse, fakeOrganisationGetResponse } from "../../../Helpers"

const TestOrganisationsProvider = ({ children, value }) => {
  const [
    { data, page, perPage, search, selectedOrganisation, sorting, editLoading, showDeleted },
    dispatch
  ] = React.useReducer(reducer, {
    data: get(fakeOrganisationsGetResponse, "data", []),
    page: 1,
    perPage: 5,
    search: "",
    selectedOrganisation: null,
    sorting: { direction: "asc", dataKey: "last_name" },
    editLoading: false,
    showDeleted: false
  })

  return (
    <Provider
      value={{
        data,
        selectedOrganisation,
        onOrganisationSelect: row =>
          dispatch({
            type: "UPDATE_VALUE",
            key: "selectedOrganisation",
            value:
              row.slug === "organisation-1" ? get(fakeOrganisationGetResponse, "data", {}) : row
          }),
        onOrganisationDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedOrganisation", value: null }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        sorting,
        pagination: { total: 50, page, perPage },
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        onEditOrganisationSelect: () => {
          dispatch({ type: "UPDATE_VALUE", key: "editLoading", value: true })
        },
        editLoading,
        showDeleted,
        setShowDeleted: val => dispatch({ type: "UPDATE_VALUE", key: "showDeleted", value: val }),
        activate: () => console.log("Activate!"),
        activateLoading: false,
        activateError: null,
        deactivate: () => console.log("Deactivate!"),
        deactivateLoading: false,
        deactivateError: null,
        selectLoading: false,
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestOrganisationsProvider.defaultProps = {
  children: null,
  value: {}
}

TestOrganisationsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestOrganisationsProvider
