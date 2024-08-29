import React, { useContext } from "react"
import { useLocation } from "react-router-dom"
import queryString from "query-string"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../../../../../UI/Templates/JourneyAdmin"

// Helpers
import { getOrderBy } from "../../../../../UI/Helpers"
import reducer from "./journeys.reducer"
import { OrganisationManageContext } from "../../../context/manage.context"

const JourneysProvider = ({ children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { organisation } = useContext(OrganisationManageContext)

  const t = useTranslations()
  const { search: lSearch } = useLocation()
  const qs = queryString.parse(lSearch)
  const queryStatus = get(qs, "status")

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
    status: queryStatus || "IN_PROGRESS",
    hasStatusFilter: true,
    search: "",
    selectedJourney: null,
    filter: "reference",
    sorting: { direction: "desc", dataKey: "created_at" },
    page: 1,
    perPage: 10,
    total: null
  })

  // Set the query search if search is truthy
  let querySearch = {}
  if (search) {
    querySearch = {
      [filter]: search
    }
  }

  // Index Journeys query
  const {
    loading: queryLoading,
    error,
    refetch: queryRefetch
  } = useGet({
    endpoint: "/journeys",
    query: {
      limit: perPage,
      order_by: getOrderBy(sorting),
      status,
      page,
      organisation_id: organisation.id,
      ...querySearch
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
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
  const {
    loading: viewLoading,
    error: viewError,
    refetch: viewRefetch
  } = useGet({
    endpoint: "/journeys/:slug",
    skip: !selectedJourney,
    params: {
      slug: get(selectedJourney, "slug", "")
    },
    query: {
      with: ["client", "salesAgent"]
    },
    onCompleted: res => {
      const newData = get(res, "data", {})

      dispatch({ type: "UPDATE_VALUE", key: "viewData", value: newData })
    },
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
        filter,
        hasStatusFilter,
        search,
        selectedJourney,
        sorting,
        page,
        perPage,
        total,
        queryLoading,
        queryRefetch,
        viewLoading,
        viewRefetch,
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
      <ApiError error={error || viewError} />
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
