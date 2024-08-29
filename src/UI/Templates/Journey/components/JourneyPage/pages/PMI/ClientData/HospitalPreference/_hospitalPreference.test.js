/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Helpers
import { Providers } from "../../../../../../../../Helpers"

// Components
import Body from "./hospitalPreference.body"
import TestJourneyProvider from "../../../../../../story/journey.story.provider"
import StoryHospitalPreferenceProvider from "./story/hospitalPreference.story.provider"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <TestJourneyProvider>
      <StoryHospitalPreferenceProvider value={value}>
        <Container style={{ position: "static" }}>
          <Body {...props} />
        </Container>
      </StoryHospitalPreferenceProvider>
    </TestJourneyProvider>
  </Providers>
)

describe("<HospitalPreference />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container, getByText } = renderWithTheme(<TestComponent />)
    const preferredHospital = getByTestId("your_preferred_hospital-helper_text-container")

    // Assert
    expect(preferredHospital).toBeInTheDocument()
    expect(getByText("These are the closest hospitals to OX43NU")).toBeInTheDocument()
    expect(getByText("Distance (miles)")).toBeInTheDocument()
    expect(
      getByText(
        "The three hospitals closest to the client’s residential address need to be read out."
      )
    ).toBeInTheDocument()

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
})
