/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./organisationDocuments.story.reducer"
import { fakeOrganisationDocumentsGetResponse } from "../../../Helpers"

const TestOrganisationDocumentsProvider = ({ children, value }) => {
  const [{ page, perPage, selectedDocument, sorting }, dispatch] = React.useReducer(reducer, {
    page: 1,
    perPage: 10,
    selectedDocument: null,
    sorting: { direction: "asc", dataKey: "name" }
  })

  return (
    <Provider
      value={{
        data: get(fakeOrganisationDocumentsGetResponse, "data", []),
        selectedDocument,
        onDocumentSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedDocument", value: row }),
        onDocumentDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedDocument", value: null }),
        sorting,
        pagination: { total: 50, page, perPage },
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        onVersionClick: versionID => console.log(versionID),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestOrganisationDocumentsProvider.defaultProps = {
  children: null,
  value: {}
}

TestOrganisationDocumentsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestOrganisationDocumentsProvider
