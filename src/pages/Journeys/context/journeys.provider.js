import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import { useLocation } from "react-router-dom"
import { get } from "lodash"
import { useGet, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../../../UI/Templates/JourneyAdmin"

// Helpers
import { getOrderBy } from "../../../UI/Helpers"
import reducer from "./journeys.reducer"

const JourneysProvider = ({ children }) => {
  const location = useLocation()
  const qs = queryString.parse(location.search)
  const { addAlert } = React.useContext(AlertsContext)

  const t = useTranslations()

  const clientIdFilterParam = get(qs, "client_id", null)

  // State
  const [
    {
      data,
      viewData,
      status,
      hasStatusFilter,
      search,
      filter,
      selectedJourney,
      sorting,
      page,
      perPage,
      total
    },
    dispatch
  ] = React.useReducer(reducer, {
    data: [],
    viewData: {},
    status: get(qs, "status", ""),
    hasStatusFilter: false,
    search: "",
    selectedJourney: null,
    filter: "reference",
    sorting: { direction: "desc", dataKey: "created_at" },
    page: 1,
    perPage: 10,
    total: null
  })

  // Set the query search if search is truthy
  const querySearch = {}

  if (clientIdFilterParam) querySearch.client_id = clientIdFilterParam

  if (search) querySearch[filter] = search

  // Index Journeys query
  const { loading: queryLoading, error: queryError } = useGet({
    endpoint: "/journeys",
    query: {
      limit: perPage,
      order_by: getOrderBy(sorting),
      status,
      page,
      ...querySearch
    },
    onCompleted: res =>
      dispatch({
        type: "FETCH_COMPLETE",
        total: get(res, "pagination.totalItems"),
        data: get(res, "data", [])
      }),
    onError: () => {
      addAlert({
        message: t("JOURNEYS_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Journey data query
  const { loading: viewLoading, error: viewError } = useGet({
    endpoint: "/journeys/:slug",
    skip: !selectedJourney,
    params: {
      slug: get(selectedJourney, "slug", "")
    },
    query: {
      with: ["client", "salesAgent"]
    },
    onCompleted: res =>
      dispatch({ type: "UPDATE_VALUE", key: "viewData", value: get(res, "data", {}) }),
    onError: () => {
      addAlert({
        message: t("JOURNEY_VIEW_ERROR"),
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
        status,
        hasStatusFilter,
        search,
        selectedJourney,
        sorting,
        page,
        perPage,
        total,
        queryLoading,
        viewLoading,
        filter,
        setStatus: val => dispatch({ type: "UPDATE_VALUE", key: "status", value: val }),
        setHasStatusFilter: val =>
          dispatch({ type: "UPDATE_VALUE", key: "hasStatusFilter", value: val }),
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        onJourneySelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedJourney", value: row }),
        onJourneyDeselect: () => {
          dispatch({ type: "UPDATE_VALUE", key: "selectedJourney", value: null })
          dispatch({ type: "UPDATE_VALUE", key: "viewData", value: {} })
        },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        pagination: { total, page, perPage },
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val })
      }}
    >
      {children}
      <ApiError error={queryError || viewError} />
    </Provider>
  )
}

JourneysProvider.defaultProps = {
  children: null
}

JourneysProvider.propTypes = {
  children: PropTypes.any
}

export default JourneysProvider
