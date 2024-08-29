import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../journey"
import StoryJourneyProvider from "../../../../../../story/journey.story.provider"

// Helpers
import { Providers, fakeHospitalListConfirmationGetResponse } from "../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider
      response={get(fakeHospitalListConfirmationGetResponse, "data", {})}
      {...props}
    >
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Medical history details", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByText, getByTestId } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByText("Client happy to proceed?")).toBeInTheDocument()
    expect(
      getByTestId("confirm_client_happy_with_selected_hospital_list-toggle-wrapper")
    ).toBeInTheDocument()
  })
})
