/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Journey from "./journey"
import StoryJourneyProvider from "./story/journey.story.provider"

// Helpers
import { testData1 } from "./story/journey.story.helpers"
import { Providers } from "../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <StoryJourneyProvider value={value} {...props}>
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

describe("<Journey />", () => {
  test("Journey renders basic components and page based on testData", () => {
    // Render
    const { container, getByTestId, getByText } = renderWithTheme(<TestComponent />)

    // Page elements rendered by testData
    expect(getByTestId("consent_to_personal_information-toggle-wrapper")).toBeInTheDocument()
    expect(
      getByText(
        "Confirm that you have client consent and/or confirm that you have complied with your network regulations."
      )
    ).toBeInTheDocument()

    // Default page elements
    expect(getByTestId("journey_page-title")).toBeInTheDocument()
    expect(getByTestId("journey_page-subtitle")).toBeInTheDocument()
    expect(getByTestId("journey_previous-button")).toBeInTheDocument()
    expect(getByTestId("journey_save-button")).toBeInTheDocument()

    // Journey nav
    expect(getByText("Client data")).toBeInTheDocument()
    expect(getByTestId("consent_to_personal_info-navigation_link")).toBeInTheDocument()

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Page transition and modals", async () => {
    // Render
    const { getByTestId, getByText, getAllByText } = renderWithTheme(
      <TestComponent value={{ data: testData1 }} />
    )
    const save = getByTestId("journey_save-button")

    userEvent.click(save)
    await waitFor(() => {
      expect(getByTestId("email_address-input")).toBeInTheDocument()
      expect(getByTestId("address.postcode-input")).toBeInTheDocument()
      expect(getByTestId("permanent_uk_resident-toggle-wrapper")).toBeInTheDocument()
      expect(
        getByTestId("axa_questions_had_or_received_treatment_for_heart_condition-toggle-wrapper")
      ).toBeInTheDocument()
    })

    userEvent.click(getByTestId("permanent_uk_resident-toggle-option_yes"))

    await waitFor(() => {
      expect(getAllByText("Value triggered Modal").length).toBe(4)
      expect(
        getAllByText(
          "The modal has custom content, and it only triggers if the field's formik value matches the modal trigger."
        ).length
      ).toBe(4)
    })

    // userEvent.click(getByTestId("permanent_uk_resident-modal-close"))
    // await waitFor(() => {
    //   expect(queryByText("Value triggered Modal")).toBe(null)
    // })

    userEvent.click(
      getByTestId("axa_questions_had_or_received_treatment_for_heart_condition-toggle-option_no")
    )

    userEvent.click(getByTestId("journey_save-button"))
    await waitFor(() => {
      expect(getByText("Triggered via field value but only on submit")).toBeInTheDocument()
    })
  })
})
