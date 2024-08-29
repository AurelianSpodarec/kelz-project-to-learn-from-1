import React from "react"
import PropTypes from "prop-types"
import { get, isEmpty, findIndex } from "lodash"
import { useGet, useDelete, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../../../UI/Templates/OrganisationAdmin"

// Helpers
import { getOrderBy } from "../../../UI/Helpers"
import reducer from "./organisations.reducer"
import { PageContext } from "../../../UI/Organisms"

const OrganisationsProvider = ({ children }) => {
  const t = useTranslations()
  const { addAlert } = React.useContext(AlertsContext)
  const { setPanelStatus } = React.useContext(PageContext)

  // State
  const [
    { page, perPage, showDeleted, search, selectedOrganisation, sorting, total, data },
    dispatch
  ] = React.useReducer(reducer, {
    page: 1,
    perPage: 10,
    showDeleted: false,
    search: "",
    selectedOrganisation: null,
    sorting: { direction: "asc", dataKey: "name" },
    total: null,
    data: []
  })

  // Index Organisations query
  const { loading, error, refetch } = useGet({
    endpoint: "/organisations",
    query: {
      name: search,
      page,
      limit: perPage,
      deleted: showDeleted,
      order_by: getOrderBy(sorting)
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])

      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("ORGANISATIONS_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Get organisation
  const { loading: selectLoading, error: selectError } = useGet({
    endpoint: "/organisations/:slug",
    params: {
      slug: get(selectedOrganisation, "slug")
    },
    query: {
      with: ["address"]
    },
    onCompleted: res => {
      const newData = get(res, "data", null)
      dispatch({ type: "UPDATE_VALUE", key: "selectedOrganisation", value: newData })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("ORGANISATION_GET_ERROR"),
        dismissible: true,
        timeout: 5
      })
    },
    skip:
      !get(selectedOrganisation, "slug") || get(selectedOrganisation, "deleted_at", null) !== null
  })

  // Optional function for firing after update actions
  const onPatch = async (organisation = {}) => {
    if (isEmpty(organisation)) {
      await refetch()
    } else {
      const i = findIndex(data, { slug: get(organisation, "slug") })

      dispatch({
        type: "UPDATE_VALUE",
        key: "data",
        value: [...data.slice(0, i), organisation, ...data.slice(i + 1)]
      })
    }
    setPanelStatus("closed")
  }

  // Delete Network mutation
  const [deleteOrganisation, { loading: deleteLoading }] = useDelete({
    endpoint: "/organisations/:organisation",
    params: {
      organisation: get(selectedOrganisation, "slug", "")
    },
    onCompleted: () => {
      // Display success message, refetch index query
      addAlert({
        message: t("ORGANISATION_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      refetch()
      setPanelStatus("closed")
    },
    onError: err => console.error(err)
  })

  return (
    <Provider
      value={{
        data,
        selectedOrganisation,
        onOrganisationSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedOrganisation", value: row }),
        onOrganisationDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedOrganisation", value: null }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total, page, perPage },
        showDeleted,
        setShowDeleted: val => dispatch({ type: "UPDATE_VALUE", key: "showDeleted", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        queryLoading: loading,
        onPatch,
        deleteLoading,
        onDeleteOrganisation: () => deleteOrganisation(),
        selectLoading
      }}
    >
      {children}
      <ApiError error={error || selectError} />
    </Provider>
  )
}

OrganisationsProvider.defaultProps = {
  children: null
}

OrganisationsProvider.propTypes = {
  children: PropTypes.any
}

export default OrganisationsProvider
