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
  fakeAvivaThirdPartyPayerApprovalGetResponse
} from "../../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider
      response={get(fakeAvivaThirdPartyPayerApprovalGetResponse, "data", {})}
      {...props}
    >
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Third Party Payer Account Type", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(
      getByText(
        "As the policy holder is not paying the premiums on the policy, approval is required from the third party payer before you can proceed. By answering yes to the below question you are confirming that you have spoken to the third party payer, with the appropriate authority, who in turn has authorised payments to be debited from the account."
      )
    ).toBeInTheDocument()
    expect(getByText("Approval by third party payer is required")).toBeInTheDocument()
  })
})
