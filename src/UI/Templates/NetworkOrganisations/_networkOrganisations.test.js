/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, within } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import NetworkOrganisations, { NetworkOrganisationsPanel } from "."
import StoryOrganisationsProvider from "./story/networkOrganisations.story.provider"

// Helpers
import { Providers } from "../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <StoryOrganisationsProvider value={value}>
      <Container style={{ position: "static" }}>
        <NetworkOrganisations {...props} />
      </Container>
      <NetworkOrganisationsPanel {...props} />
    </StoryOrganisationsProvider>
  </Providers>
)

describe("<NetworkOrganisations />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container } = renderWithTheme(<TestComponent />)
    const selectOrganisation = getByTestId("network_organisations-table-actions_button_0")
    const search = getByTestId("search_network_organisations-input")
    const actions = getByTestId("network_organisations-actions-wrapper")

    // Assert
    expect(selectOrganisation).toBeInTheDocument()
    expect(search).toBeInTheDocument()
    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "flex-end")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "1rem")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Selecting and deselecting an organisation", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)
    const selectOrganisation = getByTestId("network_organisations-table-actions_button_0")
    const panel = getByTestId("network_organisations_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectOrganisation)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the organisation's information
      expect(within(panel).getAllByText("90").length).toBe(1)
      expect(within(panel).getAllByText("Organisation One").length).toBe(1)
      expect(within(panel).getAllByText("Joe Bloggs").length).toBe(1)
      expect(within(panel).getAllByText("joebloggs@gmail.com").length).toBe(1)
      expect(within(panel).getAllByText("07967876545").length).toBe(1)
      expect(within(panel).getAllByText("The Address").length).toBe(1)
      expect(within(panel).getAllByText("Two Lines").length).toBe(1)
      expect(within(panel).getAllByText("InACity").length).toBe(1)
      expect(within(panel).getAllByText("TheCounty").length).toBe(1)
      expect(within(panel).getAllByText("GL7 5XZ").length).toBe(1)
    })

    // Panel closed state
    userEvent.click(getByTestId("network_organisations_panel-flyout_panel-body_close"))
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
})
