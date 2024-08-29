import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../journey"
import StoryJourneyProvider from "../../../../../../story/journey.story.provider"

// Helpers
import { Providers, fakePatientTerminologyGetResponse } from "../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider response={get(fakePatientTerminologyGetResponse, "data", {})} {...props}>
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Explain patient terminology Information", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByTestId, getByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByText("Explain patient terminology")).toBeInTheDocument()
    expect(
      getByText("Explain the below terminology and confirm the client understands.")
    ).toBeInTheDocument()
    expect(getByText("Out-Patient:")).toBeInTheDocument()
    expect(
      getByText(
        "This is where the patient visits a hospital, clinic or associated facility for diagnosis or treatment however a hospital bed is not required. An example of which would be a blood test or X-Ray."
      )
    ).toBeInTheDocument()
    expect(getByText("Day-Patient:")).toBeInTheDocument()
    expect(
      getByText(
        "This is where the patient visits a hospital, clinic or associated facility for diagnosis or treatment and a hospital bed is required for during the day however is not required for an overnight stay. An example of which would be the client receiving a short course of treatment."
      )
    ).toBeInTheDocument()
    expect(getByText("In-Patient:")).toBeInTheDocument()
    expect(
      getByText(
        "This is where the patient occupies a hospital bed overnight or longer, in order to undergo medical investigations or treatment. An example of which would be the client recovering from surgery."
      )
    ).toBeInTheDocument()
    expect(getByText("Has the client confirmed they understand?")).toBeInTheDocument()
    expect(getByTestId("understood_inpatient_outpatient-toggle-options")).toBeInTheDocument()
  })
})
