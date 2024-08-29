import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useGet, usePatch, usePost, useDelete, ApiError } from "@4cplatform/elements/Api"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { Provider } from "../../../../../UI/Templates/NetworkDocuments"
import { NetworkManageContext } from "../../../context/manage.context"
import { PageContext } from "../../../../../UI/Organisms"
import reducer from "./documents.reducer"
import { getOrderBy } from "../../../../../UI/Helpers"

const NetworkDocumentsProvider = ({ children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { network } = React.useContext(NetworkManageContext)
  const { setPanelStatus } = React.useContext(PageContext)
  const t = useTranslations()

  // State
  const [
    {
      page,
      perPage,
      selectedDocument,
      sorting,
      total,
      data,
      uploadModal,
      revokeOpen,
      orgVal,
      newVersion,
      documentOrganisationsPerPage,
      documentOrganisationsPage,
      documentOrganisations,
      documentOrganisationsTotal
    },
    dispatch
  ] = React.useReducer(reducer, {
    page: 1,
    perPage: 10,
    selectedDocument: null,
    sorting: { direction: "asc", dataKey: "name" },
    uploadModal: { isOpen: false, step: null },
    revokeOpen: false,
    orgVal: "",
    newVersion: false,
    data: null,
    documentOrganisationsPerPage: 5,
    documentOrganisationsPage: 1
  })

  // Index Network Documents
  const {
    loading: queryLoading,
    error: queryError,
    refetch
  } = useGet({
    endpoint: "/networks/:slug/documents",
    params: {
      slug: get(network, "slug", "")
    },
    query: {
      page,
      limit: perPage,
      order_by: getOrderBy(sorting),
      with: ["network", "activeVersion"]
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])

      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DOCUMENTS_INDEX_ERROR"),
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(network, "slug", "")
  })

  // Get Network Document
  const {
    loading: selectLoading,
    error: selectError,
    refetch: selectRefetch
  } = useGet({
    endpoint: "/networks/:slug/documents/:doc",
    params: {
      slug: get(network, "slug", ""),
      doc: get(selectedDocument, "slug", "")
    },
    query: {
      with: ["activeVersion", "documentVersions"]
    },
    onCompleted: res => {
      const newData = get(res, "data", {})

      dispatch({ type: "UPDATE_VALUE", key: "selectedDocument", value: newData })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DOCUMENT_VIEW_ERROR"),
        dismissible: true,
        timeout: 5
      })
    },
    skip: !selectedDocument
  })

  // Get organisations via document edit
  const {
    loading: documentOrganisationsLoading,
    error: documentOrganisationsError,
    refetch: documentOrganisationsRefetch
  } = useGet({
    endpoint: "/networks/:slug/documents/:doc/organisations",
    params: {
      slug: get(network, "slug", ""),
      doc: get(selectedDocument, "slug", "")
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])

      dispatch({ type: "FETCH_ORGANISATIONS_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DOCUMENT_ORGANISATIONS_INDEX_ERROR"),
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(network, "slug", "") || !get(selectedDocument, "slug", "")
  })

  // Get member organisations
  const {
    data: organisations,
    loading: suggestionsLoading,
    error: suggestionsError
  } = useGet({
    endpoint: "/networks/:slug/organisations",
    params: {
      slug: get(network, "slug", "")
    },
    query: {
      name: orgVal,
      limit: 5,
      member_organisations: true
    },
    skip: !orgVal
  })

  // Edit document mutation
  const [editDocument, { loading: editLoading, error: editError }] = usePatch({
    endpoint: "/networks/:slug/documents/:doc",
    params: {
      slug: get(network, "slug", ""),
      doc: get(selectedDocument, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("DOCUMENT_UPDATE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      setPanelStatus("closed")
      refetch()
      selectRefetch()
      documentOrganisationsRefetch()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DOCUMENT_UPDATE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Add document mutation
  const [addDocument, { loading: addLoading, error: addError }] = usePost({
    endpoint: "/networks/:slug/documents",
    params: {
      slug: get(network, "slug", "")
    },
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("DOCUMENT_CREATE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      refetch()
      dispatch({ type: "UPDATE_VALUE", key: "uploadModal", value: { isOpen: false, step: null } })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DOCUMENT_CREATE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Upload new document version
  const [uploadNewVersion, { loading: uploadNewVersionLoading, error: uploadNewVersionError }] =
    usePost({
      endpoint: "/networks/:slug/documents/:doc/versions",
      params: {
        slug: get(network, "slug", ""),
        doc: get(selectedDocument, "slug", "")
      },
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onCompleted: () => {
        addAlert({
          type: "success",
          message: t("DOCUMENT_VERSION_SUCCESS"),
          dismissible: true,
          timeout: 5
        })
        selectRefetch()
        dispatch({ type: "UPDATE_VALUE", key: "newVersion", value: false })
      },
      onError: () => {
        addAlert({
          type: "error",
          message: t("DOCUMENT_VERSION_ERROR"),
          dismissible: true,
          timeout: 5
        })
      }
    })

  // Revoke document
  const [revoke, { loading: revokeLoading, error: revokeError }] = useDelete({
    endpoint: "/networks/:slug/documents/:doc",
    params: {
      slug: get(network, "slug", ""),
      doc: get(selectedDocument, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("DOCUMENT_DELETE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      refetch()
      setPanelStatus("closed")
      dispatch({ type: "UPDATE_VALUE", key: "revokeOpen", value: false })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DOCUMENT_DELETE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        data,
        queryLoading,
        selectedDocument,
        selectLoading,
        onDocumentSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedDocument", value: row }),
        sorting,
        pagination: { total, page, perPage },
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        documentOrganisationsPerPage,
        setDocumentOrganisationsPerPage: val =>
          dispatch({ type: "UPDATE_VALUE", key: "documentOrganisationsPerPage", value: val }),
        documentOrganisationsPage,
        setDocumentOrganisationsPage: val =>
          dispatch({ type: "UPDATE_VALUE", key: "documentOrganisationsPage", value: val }),
        documentOrganisationsPagination: {
          total: documentOrganisationsTotal,
          page: documentOrganisationsPage,
          perPage: documentOrganisationsPerPage
        },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        uploadModal,
        setUploadModal: val => dispatch({ type: "UPDATE_VALUE", key: "uploadModal", value: val }),
        revokeOpen,
        setRevoke: val => dispatch({ type: "UPDATE_VALUE", key: "revokeOpen", value: val }),
        orgVal,
        setOrgVal: val => dispatch({ type: "UPDATE_VALUE", key: "orgVal", value: val }),
        newVersion,
        setNewVersion: val => dispatch({ type: "UPDATE_VALUE", key: "newVersion", value: val }),
        documentOrganisations,
        documentOrganisationsLoading,
        organisations,
        suggestionsLoading,
        onSubmitEdit: body => {
          editDocument({ body })
        },
        editLoading,
        uploadDocument: body => {
          addDocument({ body })
        },
        addLoading,
        uploadNewVersion: values => {
          const file = get(values, "file[0]", null)
          const formData = new FormData()
          formData.append("file", file, file.name)

          uploadNewVersion({ body: formData })
        },
        uploadNewVersionLoading,
        revokeLoading,
        onRevoke: () => revoke()
      }}
    >
      {children}
      <ApiError
        error={
          queryError ||
          selectError ||
          documentOrganisationsError ||
          suggestionsError ||
          editError ||
          addError ||
          uploadNewVersionError ||
          revokeError
        }
      />
    </Provider>
  )
}

NetworkDocumentsProvider.propTypes = {
  children: PropTypes.any
}

export default NetworkDocumentsProvider
