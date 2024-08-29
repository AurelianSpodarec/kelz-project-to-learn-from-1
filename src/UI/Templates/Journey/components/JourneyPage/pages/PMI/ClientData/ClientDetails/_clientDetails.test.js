import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "../../../../../../journey"
import StoryJourneyProvider from "../../../../../../story/journey.story.provider"

// Helpers
import { Providers, fakeClientDetailsGetResponse } from "../../../../../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider response={get(fakeClientDetailsGetResponse, "data", {})} {...props}>
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("Client Details", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { getByTestId, getByText } = renderWithTheme(<TestComponent />)

    // Assert
    expect(getByTestId("client.email_address-input")).toBeInTheDocument()
    expect(getByTestId("client.first_name-input")).toBeInTheDocument()
    expect(getByTestId("client.middle_names-input")).toBeInTheDocument()
    expect(getByTestId("client.last_name-input")).toBeInTheDocument()
    expect(getByTestId("client.date_of_birth_datepicker_input")).toBeInTheDocument()
    expect(getByTestId("client.title-select")).toBeInTheDocument()
    expect(getByTestId("client.gender_at_birth-select")).toBeInTheDocument()
    expect(getByTestId("client.occupation-select")).toBeInTheDocument()
    expect(getByTestId("phone_numbers-phone_numbers-wrapper")).toBeInTheDocument()
    expect(getByTestId("address.postcode-input")).toBeInTheDocument()
    expect(getByTestId("questions.permanent_uk_resident-toggle-wrapper")).toBeInTheDocument()
    expect(
      getByTestId("questions.covered_with_a_gp_and_access_to_medical_records-toggle-wrapper")
    ).toBeInTheDocument()
    expect(
      getByTestId("questions.pmi_required_to_fulfil_reqs_or_visa-toggle-wrapper")
    ).toBeInTheDocument()
    expect(
      getByTestId("questions.tobacco_products_within_last_2_years-toggle-wrapper")
    ).toBeInTheDocument()
    expect(
      getByTestId("questions.payment_for_participating_in_sport-toggle-wrapper")
    ).toBeInTheDocument()
    expect(
      getByText("In the last five years have you had or received treatment for:")
    ).toBeInTheDocument()
    expect(
      getByTestId("axa_questions.last_5_years_heart_condition_or_heart_problem-toggle-wrapper")
    ).toBeInTheDocument()
    expect(getByTestId("axa_questions.last_5_years_stroke-toggle-wrapper")).toBeInTheDocument()
    expect(getByTestId("axa_questions.last_5_years_cancer-toggle-wrapper")).toBeInTheDocument()
    expect(getByTestId("axa_questions.last_5_years_diabetes-toggle-wrapper")).toBeInTheDocument()
    expect(
      getByTestId("axa_questions.last_5_years_mental_illness-toggle-wrapper")
    ).toBeInTheDocument()
  })
})
