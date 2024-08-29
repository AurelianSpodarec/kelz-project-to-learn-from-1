import React from "react"
import "jest-styled-components"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Helpers
import { Providers } from "../../../../Helpers"

// Components
import TestJourneyProvider from "../../story/journey.story.provider"
import FaqModal from "./faqModal"

const TestComponent = () => (
  <Providers>
    <TestJourneyProvider>
      <FaqModal />
    </TestJourneyProvider>
  </Providers>
)

describe("<FaqModal />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container, getByText } = renderWithTheme(<TestComponent />)
    const queryInput = getByTestId("search_frequently_asked_questions-input-wrapper")
    const providerSelect = getByTestId("provider-select-wrapper")

    // Assert
    expect(queryInput).toBeInTheDocument()
    expect(providerSelect).toBeInTheDocument()
    expect(getByText("Provider")).toBeInTheDocument()

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
})
