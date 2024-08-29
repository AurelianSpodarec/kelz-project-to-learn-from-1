/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, within, fireEvent } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"
import { createMemoryHistory } from "history"

// Components
import PoliciesAdmin, { PoliciesPanel } from "."
import StoryPoliciesProvider from "./story/policies.story.provider"

// Helpers
import { Providers, renderWithMockedRouter } from "../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <StoryPoliciesProvider value={value}>
      <Container style={{ position: "static" }}>
        <PoliciesAdmin {...props} />
      </Container>
      <PoliciesPanel {...props} />
    </StoryPoliciesProvider>
  </Providers>
)

describe("<PolicyAdmin />", () => {
  test("Basic component & styles", () => {
    // Render
    const { container, getByTestId, getByText } = renderWithTheme(
      <TestComponent value={{ hasActions: true }} />
    )
    const search = getByTestId("search_policies-input")
    const selectPolicy = getByTestId("policies-table-actions_button_0")
    const actions = getByTestId("policies-actions-wrapper")

    // Assert
    expect(search).toBeInTheDocument()
    expect(selectPolicy).toBeInTheDocument()
    expect(actions).toBeInTheDocument()

    expect(getByText("John Apple Doe")).toHaveStyleRule("color", colours.blue)

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "space-between")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "1rem")
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Selecting and deselecting a policy", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent value={{ hasActions: true }} />)
    const selectPolicy = getByTestId("policies-table-actions_button_0")
    const panel = getByTestId("policies_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectPolicy)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the policy information
      expect(within(panel).getAllByText("John Apple Doe").length).toBe(1)
    })

    userEvent.click(selectPolicy)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
  test("Open manage exclusions modal", async () => {
    const { getByTestId } = renderWithTheme(
      <TestComponent value={{ hasActions: true, status: "AWAITING_TERMS" }} />
    )
    const selectPolicy = getByTestId("policies-table-actions_button_0")
    userEvent.click(selectPolicy)

    await waitFor(() => {
      const manageButton = getByTestId("edit_policy_exclusions-button")
      userEvent.click(manageButton)
      const modal = getByTestId("modal-modal-wrapper")
      expect(within(modal).getByText("Policy exclusions")).toBeInTheDocument()
    })
  })

  test("Open and submit Decline Underwriting modal", async () => {
    const mockOnSubmit = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent
        value={{
          hasActions: true,
          status: "AWAITING_TERMS",
          onDeclineUnderwriting: mockOnSubmit,
          declineUnderwritingModal: true
        }}
      />
    )
    const selectPolicy = getByTestId("policies-table-actions_button_0")
    userEvent.click(selectPolicy)

    await waitFor(() => {
      const declineButton = getByTestId("decline_underwriting-button")
      userEvent.click(declineButton)
      const confirmationModal = getByTestId("confirmation_modal-modal-header")
      expect(within(confirmationModal).getByText("Are you sure?")).toBeInTheDocument()
    })

    const declineTextArea = getByTestId("underwriting_declined_reason-textarea")
    fireEvent.change(declineTextArea, {
      target: { value: "test decline underwriting reason description" }
    })
    userEvent.click(getByText("Yes, decline"))
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })
  })
  test("Simulated policies checkbox", async () => {
    const history = createMemoryHistory()
    history.push("/policies")
    const { getByTestId } = renderWithMockedRouter(() => <TestComponent />, { history })
    expect(getByTestId("showSimulated-checkbox-checkbox")).toBeInTheDocument()
    expect(history.location.pathname).toContain("/policies")
    const checkbox = getByTestId("showSimulated-checkbox-checkbox")
    userEvent.click(checkbox)
    await waitFor(() => {
      expect(history.location.search).toContain("?simulated=true")
    })
    userEvent.click(checkbox)
    await waitFor(() => {
      expect(history.location.search).toContain("?simulated=false")
    })
  })
  test("Selecting People tab on the flyout body", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent value={{ hasActions: true }} />)
    const selectPolicy = getByTestId("policies-table-actions_button_0")
    const panel = getByTestId("policies_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectPolicy)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")

      const peopleTab = getByTestId("tab-people")
      userEvent.click(peopleTab)
      // Panel should be populated with the policy information
      expect(within(panel).getByTestId("people-tab-wrapper")).toBeInTheDocument()
      expect(within(panel).getByTestId("people-tab-applicant-name")).toBeInTheDocument()
    })

    userEvent.click(selectPolicy)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
})

const TestComponent2 = ({ canAccess, setMessagingModal }) => (
  <Providers canAccess={canAccess}>
    <StoryPoliciesProvider value={{ setMessagingModal }}>
      <Container style={{ position: "static" }}>
        <PoliciesAdmin />
      </Container>
      <PoliciesPanel />
    </StoryPoliciesProvider>
  </Providers>
)

describe("<PolicyAdmin /> Logged in as SALES_ADVISER", () => {
  test("Messaging button should be available", async () => {
    const canAccess = roles => roles.includes("SALES_ADVISER")
    const setMessagingModal = jest.fn()
    const { getByTestId } = renderWithTheme(
      <TestComponent2 canAccess={canAccess} setMessagingModal={setMessagingModal} />
    )
    const selectPolicy = getByTestId("policies-table-actions_button_0")
    const panel = getByTestId("policies_panel-flyout_panel-wrapper")
    // Panel open state
    userEvent.click(selectPolicy)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")

      const messagesButton = getByTestId("messaging_modal-button")
      userEvent.click(messagesButton)
      expect(setMessagingModal).toHaveBeenCalledTimes(1)
    })

    userEvent.click(selectPolicy)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
})

describe("<PolicyAdmin /> Logged in as SYS_ADMIN", () => {
  test("Messaging button should not be available", async () => {
    const canAccess = roles => roles.includes("SYS_ADMIN")
    const setMessagingModal = jest.fn()
    const { getByTestId, queryByText } = renderWithTheme(
      <TestComponent2 canAccess={canAccess} setMessagingModal={setMessagingModal} />
    )
    const selectPolicy = getByTestId("policies-table-actions_button_0")
    const panel = getByTestId("policies_panel-flyout_panel-wrapper")
    // Panel open state
    userEvent.click(selectPolicy)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      expect(queryByText("Messaging")).toBeNull()
    })

    userEvent.click(selectPolicy)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
})
