/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./networkDocuments.story.reducer"
import {
  fakeNetworkDocumentsGetResponse,
  fakeNetworkDocumentsOrganisationsGetResponse,
  fakeOrganisationsGetResponse
} from "../../../Helpers"

const TestNetworkDocumentsProvider = ({ children, value }) => {
  const [
    { page, perPage, selectedDocument, sorting, uploadModal, revokeOpen, orgVal, newVersion },
    dispatch
  ] = React.useReducer(reducer, {
    page: 1,
    perPage: 10,
    selectedDocument: null,
    sorting: { direction: "asc", dataKey: "name" },
    uploadModal: { isOpen: false, step: null },
    revokeOpen: false,
    orgVal: "",
    newVersion: false
  })

  return (
    <Provider
      value={{
        data: get(fakeNetworkDocumentsGetResponse, "data", []),
        selectedDocument,
        onDocumentSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedDocument", value: row }),
        onDocumentDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedDocument", value: null }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total: 50, page, perPage },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        hasActions: true,
        selectLoading: false,
        uploadModal,
        setUploadModal: val => dispatch({ type: "UPDATE_VALUE", key: "uploadModal", value: val }),
        revokeOpen,
        setRevoke: val => dispatch({ type: "UPDATE_VALUE", key: "revokeOpen", value: val }),
        onRevoke: doc => {
          console.log(doc)
          dispatch({ type: "UPDATE_VALUE", key: "revokeOpen", value: false })
        },
        documentOrganisations: get(fakeNetworkDocumentsOrganisationsGetResponse, "data", []),
        documentOrganisationsPagination: { total: 50, page, perPage },
        setDocumentOrganisationsPerPage: () => console.log("This was clicked"),
        onSubmitEdit: body => console.log({ body }),
        orgVal,
        setOrgVal: val => dispatch({ type: "UPDATE_VALUE", key: "orgVal", value: val }),
        organisations: get(fakeOrganisationsGetResponse, "data", []),
        uploadDocument: body => console.log({ body }),
        onVersionClick: versionID => console.log(versionID),
        newVersion,
        setNewVersion: val => dispatch({ type: "UPDATE_VALUE", key: "newVersion", value: val }),
        uploadNewVersion: body => console.log(body),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestNetworkDocumentsProvider.defaultProps = {
  children: null,
  value: {}
}

TestNetworkDocumentsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestNetworkDocumentsProvider
