/* eslint-disable react/prop-types */
import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { api } from "@4cplatform/elements/Api/fetchData"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Helpers
import { Providers, fakeApiUrl } from "../../UI/Helpers"

// Component
import ProviderAdd from "."

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("<ProviderAdd />", () => {
  test("All components present", () => {
    // Render
    const { container, getByText, queryAllByText } = renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <ProviderAdd />
      </Providers>
    )

    // Check Breadcrumbs
    expect(getByText("Dashboard")).toBeInTheDocument()
    expect(queryAllByText("Add provider").length).toBe(4)

    // Check field labels
    expect(getByText("Provider key")).toBeInTheDocument()
    expect(getByText("Company name")).toBeInTheDocument()
    expect(getByText("Description")).toBeInTheDocument()
    expect(getByText("Registration number")).toBeInTheDocument()
    expect(getByText("Primary contact email")).toBeInTheDocument()
    expect(getByText("Company website")).toBeInTheDocument()
    expect(getByText("Risk email")).toBeInTheDocument()
    expect(getByText("Underwriting email")).toBeInTheDocument()
    expect(getByText("Onboarding email")).toBeInTheDocument()
    expect(getByText("Agency codes email")).toBeInTheDocument()
    expect(getByText("Upload logo")).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  test("Custom fields expands and displays values", () => {
    // Render
    const { getByTestId, getByText } = renderWithTheme(
      <Providers>
        <ProviderAdd />
      </Providers>
    )

    // Add field to expand and show inputs
    const addCustomFieldButton = getByTestId("additional_contact_details_add_new-button")
    fireEvent.click(addCustomFieldButton)

    // Select type to reveal options
    const selectTypeInput = getByTestId("additional_contact_details.0.type-select")
    fireEvent.click(selectTypeInput)
    expect(getByText("Email address")).toBeInTheDocument()
    expect(getByText("Phone number")).toBeInTheDocument()
  })

  describe("Upload a Logo", () => {
    test("Add a Logo using Modal", async () => {
      const file = new File(["test"], "test.jpg", {
        type: "text/plain"
      })
      const updateValue = { target: { files: [file] } }

      // Render
      const { getByTestId, getByText } = renderWithTheme(
        <Providers>
          <ProviderAdd />
        </Providers>
      )

      // Open Add Logo Modal
      const uploadLogoButton = getByTestId("upload-provider-logo-button")
      userEvent.click(uploadLogoButton)
      await waitFor(() => {
        expect(getByTestId("upload_logo_upload_modal-portal-container")).toBeInTheDocument()
      })

      // Add Logo file
      const logoInputField = getByTestId("upload_logo-file_select-input")
      fireEvent.change(logoInputField, updateValue)

      // Close Modal, should show the user what file name was added
      const confirmModal = getByTestId("upload_logo_confirm-button")
      userEvent.click(confirmModal)

      await waitFor(() => {
        expect(getByText("test.jpg")).toBeInTheDocument()
      })
    })

    test("Add a Logo using Modal", async () => {
      // Mock functions
      const testAddProvider = jest.fn()
      const testAddLogo = jest.fn()

      // Values
      const file = new File(["test"], "test.jpg", {
        type: "text/plain"
      })
      const updateValue = { target: { files: [file] } }

      const values = {
        "provider_key-select": "test",
        "name-input": "Provider Company",
        "registration_number-input": "999000",
        "website-input": "website.com",
        "primary_contact_email-input": "email1@email.com",
        "risk_email-input": "email2@email.com",
        "underwriting_email-input": "email3@email.com",
        "onboarding_email-input": "email4@email.com",
        "agency_codes_email-input": "email5@email.com"
      }

      // Mock endpoints
      mockAxios.onGet(`${fakeApiUrl}/available-providers`).replyOnce(200, { data: ["test"] })
      mockAxios.onPost(`${fakeApiUrl}/providers`).replyOnce(({ data }) => {
        testAddProvider(data)
        return [200]
      })
      mockAxios.onPost(`${fakeApiUrl}/providers/provider-company/logo`).replyOnce(() => {
        testAddLogo()
        return [200]
      })

      // Render
      const { getByTestId, getByText } = renderWithTheme(
        <Providers mockAxios={mockAxios}>
          <ProviderAdd />
        </Providers>
      )

      // Open Add Logo Modal
      const uploadLogoButton = getByTestId("upload-provider-logo-button")
      userEvent.click(uploadLogoButton)
      await waitFor(() => {
        expect(getByTestId("upload_logo_upload_modal-portal-container")).toBeInTheDocument()
      })

      // Add Logo file
      const logoInputField = getByTestId("upload_logo-file_select-input")
      fireEvent.change(logoInputField, updateValue)

      // Close Modal, should show the user what file name was added
      const confirmModal = getByTestId("upload_logo_confirm-button")
      userEvent.click(confirmModal)
      await waitFor(() => {
        expect(getByText("test.jpg")).toBeInTheDocument()
      })

      // Fill out form
      Object.entries(values).forEach(async ([key, value]) => {
        fireEvent.change(getByTestId(key), { target: { value } })
        await waitFor(() => expect(getByTestId(key).value).toBe(value))
      })

      // Submit form
      const submitButton = getByTestId("add_provider-button")
      userEvent.click(submitButton)
      await waitFor(() => {
        // Form should be submitted with correct values
        expect(testAddProvider).toHaveBeenCalledWith(
          JSON.stringify({
            provider_key: "test",
            name: "Provider Company",
            description: "",
            registration_number: "999000",
            website: "https://website.com",
            primary_contact_email: "email1@email.com",
            risk_email: "email2@email.com",
            underwriting_email: "email3@email.com",
            onboarding_email: "email4@email.com",
            agency_codes_email: "email5@email.com",
            additional_contact_details: []
          })
        )
      })
      await waitFor(() => {
        // Logo should be uploaded after form submission
        expect(testAddLogo).toHaveBeenCalled()
      })
    })
  })
})
