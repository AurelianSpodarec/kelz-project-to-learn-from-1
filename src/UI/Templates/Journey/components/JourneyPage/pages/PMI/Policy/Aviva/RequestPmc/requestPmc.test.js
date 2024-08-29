import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../../journey"
import StoryJourneyProvider from "../../../../../../../story/journey.story.provider"

// Helpers
import { Providers, fakeAvivaRequestPmcGetResponse } from "../../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider response={get(fakeAvivaRequestPmcGetResponse, "data", {})} {...props}>
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Insurer Request Certificate Of Insurance", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByText("Most recent certificate")).toBeInTheDocument()
    expect(getByText("Letter headed paper")).toBeInTheDocument()
    expect(
      getByText(
        "Requested copy of Previous Medical Certificate (PMC) from client. PMC must meet the following criteria:"
      )
    ).toBeInTheDocument()
    expect(
      getByText(
        "It is possible to continue with the sales journey without confirmation if the user has not confirmed that the client’s PMC has been received and meets the required criteria. However, this will be required later before being able to submit the application."
      )
    ).toBeInTheDocument()
    expect(
      getByText(
        "The completed application form pages should now be scanned and the resulting images zipped into an archive for upload."
      )
    ).toBeInTheDocument()
  })
})
