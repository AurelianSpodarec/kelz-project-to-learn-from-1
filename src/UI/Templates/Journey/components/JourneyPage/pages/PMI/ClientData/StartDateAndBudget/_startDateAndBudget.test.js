import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../journey"
import StoryJourneyProvider from "../../../../../../story/journey.story.provider"

// Helpers
import { Providers, fakeStartDateAndBudgetGetResponse } from "../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider response={get(fakeStartDateAndBudgetGetResponse, "data", {})} {...props}>
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Explain patient terminology Information", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(
      getByText(
        "Ensure the client understands that by selecting a future start date for their insurance policy, the client will need to notify you should there be any change in the client’s health or circumstances during the intervening period as this may affect the advice and recommendation that has been provided."
      )
    ).toBeInTheDocument()
    expect(
      getByText(
        "The start date cannot be back-dated. The start date cannot be future-dated by more than 30 days."
      )
    ).toBeInTheDocument()
  })
})
