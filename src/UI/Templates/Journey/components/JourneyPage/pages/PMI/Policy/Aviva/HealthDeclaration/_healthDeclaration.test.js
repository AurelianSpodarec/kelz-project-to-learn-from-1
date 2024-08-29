import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../../journey"
import StoryJourneyProvider from "../../../../../../../story/journey.story.provider"

// Helpers
import {
  Providers,
  fakeAvivaHealthDeclarationPageGetResponse
} from "../../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider
      response={get(fakeAvivaHealthDeclarationPageGetResponse, "data", {})}
      {...props}
    >
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Health Declaration", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByTestId } = renderWithTheme(<TestComponent />)

    // Assert
    expect(
      getByTestId("client_confirmed_understood_avivas_health_declaration-toggle-label")
    ).toBeInTheDocument()
  })
})
