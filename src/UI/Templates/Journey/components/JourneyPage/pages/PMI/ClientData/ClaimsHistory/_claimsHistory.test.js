import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Helpers
import { Providers, fakeClaimsHistoryGetResponse } from "../../../../../../../../Helpers"
import { config } from "."

// Components
import Journey from "../../../../../../journey"
import StoryJourneyProvider from "../../../../../../story/journey.story.provider"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider
      response={{ ...get(fakeClaimsHistoryGetResponse, "data", {}), ...config }}
      {...props}
    >
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Claims history details", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByText, getByTestId } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByText("Name")).toBeInTheDocument()
    expect(getByText("Years covered")).toBeInTheDocument()
    expect(getByText("Claims last 5 years")).toBeInTheDocument()
    expect(getByText("Date of last claim")).toBeInTheDocument()
    expect(
      getByTestId("axa_questions.axa_anyone_planned_or_pending-toggle-options")
    ).toBeInTheDocument()
    expect(
      getByTestId(
        "axa_questions.axa_anyone_received_treatment_or_consultation_in_last_12_months-toggle-options"
      )
    ).toBeInTheDocument()
  })
})
