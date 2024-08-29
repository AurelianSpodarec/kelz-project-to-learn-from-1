import React from "react"
import PropTypes from "prop-types"

// Components
import { Provider } from ".."

// Helpers
import { testData, testClientNotes } from "./clients.story.helpers"
import reducer from "./clients.story.reducer"

const TestClientsProvider = ({ children, value }) => {
  const [
    {
      search,
      selectedClient,
      sorting,
      page,
      perPage,
      notesModal,
      filter,
      policySummaryModal,
      panelBodyContent,
      activeButton,
      clientPolicies,
      quoteSummaryModal,
      clientQuotes,
      clientNotes,
      quotesFilter,
      quotesSearch,
      policiesFilter,
      policiesSearch
    },
    dispatch
  ] = React.useReducer(reducer, {
    data: [],
    viewData: [],
    search: "",
    selectedClient: null,
    sorting: { direction: "asc", dataKey: "first_name" },
    page: 1,
    perPage: 10,
    total: null,
    notesModal: false,
    filter: "first_name",
    policySummaryModal: false,
    panelBodyContent: "Journey",
    activeButton: "",
    quotesFilter: "reference",
    quotesSearch: "",
    policiesFilter: "reference",
    policiesSearch: "",
    clientNotes: testClientNotes,
    clientPolicies: [
      {
        id: 1001,
        slug: "john-apple-doe",
        reference: "reference-1",
        status: "ONBOARDED",
        policy_number: "789",
        product_name: "Product Three",
        monthly_premium: "88.91",
        annual_premium: "957.22",
        months_of_cover: 5,
        underwriting_declined_reason: null,
        declined_reason: null,
        created_at: "2021-08-10T20:28:10.000000Z",
        updated_at: null,
        deleted_at: null,
        sales_agent: {
          id: 1005,
          slug: "sales-adviser-1",
          title: {
            key: "LORD",
            label: "Lord",
            gender: "Male"
          },
          role: {
            id: 2,
            name: "SALES_ADVISER"
          },
          parent: {
            id: 999,
            name: "Organisation 1",
            slug: "organisation-1",
            parent: {
              id: 999,
              name: "Network 1",
              slug: "network-1",
              parent: null,
              type: "NETWORK"
            },
            type: "ORGANISATION"
          },
          first_name: "Sales",
          middle_names: null,
          last_name: "Adviser 1",
          email: "salesadviser1@test.com",
          mobile: null,
          email_verified_at: "2021-08-10T20:28:10.000000Z",
          active: true,
          locked: false,
          created_at: "2021-08-10T20:28:10.000000Z",
          deleted_at: null,
          last_logged_in_at: null
        }
      }
    ],
    quoteSummaryModal: false,
    clientQuotes: [
      {
        id: 1000,
        slug: "abcde-22222",
        organisation_id: 1000,
        network_id: 1000,
        user_id: 1006,
        client_id: 999,
        reference: "AKP8Z-22446",
        product_type: "PMI",
        current_page: "CONSENT_TO_PERSONAL_INFO",
        simulation_mode: true,
        locked: true,
        status: "QUOTED",
        sales_agent_name: "Sales Adviser 2",
        client_name: "John Doe",
        data: [],
        created_at: "2021-08-18T21:11:30.000000Z",
        updated_at: null,
        deleted_at: null
      },
      {
        id: 1001,
        slug: "abcde-33333",
        organisation_id: 999,
        network_id: 999,
        user_id: 1005,
        client_id: 999,
        reference: "SDNVF-11183",
        product_type: "PMI",
        current_page: "CONSENT_TO_PERSONAL_INFO",
        simulation_mode: true,
        locked: true,
        status: "COMPLETE",
        sales_agent_name: "Sales Adviser 1",
        client_name: "John Doe",
        data: [],
        created_at: "2021-08-18T21:11:30.000000Z",
        updated_at: null,
        deleted_at: null
      }
    ]
  })

  return (
    <Provider
      value={{
        data: testData,
        selectedClient,
        viewData: testData,
        search,
        notesModal,
        policySummaryModal,
        panelBodyContent,
        activeButton,
        clientPolicies,
        quoteSummaryModal,
        clientQuotes,
        clientNotes,
        quotesFilter,
        quotesSearch,
        policiesFilter,
        policiesSearch,
        updateQuotesPageValue: (key, quotesValue) =>
          ["quotesFilter", "quotesSearch"].includes(key) &&
          dispatch({ type: "UPDATE_VALUE", key, value: quotesValue }),
        updatePoliciesPageValue: (key, quotesValue) =>
          ["policiesFilter", "policiesSearch"].includes(key) &&
          dispatch({ type: "UPDATE_VALUE", key, value: quotesValue }),
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total: 50, page, perPage },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        onClientSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedClient", value: row }),
        onClientDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedClient", value: null }),
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val }),
        setNotesModal: val => dispatch({ type: "UPDATE_VALUE", key: "notesModal", value: val }),
        setPolicySummaryModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "policySummaryModal", value: val }),
        setPanelBodyContent: val =>
          dispatch({ type: "UPDATE_VALUE", key: "panelBodyContent", value: val }),
        setActiveButton: val => dispatch({ type: "UPDATE_VALUE", key: "activeButton", value: val }),
        setQuoteSummaryModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "quoteSummaryModal", value: val }),
        filter,
        hasActions: true,
        hasStatusFilters: false,
        selectLoading: false,
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestClientsProvider.defaultProps = {
  children: null,
  value: {}
}

TestClientsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestClientsProvider
