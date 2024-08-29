import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Helpers
import {
  Providers,
  fakeAvivaUnderwritingSummaryGetResponse
} from "../../../../../../../../../Helpers"
import { config } from "."

// Components
import Journey from "../../../../../../../journey"
import StoryJourneyProvider from "../../../../../../../story/journey.story.provider"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider
      response={{ ...get(fakeAvivaUnderwritingSummaryGetResponse, "data", {}), ...config }}
      {...props}
    >
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Underwriting Summary", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByText("Please read the summary below to the client.")).toBeInTheDocument()
    expect(
      getByText("The contract for this insurance policy is for a 12 month period.")
    ).toBeInTheDocument()
  })
})
