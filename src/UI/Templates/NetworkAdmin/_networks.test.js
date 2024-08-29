/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, within } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import NetworkAdmin, { NetworksPanel } from "."
import StoryNetworksProvider from "./story/networks.story.provider"

// Helpers
import { fakeSelfServiceResponse, Providers } from "../../Helpers"

const TestComponent = ({ user, canAccess, ...props }) => (
  <Providers user={user} canAccess={canAccess}>
    <StoryNetworksProvider>
      <Container style={{ position: "static" }}>
        <NetworkAdmin {...props} />
      </Container>
      <NetworksPanel {...props} />
    </StoryNetworksProvider>
  </Providers>
)

describe("<NetworkAdmin />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container } = renderWithTheme(<TestComponent />)
    const search = getByTestId("search_networks-input")
    const selectNetwork = getByTestId("networks-table-actions_button_0")
    const actions = getByTestId("networks-actions-wrapper")
    const addNetwork = getByTestId("add_network-button")

    // Assert
    expect(search).toBeInTheDocument()
    expect(selectNetwork).toBeInTheDocument()

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "space-between")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "1rem")

    expect(addNetwork).toHaveStyleRule("height", "5rem")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Selecting and deselecting a network", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)

    const selectNetwork = getByTestId("networks-table-actions_button_0")
    const panel = getByTestId("networks_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectNetwork)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the provider's information
      expect(within(panel).getAllByText("Network One").length).toBe(1)
      expect(within(panel).getAllByText("90").length).toBe(1)
      expect(within(panel).getAllByText("Joe Bloggs").length).toBe(1)
      expect(within(panel).getAllByText("This is a description of the network").length).toBe(1)
    })

    userEvent.click(selectNetwork)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
  test("Selecting a Network as Support admin", async () => {
    const user = JSON.parse(JSON.stringify(fakeSelfServiceResponse))
    user.data.role.name = "SUPPORT_ADMIN"
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent user={user} canAccess={roles => roles.includes(user.data.role.name)} />
    )
    const selectNetwork = getByTestId("networks-table-actions_button_0")
    const panel = getByTestId("networks_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectNetwork)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      expect(() => getByText("Delete network")).toThrowError()
    })
  })
})
