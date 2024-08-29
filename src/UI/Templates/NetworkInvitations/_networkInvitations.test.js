/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import NetworkInvitations from "."
import NetworkInvitationsStoryProvider from "./story/networkInvitations.story.provider"

// Helpers
import { Providers } from "../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <NetworkInvitationsStoryProvider value={value}>
      <Container style={{ position: "static" }}>
        <NetworkInvitations {...props} />
      </Container>
    </NetworkInvitationsStoryProvider>
  </Providers>
)

describe("<NetworkInvitations />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container, getByText } = renderWithTheme(<TestComponent />)
    const search = getByTestId("search_network_invitations-input")
    const actions = getByTestId("network_invitations-actions-wrapper")
    const addInvite = getByTestId("invite_organisation-button")
    const cancelInvite = getByTestId("cancel_invitation_organisation-1-button")

    // Assert
    expect(search).toBeInTheDocument()
    expect(actions).toBeInTheDocument()
    expect(addInvite).toBeInTheDocument()
    expect(cancelInvite).toBeInTheDocument()

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "flex-end")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "1rem")

    expect(getByText("organisation1@gmail.com")).toBeInTheDocument()
    expect(getByText("Test Organisation 1")).toBeInTheDocument()

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Delete invitation", async () => {
    // Render
    const mockOnDeleteInvitation = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent value={{ onDeleteInvitation: mockOnDeleteInvitation }} />
    )

    const cancelInvite = getByTestId("cancel_invitation_organisation-1-button")

    userEvent.click(cancelInvite)
    await waitFor(() => {
      // Modal should be open
      expect(getByText("Are you sure?")).toBeInTheDocument()
      expect(getByText("Are you sure you want to cancel this invitation?")).toBeInTheDocument()
    })

    userEvent.click(getByText("Cancel invitation"))
    await waitFor(() => {
      expect(mockOnDeleteInvitation).toHaveBeenCalledTimes(1)
    })
  })
  test("Create invitation modal", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)
    const addInvite = getByTestId("invite_organisation-button")

    userEvent.click(addInvite)
    await waitFor(() => {
      // Modal should be open
      expect(getByTestId("organisation_id-select")).toBeInTheDocument()
      expect(getByTestId("email_address-input")).toBeInTheDocument()
    })
  })
  test("Create invitation", async () => {
    const test = jest.fn()
    const { getByTestId } = renderWithTheme(
      <TestComponent value={{ onInviteOrganisation: test }} />
    )
    const addInvite = getByTestId("invite_organisation-button")

    userEvent.click(addInvite)
    await waitFor(() => {
      expect(getByTestId("organisation_id-select")).toBeInTheDocument()
    })

    fireEvent.change(getByTestId("organisation_id-select"), { target: { value: "999" } })
    await waitFor(() => {
      expect(() => getByTestId("email_address-input")).toThrowError()
    })

    userEvent.click(getByTestId("send_invitation-button"))
    await waitFor(() => {
      expect(test).toHaveBeenCalled()
    })
  })
})
