import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, ApiError, useDelete } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../../../UI/Templates/ProviderAdmin"

// Helpers
import { PageContext } from "../../../UI/Organisms"
import { getOrderBy } from "../../../UI/Helpers"
import reducer from "./providers.reducer"

const ProvidersProvider = ({ children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { setPanelStatus } = React.useContext(PageContext)
  const t = useTranslations()

  // State
  const [
    {
      page,
      perPage,
      showDeleted,
      search,
      selectedProvider,
      sorting,
      total,
      data,
      viewData,
      deleteModal
    },
    dispatch
  ] = React.useReducer(reducer, {
    page: 1,
    perPage: 10,
    showDeleted: false,
    search: "",
    selectedProvider: null,
    sorting: { direction: "asc", dataKey: "name" },
    total: null,
    data: [],
    viewData: {},
    deleteModal: false
  })

  // Index Providers query
  const { loading, error, refetch } = useGet({
    endpoint: "/providers",
    query: {
      search,
      page,
      limit: perPage,
      deleted: showDeleted ? 1 : 0,
      order_by: getOrderBy(sorting)
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("PROVIDERS_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Provider data query
  const { loading: viewLoading, error: viewError } = useGet({
    endpoint: "/providers/:slug",
    skip: !selectedProvider || !get(selectedProvider, "slug"),
    params: {
      slug: get(selectedProvider, "slug", "")
    },
    query: {
      deleted: !!get(selectedProvider, "deleted_at", false)
    },
    onCompleted: res => {
      const newData = get(res, "data", {})
      dispatch({ type: "UPDATE_VALUE", key: "viewData", value: newData })
    },
    onError: () => {
      addAlert({
        message: t("PROVIDER_VIEW_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Delete Provider mutation
  const [deleteProvider, { loading: deleteLoading, error: deleteError }] = useDelete({
    endpoint: "/providers/:slug",
    params: {
      slug: get(selectedProvider, "slug", "")
    },
    onCompleted: () => {
      // Display success message, refetch index query
      addAlert({
        message: t("PROVIDER_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      refetch()
      setPanelStatus("closed")
      dispatch({ type: "UPDATE_SHOW_DELETE_MODAL", value: false })
    },
    onError: err => console.error(err)
  })

  return (
    <Provider
      value={{
        data,
        viewData,
        queryLoading: loading,
        viewLoading,
        queryError: error,
        selectedProvider,
        onProviderSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedProvider", value: row }),
        onProviderDeselect: () => {
          dispatch({ type: "UPDATE_VALUE", key: "selectedProvider", value: null })
          dispatch({ type: "UPDATE_VALUE", key: "viewData", value: {} })
        },
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total, page, perPage },
        showDeleted,
        setShowDeleted: val => dispatch({ type: "UPDATE_VALUE", key: "showDeleted", value: val }),
        deleteModal,
        setDeleteModal: value => dispatch({ type: "UPDATE_SHOW_DELETE_MODAL", value }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        deleteLoading,
        onDeleteProvider: () => {
          deleteProvider()
        }
      }}
    >
      {children}
      <ApiError error={error || viewError || deleteError} />
    </Provider>
  )
}

ProvidersProvider.defaultProps = {
  children: null
}

ProvidersProvider.propTypes = {
  children: PropTypes.any
}

export default ProvidersProvider
