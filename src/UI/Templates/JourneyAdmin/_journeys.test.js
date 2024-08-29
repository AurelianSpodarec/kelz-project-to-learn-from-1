/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, within } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Components
import JourneysAdmin from "."
import JourneysPanel from "./journeys.panel"
import StoryJourneysProvider from "./story/journeys.story.provider"

// Helpers
import { Providers } from "../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <StoryJourneysProvider value={value}>
      <Container style={{ position: "static" }}>
        <JourneysAdmin {...props} />
      </Container>
      <JourneysPanel {...props} />
    </StoryJourneysProvider>
  </Providers>
)

describe("<JourneyAdmin />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, getAllByText, container } = renderWithTheme(
      <TestComponent value={{ hasActions: true }} />
    )
    const search = getByTestId("search_journeys-input")
    const selectJourney = getByTestId("journeys-table-actions_button_0")
    const actions = getByTestId("journeys-actions-wrapper")

    // Assert
    expect(search).toBeInTheDocument()
    expect(selectJourney).toBeInTheDocument()
    expect(actions).toBeInTheDocument()

    expect(getAllByText("John Doe")[0]).toHaveStyleRule("color", colours.blue)

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "flex-end")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "1rem")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Selecting and deselecting a journey", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent value={{ hasActions: true }} />)

    const selectJourney = getByTestId("journeys-table-actions_button_0")
    const panel = getByTestId("journeys_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectJourney)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the quote information
      expect(within(panel).getAllByText("John Apple Doe").length).toBe(1)
    })

    userEvent.click(selectJourney)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
})
