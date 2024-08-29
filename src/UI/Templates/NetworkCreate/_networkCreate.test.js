import React from "react"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import userEvent from "@testing-library/user-event"

// Helpers
import { Providers } from "../../Helpers"

// Component
import NetworkCreate from "."

describe("<NetworkCreate />", () => {
  test("All fields present and styled correctly", () => {
    const { getByTestId } = renderWithTheme(
      <Providers>
        <NetworkCreate />
      </Providers>
    )
    const name = getByTestId("name-input")
    const description = getByTestId("description-textarea")
    const postcode = getByTestId("address.postcode-input")
    const phone = getByTestId("phone_number-input")
    const registration = getByTestId("company_registration_number-input")
    const fca = getByTestId("fca_reference-input")
    const contactFirstName = getByTestId("contact_first_name-input")
    const contactLastName = getByTestId("contact_last_name-input")
    const contactEmail = getByTestId("contact_email_address-input")

    expect(name).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(postcode).toBeInTheDocument()
    expect(phone).toBeInTheDocument()
    expect(registration).toBeInTheDocument()
    expect(fca).toBeInTheDocument()
    expect(contactFirstName).toBeInTheDocument()
    expect(contactLastName).toBeInTheDocument()
    expect(contactEmail).toBeInTheDocument()
  })
  describe("Form validation", () => {
    test("Basic validation", async () => {
      const mockOnSubmit = jest.fn()
      const { getByTestId } = renderWithTheme(
        <Providers>
          <NetworkCreate onSubmit={mockOnSubmit} />
        </Providers>
      )
      const button = getByTestId("create_network-button")

      // Form validation prevents onSubmit from firing until values are in
      userEvent.click(button)
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(0)
      })
    })
    test("Company Registration correct values ", async () => {
      const { getByTestId, getByText } = renderWithTheme(
        <Providers>
          <NetworkCreate onSubmit={() => {}} />
        </Providers>
      )
      const submitButton = getByTestId("create_network-button")

      userEvent.click(submitButton)
      await waitFor(() => {
        expect(getByText("Company Registration Number MISSING_REQUIRED_FIELD")).toBeInTheDocument()
      })

      const companyRegistrationField = getByTestId("company_registration_number-input")
      fireEvent.change(companyRegistrationField, { target: { value: "999##0" } })
      await waitFor(() => {
        expect(
          getByText("Company Registration Number MIX_OF_DIGITS_CHARACTERS_ALLOWED")
        ).toBeInTheDocument()
      })

      fireEvent.change(companyRegistrationField, { target: { value: "999000" } })
      await waitFor(() => {
        expect(() => getByText("Company Registration Number MISSING_REQUIRED_FIELD")).toThrowError()
      })
    })
    test("FCA Reference correct values ", async () => {
      const { getByTestId, getByText } = renderWithTheme(
        <Providers>
          <NetworkCreate onSubmit={() => {}} />
        </Providers>
      )
      const submitButton = getByTestId("create_network-button")

      userEvent.click(submitButton)
      await waitFor(() => {
        expect(getByText("Fca Reference MISSING_REQUIRED_FIELD")).toBeInTheDocument()
      })

      const fcaReferenceField = getByTestId("fca_reference-input")
      fireEvent.change(fcaReferenceField, { target: { value: "999aa0" } })
      await waitFor(() => {
        expect(getByText("Fca Reference ONLY_DIGITS_ALLOWED")).toBeInTheDocument()
      })

      fireEvent.change(fcaReferenceField, { target: { value: "999000" } })
      await waitFor(() => {
        expect(() => getByText("Fca Reference MISSING_REQUIRED_FIELD")).toThrowError()
      })
    })
    test("Phone number correct values ", async () => {
      const { getByTestId, getByText } = renderWithTheme(
        <Providers>
          <NetworkCreate onSubmit={() => {}} />
        </Providers>
      )
      const submitButton = getByTestId("create_network-button")

      userEvent.click(submitButton)
      await waitFor(() => {
        expect(getByText("Phone Number INVALID_PHONE")).toBeInTheDocument()
      })

      const fcaReferenceField = getByTestId("phone_number-input")
      fireEvent.change(fcaReferenceField, { target: { value: "555-5555-555" } })
      await waitFor(() => {
        expect(() => getByText("Phone Number INVALID_PHONE")).toThrowError()
      })
    })
  })
  test("Form submission", async () => {
    const mockOnSubmit = jest.fn()
    const initialValues = {
      name: "Test Network",
      description: "Test Network description",
      address: {
        postcode: "TST ADY",
        line_one: "1 Test Lane",
        line_two: "",
        city: "Tester",
        county: "Testershire"
      },
      phone_number: "07777777777",
      company_registration_number: "42ab00",
      fca_reference: "123456",
      contact_first_name: "Test",
      contact_last_name: "Testington",
      contact_email_address: "test@test.com"
    }
    const { getByTestId } = renderWithTheme(
      <Providers>
        <NetworkCreate onSubmit={mockOnSubmit} initialValues={initialValues} />
      </Providers>
    )
    const button = getByTestId("create_network-button")

    // Submit with the valid, passed body
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(initialValues)
    })
  })
})
