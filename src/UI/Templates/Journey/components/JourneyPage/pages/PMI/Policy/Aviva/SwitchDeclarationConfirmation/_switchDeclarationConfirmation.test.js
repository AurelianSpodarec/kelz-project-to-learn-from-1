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
  fakeAvivaSwitchDeclarationConfirmationGetResponse
} from "../../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider
      response={get(fakeAvivaSwitchDeclarationConfirmationGetResponse, "data", {})}
      {...props}
    >
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Aviva Switch Declaration Confirmation", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByText("Authorisation for the release of medical information")).toBeInTheDocument()
    expect(getByText("All persons to be covered permanently live in the UK.")).toBeInTheDocument()
    expect(getByText("Client complies with declarations?")).toBeInTheDocument()
    expect(getByText("Does the client consent?")).toBeInTheDocument()
    expect(
      getByText(
        "Do you/any members to be covered wish to see a copy of your medical report before being sent to the insurer?"
      )
    ).toBeInTheDocument()
  })
})
