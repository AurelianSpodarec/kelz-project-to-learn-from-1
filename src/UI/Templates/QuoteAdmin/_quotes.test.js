/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, within } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Components
import QuotesAdmin from "."
import QuotesPanel from "./quotes.panel"
import StoryQuotesProvider from "./story/quotes.story.provider"

// Helpers
import { Providers } from "../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <StoryQuotesProvider value={value}>
      <Container style={{ position: "static" }}>
        <QuotesAdmin {...props} />
      </Container>
      <QuotesPanel {...props} />
    </StoryQuotesProvider>
  </Providers>
)

describe("<QuoteAdmin />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container, getAllByText } = renderWithTheme(
      <TestComponent value={{ hasActions: true }} />
    )
    const search = getByTestId("search_quotes-input")
    const selectQuote = getByTestId("quotes-table-actions_button_0")
    const actions = getByTestId("quotes-actions-wrapper")

    // Assert
    expect(search).toBeInTheDocument()
    expect(selectQuote).toBeInTheDocument()
    expect(actions).toBeInTheDocument()

    expect(getAllByText("John Doe")[0]).toHaveStyleRule("color", colours.blue)

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "space-between")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "1rem")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Selecting and deselecting a quote", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent value={{ hasActions: true }} />)

    const selectQuote = getByTestId("quotes-table-actions_button_0")
    const panel = getByTestId("quotes_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectQuote)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the quote information
      expect(within(panel).getAllByText("John Apple Doe").length).toBe(1)
    })

    userEvent.click(selectQuote)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
})
