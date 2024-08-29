/* eslint-disable react/prop-types */
import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { waitFor, within, fireEvent } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import ClientsAdmin from "."
import ClientsPanel from "./clients.panel"
import ClientNotes from "./clients.panel.header.notes"

import StoryClientsProvider from "./story/clients.story.provider"

// Helpers
import { Providers, fakeApiUrl, fakeSelfServiceResponse } from "../../Helpers"
import { testClientNotes, testData } from "./story/clients.story.helpers"
import Clients from "../../../pages/Clients/clients"

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

const TestComponent = ({ value = {}, user, ...props }) => (
  <Providers user={user}>
    <StoryClientsProvider value={value}>
      <Container style={{ position: "static" }}>
        <ClientsAdmin {...props} />
      </Container>
      <ClientsPanel {...props} />
      <ClientNotes {...props} />
    </StoryClientsProvider>
  </Providers>
)

describe("<ClientAdmin />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container } = renderWithTheme(
      <TestComponent value={{ hasActions: true }} />
    )
    const search = getByTestId("search_clients-input")
    const selectClient = getByTestId("clients-table-actions_button_0")
    const actions = getByTestId("clients-actions-wrapper")

    // Assert
    expect(search).toBeInTheDocument()
    expect(selectClient).toBeInTheDocument()
    expect(actions).toBeInTheDocument()

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "flex-end")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "1rem")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Selecting and deselecting a client", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent value={{ hasActions: true }} />)

    const selectClient = getByTestId("clients-table-actions_button_0")
    const panel = getByTestId("clients_panel-flyout_panel-wrapper")

    userEvent.click(selectClient)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    expect(getByTestId("journey-button").className.includes("active")).toBe(true)

    userEvent.click(selectClient)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
  test("Opening policies summary modal", async () => {
    const { getByTestId } = renderWithTheme(
      <TestComponent
        value={{ hasActions: true, panelBodyContent: "Policies", policySummaryModal: true }}
      />
    )
    const selectClient = getByTestId("clients-table-actions_button_0")
    userEvent.click(selectClient)
    const panel = getByTestId("clients_panel-flyout_panel-wrapper")

    const policiesButton = getByTestId("policies-button")
    userEvent.click(policiesButton)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-1rem")
    })

    const viewButton = getByTestId("view-policy-button")
    userEvent.click(viewButton)
    await waitFor(() => {
      const modal = getByTestId("modal-modal-wrapper")
      expect(within(modal).getByText("Policy details")).toBeInTheDocument()
    })
  })
  test("Opening quotes tab and quote summary modal", async () => {
    const { getByTestId } = renderWithTheme(
      <TestComponent
        value={{ hasActions: true, panelBodyContent: "Quotes", policySummaryModal: true }}
      />
    )
    const selectClient = getByTestId("clients-table-actions_button_0")
    userEvent.click(selectClient)
    const panel = getByTestId("clients_panel-flyout_panel-wrapper")

    const quotesButton = getByTestId("quotes-button")
    userEvent.click(quotesButton)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-1rem")
    })

    const viewButton = getByTestId("view-quote-button")
    userEvent.click(viewButton)
    await waitFor(() => {
      const modal = getByTestId("modal-modal-wrapper")
      expect(within(modal).getByText("Quote summary")).toBeInTheDocument()
    })
  })
  test("Opening notes modal and adding note", async () => {
    const mockOnAddNote = jest.fn()

    // Render
    const { getByTestId, getAllByText } = renderWithTheme(
      <TestComponent value={{ hasActions: true, notesModal: false, onAddNote: mockOnAddNote }} />
    )

    // Select a client
    const selectClient = getByTestId("clients-table-actions_button_0")
    userEvent.click(selectClient)
    await waitFor(() => {
      expect(getByTestId("add_note-button")).toBeInTheDocument()
    })

    // Open add Note Modal
    const button = getByTestId("add_note-button")
    userEvent.click(button)
    await waitFor(() => {
      expect(getByTestId("notes_modal-modal-header")).toBeInTheDocument()
      // There should be two instance of the note in the whole document, one showing in the flyout Notes tab and one in the Modal.
      expect(getAllByText(testData[0].notes[0].body).length).toBe(2)
    })

    // Add note
    const addButton = getByTestId("add_new_note-button")
    const input = getByTestId("note-input")
    fireEvent.change(input, { target: { value: "test" } })
    await waitFor(() => {
      expect(input).toHaveValue("test")
    })

    userEvent.click(addButton)

    // Assert
    await waitFor(() => {
      expect(mockOnAddNote).toHaveBeenCalledTimes(1)
      expect(mockOnAddNote).toHaveBeenCalledWith("test")
    })
  })

  test("Searching table", async () => {
    // Mocks
    const test = jest.fn()
    mockAxios.onGet(`${fakeApiUrl}/clients`).reply(({ params }) => {
      test(params)
      return [200, { data: [] }]
    })

    // Render
    const { getByTestId } = renderWithTheme(
      <Providers>
        <Clients />
      </Providers>
    )

    // Initial call params
    expect(test).toHaveBeenCalledWith({
      limit: 10,
      order_by: "created_at_desc",
      page: 1,
      search: ""
    })
    test.mockClear()

    // Add 3+ characters search input field
    const searchInputField = getByTestId("search_clients-input")
    fireEvent.change(searchInputField, { target: { value: "test" } })
    await waitFor(() => {
      // Search should be sent to endpoint
      expect(test).toHaveBeenCalledWith({
        limit: 10,
        order_by: "created_at_desc",
        page: 1,
        search: "test"
      })
      test.mockClear()
    })

    // Change search input field to < 3 characters
    fireEvent.change(searchInputField, { target: { value: "te" } })
    await waitFor(() => {
      expect(searchInputField.value).toBe("te")
    })

    // No search should be sent to endpoint as value is less than 3 characters
    expect(test).toHaveBeenCalledWith({
      limit: 10,
      order_by: "created_at_desc",
      page: 1,
      search: ""
    })
    test.mockClear()
  })

  describe("Flyout panel", () => {
    test("Quotes tab", async () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent value={{ panelBodyContent: "Quotes" }} />
      )

      const selectClient = getByTestId("clients-table-actions_button_0")
      const panel = getByTestId("clients_panel-flyout_panel-wrapper")

      userEvent.click(selectClient)
      await waitFor(() => {
        expect(panel).toHaveStyleRule("right", "-1rem")
      })

      expect(getByTestId("quotes-button").className.includes("active")).toBe(true)

      const filterSelect = getByTestId("filter_search-quotes-select")
      fireEvent.change(filterSelect, { target: { value: "reference" } })
      await waitFor(() => {
        expect(filterSelect.value).toBe("reference")
      })

      const searchInput = getByTestId("search_client-quotes-input")
      fireEvent.change(searchInput, { target: { value: "test" } })
      await waitFor(() => {
        expect(searchInput.value).toBe("test")
      })
    })

    test("Policies tab", async () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent value={{ panelBodyContent: "Policies" }} />
      )

      const selectClient = getByTestId("clients-table-actions_button_0")
      const panel = getByTestId("clients_panel-flyout_panel-wrapper")

      userEvent.click(selectClient)
      await waitFor(() => {
        expect(panel).toHaveStyleRule("right", "-1rem")
      })

      expect(getByTestId("policies-button").className.includes("active")).toBe(true)

      const filterSelect = getByTestId("filter_search-policies-select")
      fireEvent.change(filterSelect, { target: { value: "reference" } })
      await waitFor(() => {
        expect(filterSelect.value).toBe("reference")
      })

      const searchInput = getByTestId("search_client-policies-input")
      fireEvent.change(searchInput, { target: { value: "test" } })
      await waitFor(() => {
        expect(searchInput.value).toBe("test")
      })
    })

    test("Notes tab", async () => {
      // Render
      const { getByTestId } = renderWithTheme(<TestComponent />)

      // Save element references
      const selectClient = getByTestId("clients-table-actions_button_0")
      const panel = getByTestId("clients_panel-flyout_panel-wrapper")

      // Select client
      userEvent.click(selectClient)

      // Note should not be shown to begin with
      expect(() => within(panel).getByText(testClientNotes[0].body)).toThrowError()

      // Select Notes to show on flyout panel
      const notesButton = getByTestId("notes-button")
      userEvent.click(notesButton)
      await waitFor(() => {
        expect(getByTestId("notes-button").className.includes("active")).toBe(true)
      })

      // Notes should now show
      expect(within(panel).getByText(testClientNotes[0].body)).toBeInTheDocument()
    })
  })

  test("Edit a client", async () => {
    const test = jest.fn()

    // Mocks
    mockAxios.onGet(`${fakeApiUrl}/clients`).reply(() => {
      test()
      return [200, { data: testData }]
    })
    mockAxios
      .onGet(`${fakeApiUrl}/clients/${testData[0].slug}`)
      .replyOnce(200, { data: testData[0] })
    mockAxios.onPatch(`${fakeApiUrl}/clients/${testData[0].slug}`).replyOnce(200)

    // Render
    const { queryAllByTestId, getByTestId } = renderWithTheme(
      <Providers>
        <Clients />
      </Providers>
    )

    // Wait until table has loaded
    await waitFor(() => {
      expect(queryAllByTestId("skeleton-loader").length).toBe(0)
    })

    // Select Client from table
    const flyoutButton = getByTestId("clients-table-actions_button_0")
    const panel = getByTestId("clients_panel-flyout_panel-wrapper")
    userEvent.click(flyoutButton)
    await waitFor(() => {
      // Flyout should open
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    // Select edit
    const editButton = getByTestId("edit_client-button")
    userEvent.click(editButton)
    await waitFor(() => {
      // Flyout should be in edit mode (wider)
      expect(panel).toHaveStyleRule("right", "-1rem")
    })

    // Save edit changes
    const submitButton = getByTestId("edit_client_submit-button")
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-80rem")
    })

    // After edit has saved, the table shold be reloaded (therefore hitting load table endpoint twice)
    expect(test).toHaveBeenCalledTimes(2)
  })

  test("Start journey as simulated mode", async () => {
    // Define user with simulation mode
    const settings = [
      {
        id: 18,
        group: "SALES_SETTINGS",
        key: "SIMULATION_MODE",
        data: {
          value: true
        }
      }
    ]
    const user = { data: { ...fakeSelfServiceResponse.data, settings } }

    // Render
    const { getByTestId } = renderWithTheme(<TestComponent user={user} />)

    const selectClient = getByTestId("clients-table-actions_button_0")
    const panel = getByTestId("clients_panel-flyout_panel-wrapper")

    // Select Client
    userEvent.click(selectClient)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    // Click start Journey to open modal
    const startJourneyButton = getByTestId("start_journey-button")
    userEvent.click(startJourneyButton)
    await waitFor(() => {
      expect(getByTestId("modal-portal-container")).toBeInTheDocument()
    })

    // Modal should show message when simulation mode is true
    expect(
      within(getByTestId("modal-portal-container")).getByText("Simulation mode is currently active")
    )
  })
})
