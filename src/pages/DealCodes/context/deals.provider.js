import React from "react"
import PropTypes from "prop-types"
import { useGet, usePatch, useDelete, ApiError } from "@4cplatform/elements/Api"
import { get } from "lodash"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../../../UI/Templates/DealCodeAdmin"

// Helpers
import reducer from "./deals.reducer"
import { getOrderBy } from "../../../UI/Helpers"
import { PageContext } from "../../../UI/Organisms"

const DealCodesProvider = ({ children }) => {
  const t = useTranslations()
  const { addAlert } = React.useContext(AlertsContext)
  const { setPanelStatus } = React.useContext(PageContext)

  // State
  const [{ page, perPage, total, search, selectedDealCode, sorting, data }, dispatch] =
    React.useReducer(reducer, {
      page: 1,
      perPage: 5,
      search: "",
      selectedDealCode: null,
      sorting: { direction: "asc", dataKey: "created_at" },
      data: [],
      total: null
    })

  // Index deal codes
  const {
    loading: queryLoading,
    error: queryError,
    refetch: refetchQuery
  } = useGet({
    endpoint: "/deal-codes",
    query: {
      name: search,
      page,
      limit: perPage,
      order_by: getOrderBy(sorting)
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])

      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DEAL_CODES_INDEX_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Get deal code
  const {
    loading: selectLoading,
    error: selectError,
    refetch: refetchSelect
  } = useGet({
    endpoint: "/deal-codes/:slug",
    params: {
      slug: get(selectedDealCode, "slug")
    },
    onCompleted: res => {
      const newData = get(res, "data", null)
      dispatch({ type: "UPDATE_VALUE", key: "selectedDealCode", value: newData })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DEAL_CODE_GET_ERROR"),
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(selectedDealCode, "slug")
  })

  // Update deal code
  const [updateDealCode, { loading: updateLoading, error: updateError }] = usePatch({
    endpoint: "/deal-codes/:slug",
    params: {
      slug: get(selectedDealCode, "slug")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("DEAL_CODE_UPDATE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      setPanelStatus("open")
      refetchSelect()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DEAL_CODE_UPDATE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Delete deal code
  const [deleteDealCode, { loading: deleteLoading, error: deleteError }] = useDelete({
    endpoint: "/deal-codes/:slug",
    params: {
      slug: get(selectedDealCode, "slug")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("DEAL_CODE_DELETE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      setPanelStatus("closed")
      refetchQuery()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DEAL_CODE_DELETE_ERROR"),
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
        selectedDealCode,
        onDealCodeSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedDealCode", value: row }),
        onDealCodeDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedDealCode", value: null }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total, page, perPage },
        selectLoading,
        onUpdateDealCodeSubmit: body => updateDealCode(body),
        updateLoading,
        onDeleteDealCode: () => deleteDealCode(),
        deleteLoading,
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting
      }}
    >
      {children}
      <ApiError error={queryError || selectError || updateError || deleteError} />
    </Provider>
  )
}

DealCodesProvider.propTypes = {
  children: PropTypes.any
}

export default DealCodesProvider
