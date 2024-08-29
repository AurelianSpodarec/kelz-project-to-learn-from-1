/* eslint-disable react/prop-types */
import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import { api } from "@4cplatform/elements/Api/fetchData"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import userEvent from "@testing-library/user-event"

// Helpers
import {
  Providers,
  fakeApiUrl,
  fakeAvailableProvidersGetResponse,
  renderWithMockedRouter
} from "../../Helpers"

// Component
import ProviderCreate from "."

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("<ProviderCreate />", () => {
  test("All fields present and styled correctly", () => {
    const { container, getByTestId } = renderWithTheme(
      <Providers>
        <ProviderCreate />
      </Providers>
    )
    expect(getByTestId("provider_key-select")).toBeInTheDocument()
    expect(getByTestId("name-input")).toBeInTheDocument()
    expect(getByTestId("description-textarea")).toBeInTheDocument()
    expect(getByTestId("registration_number-input")).toBeInTheDocument()
    expect(getByTestId("primary_contact_email-input")).toBeInTheDocument()
    expect(getByTestId("website-input")).toBeInTheDocument()
    expect(getByTestId("risk_email-input")).toBeInTheDocument()
    expect(getByTestId("underwriting_email-input")).toBeInTheDocument()
    expect(getByTestId("onboarding_email-input")).toBeInTheDocument()
    expect(getByTestId("agency_codes_email-input")).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
  test("Form validation", async () => {
    const mockOnSubmit = jest.fn()
    mockAxios
      .onGet(`${fakeApiUrl}/available-providers`)
      .replyOnce(200, fakeAvailableProvidersGetResponse)
    const { getByTestId, getByText } = renderWithMockedRouter(() => (
      <Providers mockAxios={mockAxios}>
        <ProviderCreate onSubmit={mockOnSubmit} />
      </Providers>
    ))

    // Wait for /available-providers to finish loading
    await waitFor(() => {
      expect(getByText("Select provider")).toBeInTheDocument()
    })

    // Add another custom field
    const addCustomFieldButton = getByTestId("additional_contact_details_add_new-button")
    userEvent.click(addCustomFieldButton)

    await waitFor(() => {
      expect(getByTestId("additional_contact_details.0.type-select")).toBeInTheDocument()
    })

    fireEvent.change(getByTestId("additional_contact_details.0.type-select"), {
      target: { value: "email" }
    })

    const submitButton = getByTestId("add_provider-button")
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(0)
    })
  })
  test("Form submission", async () => {
    const mockOnSubmit = jest.fn()
    mockAxios
      .onGet(`${fakeApiUrl}/available-providers`)
      .replyOnce(200, fakeAvailableProvidersGetResponse)
    const mockValues = {
      name: "Aviva",
      provider_key: "AVIVA",
      registration_number: "000000",
      website: "https://www.examplewebsite.com",
      primary_contact_email: "primary.contact@aviva.com",
      risk_email: "risk@aviva.com",
      underwriting_email: "underwriting@aviva.com",
      onboarding_email: "onboarding@aviva.com",
      agency_codes_email: "agency.codes@aviva.com",
      description: "",
      additional_contact_details: []
    }
    const { getByTestId, getByText } = renderWithMockedRouter(() => (
      <Providers mockAxios={mockAxios}>
        <ProviderCreate onSubmit={mockOnSubmit} initialValues={mockValues} />
      </Providers>
    ))

    // Wait for /available-providers to finish loading
    await waitFor(() => {
      expect(getByText("Select provider")).toBeInTheDocument()
    })

    const submitButton = getByTestId("add_provider-button")
    // Submit with valid data
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(mockValues, null)
    })
  })
})
