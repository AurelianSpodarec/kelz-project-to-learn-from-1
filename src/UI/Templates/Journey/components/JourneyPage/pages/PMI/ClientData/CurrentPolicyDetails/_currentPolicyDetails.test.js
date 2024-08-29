import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import userEvent from "@testing-library/user-event"
import { waitFor } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../journey"
import StoryJourneyProvider from "../../../../../../story/journey.story.provider"

// Helpers
import { Providers, fakeCurrentPolicyDetailsGetResponse } from "../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider
      response={get(fakeCurrentPolicyDetailsGetResponse, "data", {})}
      {...props}
    >
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Policy details", () => {
  test("Basic components and page rendered from config", async () => {
    // Render
    const { getByTestId, getByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByText("Client has a current policy")).toBeInTheDocument()
    expect(getByTestId("cp_current_policy-toggle-outer_wrapper")).toBeInTheDocument()

    const toggleOptionYes = getByTestId("cp_current_policy-toggle-option_yes")

    userEvent.click(toggleOptionYes)
    await waitFor(() => {
      expect(getByText("Current policy details")).toBeInTheDocument()
      expect(getByTestId("cp_company_or_group_policy-toggle-outer_wrapper")).toBeInTheDocument()
      expect(getByTestId("cp_current_insurer-select-wrapper")).toBeInTheDocument()
      expect(getByTestId("cp_current_product_name-select")).toBeInTheDocument()
      expect(getByTestId("cp_renewal_date-input-field_wrapper")).toBeInTheDocument()
      expect(getByTestId("cp_underwritten_in_uk-toggle-options")).toBeInTheDocument()
      expect(getByTestId("cp_monthly_cost-input-field_wrapper")).toBeInTheDocument()
    })
  })
})
