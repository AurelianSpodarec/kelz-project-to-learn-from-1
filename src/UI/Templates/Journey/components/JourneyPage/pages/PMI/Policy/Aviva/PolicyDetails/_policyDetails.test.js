import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../../journey"
import StoryJourneyProvider from "../../../../../../../story/journey.story.provider"

// Helpers
import { fakeAvivaPolicyDetailsGetResponse } from "../../../../../../../../../Helpers"
import { Providers } from "../../../../../../../../../Helpers/tests"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider response={get(fakeAvivaPolicyDetailsGetResponse, "data", {})} {...props}>
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Aviva Policy Details", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByText("Policy number")).toBeInTheDocument()
    expect(getByText("Member number (if applicable)")).toBeInTheDocument()
  })
})
