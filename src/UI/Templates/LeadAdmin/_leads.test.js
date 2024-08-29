/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import MockAdapter from "axios-mock-adapter"
import { waitFor, within, fireEvent } from "@testing-library/react"
import { api } from "@4cplatform/elements/Api/fetchData"
import userEvent from "@testing-library/user-event"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Components
import LeadAdmin, { LeadsPanel } from "."
import StoryLeadsProvider from "./story/leads.story.provider"

// Helpers
import {
  Providers,
  fakeApiUrl,
  fakeTitlesResponse,
  fakeSelfServiceResponse,
  fakeLeadConfigGetResponse
} from "../../Helpers"
import LeadsProvider from "../../../pages/Leads/context/leads.provider"

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

const TestComponent = ({ value = {}, ...props }) => (
  <Providers mockAxios={mockAxios} {...props}>
    <StoryLeadsProvider value={value}>
      <Container style={{ position: "static" }}>
        <LeadAdmin />
      </Container>
      <LeadsPanel />
    </StoryLeadsProvider>
  </Providers>
)

describe("<LeadAdmin />", () => {
  test("Basic component & styles", async () => {
    // Render
    const { getByTestId, container, getByText, queryAllByText } = renderWithTheme(<TestComponent />)
    await waitFor(() => {
      const search = getByTestId("search_leads-input")
      const selectLead = getByTestId("leads-table-actions_button_0")
      const actions = getByTestId("leads-actions-wrapper")
      const addLead = getByTestId("add_lead-button")

      // Assert
      expect(search).toBeInTheDocument()
      expect(selectLead).toBeInTheDocument()

      expect(getByText("John")).toHaveStyleRule("color", colours.blue)
      expect(queryAllByText("Doe")[0]).toHaveStyleRule("color", colours.blue)

      expect(actions).toHaveStyleRule("display", "flex")
      expect(actions).toHaveStyleRule("justify-content", "space-between")
      expect(actions).toHaveStyleRule("align-items", "flex-end")
      expect(actions).toHaveStyleRule("margin-bottom", "1rem")

      expect(addLead).toHaveStyleRule("height", "5rem")

      // Snapshot
      expect(container.firstChild).toMatchSnapshot()
    })
  })

  describe("Sales Organisation and Sales Agent columns", () => {
    test("As SYS_ADMIN", () => {
      const canAccess = roles => roles.includes("SYS_ADMIN")
      const { getByText } = renderWithTheme(<TestComponent canAccess={canAccess} />)
      expect(getByText("Sales Agent")).toBeInTheDocument()
      expect(getByText("Sales Organisation")).toBeInTheDocument()
    })

    test("As ORG_ADMIN", () => {
      const canAccess = roles => roles.includes("ORG_ADMIN")
      const user = { ...fakeSelfServiceResponse }
      user.role = { name: "ORG_ADMIN" }
      const { getByText } = renderWithTheme(<TestComponent user={user} canAccess={canAccess} />)
      expect(getByText("Sales Agent")).toBeInTheDocument()
      expect(() => getByText("Sales Organisation")).toThrowError()
    })

    test("As SALES_ADVISER", () => {
      const canAccess = roles => roles.includes("SALES_ADVISER")
      const user = { ...fakeSelfServiceResponse }
      user.role = { name: "SALES_ADVISER" }
      const { getByText } = renderWithTheme(<TestComponent user={user} canAccess={canAccess} />)
      expect(() => getByText("Sales Agent")).toThrowError()
      expect(() => getByText("Sales Organisation")).toThrowError()
    })
  })

  describe("Show deleted", () => {
    test("logged in as SYS_ADMIN", () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent canAccess={roles => roles.includes("SYS_ADMIN")} />
      )
      expect(getByTestId("show_deleted-checkbox-label")).toBeInTheDocument()
    })

    test("logged in as ORG_ADMIN", () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent canAccess={roles => roles.includes("ORG_ADMIN")} />
      )
      expect(getByTestId("show_deleted-checkbox-label")).toBeInTheDocument()
    })

    test("logged in as SUPPORT_ADMIN", () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent canAccess={roles => roles.includes("SUPPORT_ADMIN")} />
      )
      expect(getByTestId("show_deleted-checkbox-label")).toBeInTheDocument()
    })

    test("logged in as SALES_ADVISER", () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent canAccess={roles => roles.includes("SALES_ADVISER")} />
      )
      expect(() => getByTestId("show_deleted-checkbox-label")).toThrowError()
    })
  })

  test("Selecting and deselecting a lead", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)

    await waitFor(() => {
      expect(getByTestId("leads-table-actions_button_0")).toBeInTheDocument()
    })

    const selectLead = getByTestId("leads-table-actions_button_0")
    const panel = getByTestId("leads_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectLead)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the lead's information
      expect(within(panel).getAllByText("Mr John Doe").length).toBe(1)
      expect(within(panel).getAllByText("Created: 01/01/21 00:00").length).toBe(1)
      expect(within(panel).getAllByText("PMI, External").length).toBe(1)
      expect(within(panel).getAllByText("john.doe@example.test").length).toBe(1)
      expect(within(panel).getAllByText("+4407715344054 (Primary)").length).toBe(1)
    })

    userEvent.click(selectLead)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })

  test("Switching lead side panel", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)
    await waitFor(() => {
      expect(getByTestId("leads-table-actions_button_0")).toBeInTheDocument()
    })

    const selectLead = getByTestId("leads-table-actions_button_0")
    const panel = getByTestId("leads_panel-flyout_panel-wrapper")
    userEvent.click(selectLead)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the lead's information
      expect(within(panel).getAllByText("Mr John Doe").length).toBe(1)
      expect(within(panel).getAllByText("Created: 01/01/21 00:00").length).toBe(1)
      expect(within(panel).getAllByText("PMI, External").length).toBe(1)
      expect(within(panel).getAllByText("john.doe@example.test").length).toBe(1)
      expect(within(panel).getAllByText("+4407715344054 (Primary)").length).toBe(1)
    })

    // This counts as clicking outside the panel, therefore closing it
    userEvent.click(selectLead)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })

    const selectLead2 = getByTestId("leads-table-actions_button_1")
    // Open the panel again
    userEvent.click(selectLead2)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the lead's information on re opening
      expect(within(panel).getAllByText("Mr Jane Doe").length).toBe(1)
      expect(within(panel).getAllByText("Created: 01/01/21 00:00").length).toBe(1)
      expect(within(panel).getAllByText("PMI, External").length).toBe(1)
      expect(within(panel).getAllByText("jane.doe@example.test").length).toBe(1)
      expect(within(panel).getAllByText("+4407715344054 (Primary)").length).toBe(1)
    })
  })

  test("Editing a lead", async () => {
    const mockSubmit = jest.fn()
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent value={{ onUpdateLeadSubmit: mockSubmit }} />
    )
    const selectLead = getByTestId("leads-table-actions_button_0")
    const panel = getByTestId("leads_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectLead)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    // Edit User form
    userEvent.click(getByText("Edit lead"))
    const editLeadForm = getByTestId("leads-edit_leads")

    await waitFor(() => {
      // Panel should be wide
      expect(panel).toHaveStyleRule("right", "-1rem")

      // Edit user form should be visible
      expect(editLeadForm).toBeInTheDocument()

      expect(within(editLeadForm).getByTestId("first_name-input").value).toBe("John")
      expect(within(editLeadForm).getByTestId("last_name-input").value).toBe("Doe")
      expect(getByText("Mr")).toBeInTheDocument()

      // Lead type field should not be editable
      expect(within(editLeadForm).getByTestId("type-select").disabled).toBeTruthy()

      // Lead source field should not be editable
      expect(within(editLeadForm).getByTestId("lead_source-select").disabled).toBeTruthy()
    })

    // Submission
    const submit = within(editLeadForm).getByText("Save")
    userEvent.click(submit)
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1)
    })
    mockSubmit.mockRestore()
  })

  test("Delete should not be shown if Lead has active journeys", async () => {
    mockAxios.onGet(`${fakeApiUrl}/leads/john-doe`).replyOnce(200, {})
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    const { getByTestId, getByText } = renderWithTheme(<TestComponent />)
    const selectLead = getByTestId("leads-table-actions_button_0")
    const panel = getByTestId("leads_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectLead)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    // Edit User form
    userEvent.click(getByText("Edit lead"))
    await waitFor(() => {
      // Panel should be wide
      expect(panel).toHaveStyleRule("right", "-1rem")
    })

    expect(() => getByTestId("delete_lead-button")).toThrowError()
  })

  test("Searching", async () => {
    const mockTest = jest.fn()
    mockAxios.onGet(`${fakeApiUrl}/lead-config`).replyOnce(200, fakeLeadConfigGetResponse)
    mockAxios.onGet(`${fakeApiUrl}/leads`).reply(res => {
      if (res?.params?.name === "") {
        return [200]
      }
      mockTest(res.params.name)
      return [200, fakeTitlesResponse]
    })

    const { getByTestId } = renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <LeadsProvider value={{}}>
          <LeadAdmin />
        </LeadsProvider>
      </Providers>
    )
    const searchField = getByTestId("search_leads-input")
    fireEvent.change(searchField, { target: { value: "test" } })
    await waitFor(() => {
      expect(mockTest).toHaveBeenCalledWith("test")
    })
  })

  describe("Add Lead button", () => {
    test("As SYS_ADMIN", () => {
      const canAccess = roles => roles.includes("SYS_ADMIN")
      const { getByTestId } = renderWithTheme(<TestComponent canAccess={canAccess} />)
      expect(() => getByTestId("add_lead-button")).toThrowError()
    })

    test("As ORG_ADMIN", () => {
      const canAccess = roles => roles.includes("ORG_ADMIN")
      const user = { ...fakeSelfServiceResponse }
      user.role = { name: "ORG_ADMIN" }
      const { getByTestId } = renderWithTheme(<TestComponent user={user} canAccess={canAccess} />)
      expect(getByTestId("add_lead-button")).toBeInTheDocument()
    })

    test("As SALES_ADVISER", () => {
      const canAccess = roles => roles.includes("SALES_ADVISER")
      const user = { ...fakeSelfServiceResponse }
      user.role = { name: "SALES_ADVISER" }
      const { getByTestId } = renderWithTheme(<TestComponent user={user} canAccess={canAccess} />)
      expect(getByTestId("add_lead-button")).toBeInTheDocument()
    })
  })
})
