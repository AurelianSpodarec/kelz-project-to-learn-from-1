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
  fakeAvivaCompleteApplicationFormGetResponse
} from "../../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider
      response={get(fakeAvivaCompleteApplicationFormGetResponse, "data", {})}
      {...props}
    >
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Complete Aviva Application Form", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByText, getByTestId } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByText("Application form received from client?")).toBeInTheDocument()
    expect(getByText("Form / platform underwriting matches?")).toBeInTheDocument()
    expect(getByText("Form / platform premium matches?")).toBeInTheDocument()
    expect(
      getByText(
        "The completed application form pages should now be scanned and the resulting images zipped into an archive for upload."
      )
    ).toBeInTheDocument()
    expect(getByTestId("delete_selected_hospital-button-trailing_icon")).toBeInTheDocument()
  })
})
