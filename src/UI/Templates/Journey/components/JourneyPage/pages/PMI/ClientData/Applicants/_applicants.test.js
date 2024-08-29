/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import MockAdapter from "axios-mock-adapter"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { api } from "@4cplatform/elements/Api/fetchData"
import userEvent from "@testing-library/user-event"
import { waitFor, within, fireEvent } from "@testing-library/react"

// Helpers
import {
  fakeTitlesResponse,
  fakeOccupationsResponse,
  Providers,
  fakeApiUrl
} from "../../../../../../../../Helpers"

// Components
import Body from "./applicants.body"
import TestJourneyProvider from "../../../../../../story/journey.story.provider"
import ApplicantsProvider from "./context/applicants.provider"

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

const TestComponent = () => (
  <Providers mockAxios={mockAxios}>
    <TestJourneyProvider>
      <ApplicantsProvider>
        <Container style={{ position: "static" }}>
          <Body />
        </Container>
      </ApplicantsProvider>
    </TestJourneyProvider>
  </Providers>
)

jest.mock("moment", () => {
  const moment = jest.requireActual("moment")
  return moment
})

describe("<Applicants />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container, getByText } = renderWithTheme(<TestComponent />)
    const addPart = getByTestId("add_partner-button")
    const addDep = getByTestId("add_dependant-button")

    // Assert
    expect(addPart).toBeInTheDocument()
    expect(addDep).toBeInTheDocument()
    expect(
      getByText(
        "You need to confirm with the client that you have permission to add the additional member(s) and they also have permission to discuss the quote on their behalf."
      )
    ).toBeInTheDocument()
    expect(getByText("Collect details of all persons to be quoted")).toBeInTheDocument()
    expect(getByText("Applicants to be quoted")).toBeInTheDocument()

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Add partner", async () => {
    // Render
    const { getByTestId } = renderWithTheme(<TestComponent />)

    const addPartnerButton = getByTestId("add_partner-button")
    userEvent.click(addPartnerButton)
    await waitFor(() => {
      expect(getByTestId("add-partner-portal-container")).toBeInTheDocument()
      expect(getByTestId("applicant.date_of_birth_datepicker_input")).toBeInTheDocument()
    })

    const dobField = getByTestId("applicant.date_of_birth-input-trailing_icon")
    userEvent.click(dobField)
    await waitFor(() => {
      expect(getByTestId("applicant.date_of_birth-modal-wrapper")).toBeInTheDocument()
      expect(getByTestId("applicant.date_of_birth_datepicker_cancel-button")).toBeInTheDocument()
    })

    const datePickerCancelButton = getByTestId("applicant.date_of_birth_datepicker_cancel-button")
    userEvent.click(datePickerCancelButton)
    await waitFor(() => {
      expect(getByTestId("add-partner-portal-container")).toBeInTheDocument()
      expect(getByTestId("applicant.date_of_birth_datepicker_input")).toBeInTheDocument()
    })
  })

  describe("Validation", () => {
    test("Personal details", async () => {
      // Render
      const { getByTestId } = renderWithTheme(<TestComponent />)

      const addPartnerButton = getByTestId("add_partner-button")
      userEvent.click(addPartnerButton)
      await waitFor(() => {
        expect(getByTestId("add-partner-portal-container")).toBeInTheDocument()
        expect(getByTestId("applicant.date_of_birth_datepicker_input")).toBeInTheDocument()
      })

      const modal = getByTestId("add-partner-portal-container")

      const submitButton = within(modal).getByTestId("submit-button")
      userEvent.click(submitButton)
      await waitFor(() => {
        expect(within(modal).getByTestId("tab-personal_details").children[0]).toHaveStyleRule(
          "color",
          "#197DA4"
        )
        expect(within(modal).getByTestId("tab-questions").children[0]).toHaveStyleRule(
          "color",
          "#FFF"
        )
        expect(within(modal).getByTestId("tab-axa_questions").children[0]).toHaveStyleRule(
          "color",
          "#FFF"
        )
      })
    })

    test("Questions", async () => {
      mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
      mockAxios.onGet(`${fakeApiUrl}/occupations`).replyOnce(200, fakeOccupationsResponse)

      // Render
      const { getByTestId, queryAllByTestId } = renderWithTheme(<TestComponent />)

      const addPartnerButton = getByTestId("add_partner-button")
      userEvent.click(addPartnerButton)
      await waitFor(() => {
        expect(getByTestId("add-partner-portal-container")).toBeInTheDocument()
      })

      Object.entries({
        "applicant.gender_at_birth-select": "male",
        "applicant.title-select": "MR",
        "applicant.first_name-input": "Example",
        "applicant.last_name-input": "Last name",
        "applicant.email_address-input": "email@email.com",
        "applicant.occupation-select": "OTHER"
      }).forEach(([key, value]) => {
        fireEvent.change(getByTestId(key), { target: { value } })
      })

      expect(getByTestId("add-partner-portal-container")).toMatchSnapshot()

      userEvent.click(getByTestId("applicant.date_of_birth_datepicker_input"))
      await waitFor(() => {
        expect(getByTestId("applicant.date_of_birth-modal-wrapper")).toBeInTheDocument()
      })

      userEvent.click(queryAllByTestId("applicant.date_of_birth-datepicker-day_1")[0])
      userEvent.click(getByTestId("applicant.date_of_birth_datepicker_confirm-button"))
      await waitFor(() => {
        expect(() => getByTestId("applicant.date_of_birth-modal-wrapper")).toThrowError()
      })

      // The formik.errors are out of syncing when testing so we need to make sure they are up to date by waiting here
      let timeout = false
      setTimeout(() => (timeout = true), 0)
      await waitFor(() => expect(timeout).toBe(true))

      const submitButton = getByTestId("submit-button")
      userEvent.click(submitButton)
      await waitFor(() => {
        expect(getByTestId("tab-personal_details").children[0]).toHaveStyleRule("color", "#FFF")
        expect(getByTestId("tab-questions").children[0]).toHaveStyleRule("color", "#197DA4")
        expect(getByTestId("tab-axa_questions").children[0]).toHaveStyleRule("color", "#FFF")
      })
    })

    test("AXA Questions", async () => {
      mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
      mockAxios.onGet(`${fakeApiUrl}/occupations`).replyOnce(200, fakeOccupationsResponse)

      // Render
      const { getByTestId, queryAllByTestId } = renderWithTheme(<TestComponent />)

      const addPartnerButton = getByTestId("add_partner-button")
      userEvent.click(addPartnerButton)
      await waitFor(() => {
        expect(getByTestId("add-partner-portal-container")).toBeInTheDocument()
      })

      Object.entries({
        "applicant.gender_at_birth-select": "male",
        "applicant.title-select": "MR",
        "applicant.first_name-input": "Example",
        "applicant.last_name-input": "Last name",
        "applicant.email_address-input": "email@email.com",
        "applicant.occupation-select": "OTHER"
      }).forEach(([key, value]) => {
        fireEvent.change(getByTestId(key), { target: { value } })
      })

      userEvent.click(getByTestId("applicant.date_of_birth_datepicker_input"))
      await waitFor(() => {
        expect(getByTestId("applicant.date_of_birth-modal-wrapper")).toBeInTheDocument()
      })

      userEvent.click(queryAllByTestId("applicant.date_of_birth-datepicker-day_1")[0])
      userEvent.click(getByTestId("applicant.date_of_birth_datepicker_confirm-button"))
      await waitFor(() => {
        expect(() => getByTestId("applicant.date_of_birth-modal-wrapper")).toThrowError()
      })

      const questionsLink = getByTestId("tab-questions").children[0]
      userEvent.click(questionsLink)
      ;[
        "questions.permanent_uk_resident-toggle-option_yes",
        "questions.covered_with_a_gp_and_access_to_medical_records-toggle-option_yes",
        "questions.pmi_required_to_fulfil_reqs_or_visa-toggle-option_yes",
        "questions.tobacco_products_within_last_2_years-toggle-option_yes",
        "questions.permission_to_add_member-toggle-option_yes"
      ].forEach(yesButton => {
        userEvent.click(getByTestId(yesButton))
      })

      // The formik.errors are out of syncing when testing so we need to make sure they are up to date by waiting here
      let timeout = false
      setTimeout(() => (timeout = true), 0)
      await waitFor(() => expect(timeout).toBe(true))

      const submitButton = getByTestId("submit-button")
      userEvent.click(submitButton)

      await waitFor(() => {
        expect(getByTestId("tab-personal_details").children[0]).toHaveStyleRule("color", "#FFF")
        expect(getByTestId("tab-questions").children[0]).toHaveStyleRule("color", "#FFF")
        expect(getByTestId("tab-axa_questions").children[0]).toHaveStyleRule("color", "#197DA4")
      })
    })
  })
})
