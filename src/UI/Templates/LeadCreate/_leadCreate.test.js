/* eslint-disable react/prop-types */
import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { waitFor, within, fireEvent } from "@testing-library/react"
import { api } from "@4cplatform/elements/Api/fetchData"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import userEvent from "@testing-library/user-event"

// Helpers
import { Providers, fakeApiUrl, fakeTitlesResponse, renderWithMockedRouter } from "../../Helpers"

// Component
import LeadCreate from "."

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("<LeadCreate />", () => {
  test("All fields present and styled correctly", () => {
    const { getByTestId } = renderWithTheme(
      <Providers>
        <LeadCreate />
      </Providers>
    )
    const type = getByTestId("type-select")
    const source = getByTestId("lead_source-select")
    const gender = getByTestId("gender_at_birth-select")
    const title = getByTestId("title-select")
    const firstName = getByTestId("first_name-input")
    const lastName = getByTestId("last_name-input")
    const email = getByTestId("email_address-input")
    const phoneType = getByTestId("phone_numbers.0.type-select")
    const phoneNumber = getByTestId("phone_numbers.0.number-input-field_wrapper").firstChild
    const dob = getByTestId("date_of_birth_datepicker_input")

    expect(type).toBeInTheDocument()
    expect(source).toBeInTheDocument()
    expect(gender).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(phoneType).toBeInTheDocument()
    expect(phoneNumber).toBeInTheDocument()
    expect(dob).toBeInTheDocument()
  })
  test("Form validation", async () => {
    const mockOnSubmit = jest.fn()
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    const { getByTestId } = renderWithMockedRouter(() => (
      <Providers mockAxios={mockAxios}>
        <LeadCreate onSubmit={mockOnSubmit} />
      </Providers>
    ))

    // Wait for Titles to finish loading
    await waitFor(() => {
      expect(within(getByTestId("title-select")).getByText("Select title")).toBeInTheDocument()
    })

    // Form validation prevents onSubmit from firing until values are in
    const button = getByTestId("create_lead-button")
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(0)
    })
  })
  test("Form submission", async () => {
    const mockOnSubmit = jest.fn()
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    const initialValues = {
      date_of_birth: "1985-11-13",
      email_address: "jbloggs@mail.com",
      first_name: "Joe",
      gender_at_birth: "male",
      last_name: "Bloggs",
      lead_source: "NEW",
      phone_numbers: [{ number: "+447777777777", type: "PRIMARY" }],
      title: "MR",
      type: "PMI"
    }
    const { getByTestId } = renderWithMockedRouter(() => (
      <Providers>
        <LeadCreate onSubmit={mockOnSubmit} initialValues={initialValues} />
      </Providers>
    ))

    // Wait for Titles to finish loading
    await waitFor(() => {
      expect(within(getByTestId("title-select")).getByText("Select title")).toBeInTheDocument()
    })

    // Form validation prevents onSubmit from firing until values are in
    const button = getByTestId("create_lead-button")
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(initialValues)
    })
  })
  test("Titles field", async () => {
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    const { getByTestId } = renderWithMockedRouter(() => (
      <Providers mockAxios={mockAxios}>
        <LeadCreate />
      </Providers>
    ))

    // Wait for Titles to finish loading
    await waitFor(() => {
      expect(within(getByTestId("title-select")).getByText("Select title")).toBeInTheDocument()
    })

    fireEvent.change(getByTestId("gender_at_birth-select"), { target: { value: "male" } })
    await waitFor(() => {
      expect(getByTestId("gender_at_birth-select").value).toBe("male")
    })

    fireEvent.change(getByTestId("title-select"), { target: { value: "MR" } })
    await waitFor(() => {
      expect(getByTestId("title-select").value).toBe("MR")
    })

    fireEvent.change(getByTestId("gender_at_birth-select"), { target: { value: "Female" } })
    await waitFor(() => {
      expect(getByTestId("title-select").value).toBe("")
    })
  })
})
