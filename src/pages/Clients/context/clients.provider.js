import React from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { get } from "lodash"
import { useGet, usePatch, usePost, useDelete, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../../../UI/Templates/ClientAdmin"

// Helpers
import { getOrderBy } from "../../../UI/Helpers"
import reducer from "./clients.reducer"
import { PageContext } from "../../../UI/Organisms"

const ClientsProvider = ({ children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { setPanelStatus } = React.useContext(PageContext)
  const history = useHistory()

  const t = useTranslations()

  // State
  const [
    {
      data,
      viewData,
      showSimulated,
      quotesShowSimulated,
      policiesShowSimulated,
      search,
      quotesSearch,
      policiesSearch,
      filter,
      quotesFilter,
      policiesFilter,
      selectedClient,
      sorting,
      quotesSorting,
      policiesSorting,
      page,
      quotesPage,
      policiesPage,
      perPage,
      quotesPerPage,
      policiesPerPage,
      total,
      quotesTotal,
      policiesTotal,
      notesModal,
      panelBodyContent,
      policySummaryModal,
      clientPolicies,
      quoteSummaryModal,
      clientQuotes,
      deleteQuoteModal,
      clientNotes
    },
    dispatch
  ] = React.useReducer(reducer, {
    data: [],
    viewData: {},
    showSimulated: true,
    quotesShowSimulated: true,
    policiesShowSimulated: true,
    search: "",
    quotesSearch: "",
    policiesSearch: "",
    quotesFilter: "reference",
    policiesFilter: "reference",
    selectedClient: null,
    sorting: { direction: "desc", dataKey: "created_at" },
    quotesSorting: { direction: "asc", dataKey: "reference" },
    policiesSorting: { direction: "asc", dataKey: "reference" },
    page: 1,
    quotesPage: 1,
    policiesPage: 1,
    perPage: 10,
    quotesPerPage: 10,
    policiesPerPage: 10,
    total: null,
    quotesTotal: null,
    policiesTotal: null,
    notesModal: false,
    panelBodyContent: "Journey",
    policySummaryModal: false,
    clientPolicies: [],
    quoteSummaryModal: false,
    clientQuotes: [],
    deleteQuoteModal: false,
    clientNotes: []
  })

  // Index Clients query
  const {
    loading: queryLoading,
    refetch: clientsRefetch,
    error
  } = useGet({
    endpoint: "/clients",
    query: {
      limit: perPage,
      order_by: getOrderBy(sorting),
      page,
      search
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("CLIENTS_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Client data query
  const {
    loading: viewLoading,
    refetch: viewRefetch,
    error: viewError
  } = useGet({
    endpoint: "/clients/:slug",
    skip: !selectedClient,
    params: {
      slug: get(selectedClient, "slug", "")
    },
    query: {
      with: ["salesAgent"]
    },
    onCompleted: res => {
      dispatch({ type: "UPDATE_VALUE", key: "viewData", value: get(res, "data", {}) })
    },
    onError: () => {
      addAlert({
        message: t("CLIENT_VIEW_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Edit client mutation
  const [onUpdateClient, { loading: updateLoading, error: clientUpdateError }] = usePatch({
    endpoint: "/clients/:slug",
    params: {
      slug: get(selectedClient, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("CLIENT_UPDATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      clientsRefetch()
      setPanelStatus("closed")
    },
    onError: () => {
      addAlert({
        message: t("CLIENT_UPDATE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Start Journey
  const [onStartJourney, { loading: startJourneyLoading, error: startJourneyError }] = usePost({
    endpoint: "/clients/:slug/journeys",
    params: {
      slug: get(selectedClient, "slug", "")
    },
    onCompleted: response => {
      addAlert({
        message: t("JOURNEY_START_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      setPanelStatus("closed")
      history.push(get(response, "data.page.route"))
    },
    onError: () => {
      addAlert({
        message: t("START_JOURNEY_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Get Policies
  const { loading: getPoliciesLoading, error: getPoliciesError } = useGet({
    endpoint: "/clients/:slug/policies",
    skip: !get(selectedClient, "slug", null) || panelBodyContent !== "Policies",
    params: {
      slug: get(selectedClient, "slug", "")
    },
    query: {
      simulated: policiesShowSimulated,
      limit: policiesPerPage,
      order_by: getOrderBy(policiesSorting),
      page: policiesPage,
      [policiesFilter]: policiesSearch || undefined
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "UPDATE_VALUE", key: "clientPolicies", value: newData })
      dispatch({ type: "UPDATE_VALUE", key: "policiesTotal", value: newTotal })
    },
    onError: () => {
      addAlert({
        message: t("CLIENT_POLICIES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Get Notes
  const {
    loading: getNotesLoading,
    error: getNotesError,
    refetch: notesRefetch
  } = useGet({
    endpoint: "/clients/:slug/notes",
    params: {
      slug: get(selectedClient, "slug", "")
    },
    skip: !get(selectedClient, "slug", null) || panelBodyContent !== "Notes",
    simulated: showSimulated,
    onCompleted: res => {
      const newData = get(res, "data", [])
      dispatch({ type: "UPDATE_VALUE", key: "clientNotes", value: newData })
    },
    onError: () => {
      addAlert({
        message: t("NOTE_INDEX_ERROR")
      })
    }
  })

  // Get Quotes
  const {
    loading: getQuotesLoading,
    error: getQuotesError,
    refetch: refetchQuotes
  } = useGet({
    endpoint: "/clients/:slug/journeys",
    params: {
      slug: get(selectedClient, "slug", "")
    },
    query: {
      simulation_mode: quotesShowSimulated,
      limit: quotesPerPage,
      order_by: getOrderBy(quotesSorting),
      page: quotesPage,
      [quotesFilter]: quotesSearch || undefined
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "UPDATE_VALUE", key: "clientQuotes", value: newData })
      dispatch({ type: "UPDATE_VALUE", key: "quotesTotal", value: newTotal })
    },
    onError: () => {
      addAlert({
        message: t("CLIENT_QUOTES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(selectedClient, "slug", null) || panelBodyContent !== "Quotes"
  })

  // Add client note
  const [addNote, { loading: addNoteLoading, error: addNoteError }] = usePost({
    endpoint: "/clients/:slug/notes",
    params: {
      slug: get(selectedClient, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("NOTE_ADD_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      notesRefetch()
    },
    onError: () => {
      addAlert({
        message: t("NOTE_ADD_ERROR")
      })
    },
    skip: !get(selectedClient, "slug", null)
  })

  // Delete Quote
  const [deleteQuote, { loading: deleteQuoteLoading, error: deleteQuoteError }] = useDelete({
    endpoint: "/journeys/:journey",
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("CLIENT_QUOTE_DELETE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "deleteQuoteModal", value: false })
      setPanelStatus("closed")
      refetchQuotes()
    },
    onError: () => {
      addAlert({
        message: t("CLIENT_QUOTE_DELETE_ERROR"),
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
        quotesSearch,
        policiesSearch,
        filter,
        quotesFilter,
        policiesFilter,
        showSimulated,
        quotesShowSimulated,
        policiesShowSimulated,
        selectedClient,
        sorting,
        quotesSorting,
        policiesSorting,
        page,
        quotesPage,
        policiesPage,
        perPage,
        quotesPerPage,
        policiesPerPage,
        total,
        quotesTotal,
        policiesTotal,
        notesModal,
        queryLoading,
        viewLoading,
        viewRefetch,
        updateLoading,
        clientUpdateError,
        onUpdateClient,
        startJourneyLoading,
        onStartJourney,
        panelBodyContent,
        policySummaryModal,
        clientPolicies,
        getPoliciesLoading,
        quoteSummaryModal,
        clientQuotes,
        getQuotesLoading,
        deleteQuoteModal,
        deleteQuoteLoading,
        getNotesLoading,
        clientNotes,
        addNoteLoading,
        updateQuotesPageValue: (key, value) =>
          [
            "quotesSorting",
            "quotesPage",
            "quotesPerPage",
            "quotesShowSimulated",
            "quotesFilter",
            "quotesSearch"
          ].includes(key) && dispatch({ type: "UPDATE_VALUE", key, value }),
        updatePoliciesPageValue: (key, value) =>
          [
            "policiesSorting",
            "policiesPage",
            "policiesPerPage",
            "policiesShowSimulated",
            "policiesFilter",
            "policiesSearch"
          ].includes(key) && dispatch({ type: "UPDATE_VALUE", key, value }),
        setShowSimulated: val =>
          dispatch({ type: "UPDATE_VALUE", key: "showSimulated", value: val }),
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val }),
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        onClientSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedClient", value: row }),
        onClientDeselect: () => {
          dispatch({ type: "UPDATE_VALUE", key: "selectedClient", value: null })
          dispatch({ type: "UPDATE_VALUE", key: "viewData", value: {} })
        },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        pagination: { total, page, perPage },
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        setNotesModal: val => dispatch({ type: "UPDATE_VALUE", key: "notesModal", value: val }),
        setPanelBodyContent: val =>
          dispatch({ type: "UPDATE_VALUE", key: "panelBodyContent", value: val }),
        setPolicySummaryModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "policySummaryModal", value: val }),
        setQuoteSummaryModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "quoteSummaryModal", value: val }),
        setDeleteQuoteModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "deleteQuoteModal", value: val }),
        onDeleteQuote: quote => {
          deleteQuote({
            params: {
              journey: get(quote, "slug", null)
            }
          })
        },
        onAddNote: val =>
          addNote({
            body: {
              body: val,
              type: "GENERAL"
            }
          })
      }}
    >
      {children}
      <ApiError
        error={
          error ||
          viewError ||
          clientUpdateError ||
          startJourneyError ||
          getPoliciesError ||
          getQuotesError ||
          deleteQuoteError ||
          getNotesError ||
          addNoteError
        }
      />
    </Provider>
  )
}

ClientsProvider.defaultProps = {
  children: null
}

ClientsProvider.propTypes = {
  children: PropTypes.any
}

export default ClientsProvider
