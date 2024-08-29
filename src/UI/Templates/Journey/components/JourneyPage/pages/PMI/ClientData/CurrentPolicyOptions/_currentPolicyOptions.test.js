import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../journey"
import StoryJourneyProvider from "../../../../../../story/journey.story.provider"

// Helpers
import { Providers, fakeCurrentPolicyOptionsGetResponse } from "../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider
      response={get(fakeCurrentPolicyOptionsGetResponse, "data", {})}
      {...props}
    >
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Policy options details", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByTestId, getAllByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getAllByText("Current policy options").length).toBe(2)
    expect(getByTestId("cp_payment_frequency-toggle-options")).toBeInTheDocument()
    expect(getByTestId("cp_underwriting-select")).toBeInTheDocument()
    expect(getByTestId("cp_excess-select")).toBeInTheDocument()
    expect(getByTestId("cp_excess_type-toggle-options")).toBeInTheDocument()
    expect(getByTestId("cp_in_day_patient_treatment-select")).toBeInTheDocument()
    expect(getByTestId("cp_outpatient-select")).toBeInTheDocument()
    expect(getByTestId("cp_outpatient_diagnostics-select")).toBeInTheDocument()
    expect(getByTestId("cp_therapies-select")).toBeInTheDocument()
  })
})
