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
  fakeAvivaThirdPartyPayerDetailsGetResponse
} from "../../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider
      response={get(fakeAvivaThirdPartyPayerDetailsGetResponse, "data", {})}
      {...props}
    >
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Payment Set Up", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByText("First name")).toBeInTheDocument()
    expect(getByText("Last name")).toBeInTheDocument()
    expect(getByText("Middle name(s)")).toBeInTheDocument()
    expect(getByText("Date of birth")).toBeInTheDocument()
    expect(getByText("Title")).toBeInTheDocument()
    expect(getByText("Gender at birth")).toBeInTheDocument()
    expect(getByText("Phone number")).toBeInTheDocument()
    expect(getByText("Email address")).toBeInTheDocument()
    expect(getByText("Account holder address")).toBeInTheDocument()
  })
})
