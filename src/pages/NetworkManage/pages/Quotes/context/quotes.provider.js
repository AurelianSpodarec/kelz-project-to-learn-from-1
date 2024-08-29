import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useGet, ApiError } from "@4cplatform/elements/Api"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { Provider } from "../../../../../UI/Templates/QuoteAdmin"
import reducer from "./quotes.reducer"
import { NetworkManageContext } from "../../../context/manage.context"
import { getOrderBy } from "../../../../../UI/Helpers"

const QuotesProvider = ({ children, isSimulated }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { provider } = React.useContext(NetworkManageContext)
  const t = useTranslations()

  // State
  const [
    { data, viewData, page, perPage, search, sorting, filter, total, selectedQuote },
    dispatch
  ] = React.useReducer(reducer, {
    data: [],
    viewData: {},
    page: 1,
    perPage: 10,
    search: "",
    sorting: { direction: "asc", dataKey: "created_at" },
    filter: "client_name",
    total: null,
    selectedQuote: null
  })

  // Set the query search if search is truthy
  let querySearch = {}
  if (search) {
    querySearch = {
      [filter]: search
    }
  }

  // Index Quotes
  const { loading: queryLoading, error: queryError } = useGet({
    endpoint: "/quotes",
    query: {
      page,
      limit: perPage,
      order_by: getOrderBy(sorting),
      simulated: isSimulated,
      with: ["organisation", "client", "salesAgent"],
      provider_name: get(provider, "name", ""),
      ...querySearch
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("QUOTES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Get Quote
  const { loading: viewLoading, error: viewError } = useGet({
    endpoint: "/quotes/:slug",
    skip: !selectedQuote,
    params: {
      slug: get(selectedQuote, "slug", "")
    },
    query: {
      with: ["client", "salesAgent", "provider"]
    },
    onCompleted: res => {
      const newData = get(res, "data", {})
      dispatch({ type: "UPDATE_VALUE", key: "viewData", value: newData })
    },
    onError: () => {
      addAlert({
        message: t("QUOTES_VIEW_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        data,
        viewData,
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total, page, perPage },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val }),
        filter,
        queryLoading,
        viewLoading,
        selectedQuote,
        onQuoteSelect: val => dispatch({ type: "UPDATE_VALUE", key: "selectedQuote", value: val }),
        onQuoteDeselect: () => dispatch({ type: "UPDATE_VALUE", key: "selectedQuote", value: null })
      }}
    >
      {children}
      <ApiError error={queryError || viewError} />
    </Provider>
  )
}

QuotesProvider.defaultProps = {
  children: null,
  isSimulated: false
}

QuotesProvider.propTypes = {
  children: PropTypes.any,
  isSimulated: PropTypes.bool
}

export default QuotesProvider
