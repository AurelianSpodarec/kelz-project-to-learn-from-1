import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../journey"
import StoryJourneyProvider from "../../../../../../story/journey.story.provider"

// Helpers
import { Providers, fakeConsentGetResponse } from "../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider response={get(fakeConsentGetResponse, "data", {})} {...props}>
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Consent to Use Personal Information", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByTestId, getByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByText("Consent to use personal information")).toBeInTheDocument()
    expect(getByText("This is an example of some consent text")).toBeInTheDocument()
    expect(getByText("Please read out the consent text below to the client.")).toBeInTheDocument()
    expect(
      getByText(
        "Confirm that you have client consent and/or confirm that you have complied with your network regulations."
      )
    ).toBeInTheDocument()
    expect(getByTestId("consent_to_personal_information-toggle-outer_wrapper")).toBeInTheDocument()
  })
})
