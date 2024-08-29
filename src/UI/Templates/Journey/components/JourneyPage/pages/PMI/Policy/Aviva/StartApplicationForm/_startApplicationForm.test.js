import React from "react"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../../journey"
import StoryJourneyProvider from "../../../../../../../story/journey.story.provider"

// Helpers
import {
  Providers,
  fakeAvivaStartApplicationFormPageGetResponse
} from "../../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider
      response={get(fakeAvivaStartApplicationFormPageGetResponse, "data", {})}
      {...props}
    >
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
    expect(getByText("Processing the application")).toBeInTheDocument()
    expect(
      getByText(
        "There are two methods avaliable to proceed past this point and complete the application."
      )
    ).toBeInTheDocument()
    expect(
      getByText(
        "The easiest way to complete the application form is online. Where applicable, the platform will capture all medical questions and allow you the opportunity to submit this to the provider for terms"
      )
    ).toBeInTheDocument()
    expect(getByTestId("complete_application_online-toggle-outer_wrapper")).toBeInTheDocument()
  })
})
