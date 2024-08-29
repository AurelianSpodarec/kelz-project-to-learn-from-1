import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useGet, ApiError } from "@4cplatform/elements/Api"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { Provider } from "../../../../../UI/Templates/OrganisationDocuments"
import { OrganisationManageContext } from "../../../context/manage.context"
import reducer from "./documents.reducer"
import { getOrderBy } from "../../../../../UI/Helpers"

const OrganisationDocumentsProvider = ({ children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { organisation } = React.useContext(OrganisationManageContext)
  const t = useTranslations()

  // State
  const [{ page, perPage, selectedDocument, sorting, total, data }, dispatch] = React.useReducer(
    reducer,
    {
      page: 1,
      perPage: 10,
      selectedDocument: null,
      sorting: { direction: "asc", dataKey: "name" },
      uploadModal: { isOpen: false, step: null },
      revokeOpen: false,
      orgVal: "",
      data: null,
      documentOrganisationsPerPage: 5,
      documentOrganisationsPage: 1
    }
  )

  // Index Organisation Documents
  const { loading: queryLoading, error: queryError } = useGet({
    endpoint: "/organisations/:organisation/inherited-documents",
    params: {
      organisation: get(organisation, "slug", "")
    },
    query: {
      page,
      limit: perPage,
      order_by: getOrderBy(sorting),
      with: ["activeVersion", "documentVersions"]
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
    skip: !get(organisation, "slug", "")
  })

  return (
    <Provider
      value={{
        data,
        queryLoading,
        selectedDocument,
        onDocumentSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedDocument", value: row }),
        onDocumentDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedDocument", value: null }),
        sorting,
        pagination: { total, page, perPage },
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        onVersionClick: version => window.open(version.real_path, "_blank")
      }}
    >
      {children}
      <ApiError error={queryError} />
    </Provider>
  )
}

OrganisationDocumentsProvider.propTypes = {
  children: PropTypes.any
}

export default OrganisationDocumentsProvider
