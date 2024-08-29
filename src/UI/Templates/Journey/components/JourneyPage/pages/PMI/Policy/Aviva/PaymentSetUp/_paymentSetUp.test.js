import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../../journey"
import StoryJourneyProvider from "../../../../../../../story/journey.story.provider"

// Helpers
import { Providers, fakeAvivaPaymentSetUpGetResponse } from "../../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider response={get(fakeAvivaPaymentSetUpGetResponse, "data", {})} {...props}>
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Payment Set Up", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByText, getByTestId } = renderWithTheme(<TestComponent />)
    // Assert
    expect(
      getByText(
        "Will the policy holder be using their personal account, of the same name, to pay for the policy?"
      )
    ).toBeInTheDocument()
    expect(getByTestId("payment_frequency-helper_text-container")).toBeInTheDocument()
    expect(getByTestId("payment_amount-helper_text-container")).toBeInTheDocument()
  })
})
