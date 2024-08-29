import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import { api } from "@4cplatform/elements/Api/fetchData"
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Helpers
import { Providers } from "../../Helpers"
import { defaultAddress } from "./bankAddress.helpers"

// Component
import BankAddress from "."

let mockAxios
beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("<BankAddress />", () => {
  test("Fresh state", async () => {
    const { getByTestId, getByText, queryByTestId } = await renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <BankAddress name="jest" />
      </Providers>
    )
    const manual = getByText("Enter manually")
    const postcodeLookup = getByTestId("jest.sortcode-input")
    const search = getByTestId("jest.sortcode-input-trailing_icon")

    // Enter manually, postcode lookup, and address select should be present
    expect(manual).toBeInTheDocument()
    expect(postcodeLookup).toBeInTheDocument()
    expect(search).toBeInTheDocument()
    // Fields should not be present
    expect(queryByTestId("jest.line_one-input")).toBe(null)
    expect(queryByTestId("jest.line_two-input")).toBe(null)
    expect(queryByTestId("jest.city-input")).toBe(null)
    expect(queryByTestId("jest.county-input")).toBe(null)
  })
  test("Filled In state", async () => {
    const formik = {
      values: { jest: { ...defaultAddress, city: "Gloucester" } },
      errors: {},
      touched: {}
    }
    const { getByTestId, queryByText } = await renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <BankAddress name="jest" formik={formik} />
      </Providers>
    )
    const bank = getByTestId("jest.bank-input")
    const branch = getByTestId("jest.branch-input")
    const line1 = getByTestId("jest.line_one-input")
    const line2 = getByTestId("jest.line_two-input")
    const city = getByTestId("jest.city-input")
    const county = getByTestId("jest.county-input")
    const sortcode = getByTestId("jest.sortcode-input")

    // Enter manually should be hidden
    expect(queryByText("Enter manually")).toBe(null)
    // Address fields should be visible
    expect(bank).toBeInTheDocument()
    expect(branch).toBeInTheDocument()
    expect(line1).toBeInTheDocument()
    expect(line2).toBeInTheDocument()
    expect(city).toBeInTheDocument()
    expect(county).toBeInTheDocument()
    expect(sortcode).toBeInTheDocument()
  })
  test("Enter manually button", async () => {
    const formik = {
      values: { jest: defaultAddress },
      errors: {},
      touched: {},
      setFieldValue: jest.fn()
    }
    const { getByTestId, getByText, queryByText } = await renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <BankAddress name="jest" formik={formik} />
      </Providers>
    )
    const manual = getByText("Enter manually")

    fireEvent.click(manual)
    await waitFor(() => {
      expect(queryByText("Enter manually")).toBe(null)
      expect(formik.setFieldValue).toHaveBeenCalledTimes(1)
      expect(formik.setFieldValue).toHaveBeenCalledWith("jest", defaultAddress)
    })

    // Component should be in a Filled In state
    const bank = getByTestId("jest.bank-input")
    const branch = getByTestId("jest.branch-input")
    const line1 = getByTestId("jest.line_one-input")
    const line2 = getByTestId("jest.line_two-input")
    const city = getByTestId("jest.city-input")
    const county = getByTestId("jest.county-input")
    const sortcode = getByTestId("jest.sortcode-input")

    expect(queryByText("Enter manually")).toBe(null)
    expect(bank).toBeInTheDocument()
    expect(branch).toBeInTheDocument()
    expect(line1).toBeInTheDocument()
    expect(line2).toBeInTheDocument()
    expect(city).toBeInTheDocument()
    expect(county).toBeInTheDocument()
    expect(sortcode).toBeInTheDocument()
  })
  test("Light appearance", () => {
    const formik = {
      values: { jest: { ...defaultAddress, city: "Gloucester" } },
      errors: {},
      touched: {}
    }
    const { getByTestId } = renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <BankAddress name="jest" formik={formik} appearance="light" />
      </Providers>
    )
    const bank = getByTestId("jest.bank-input-label")
    const branch = getByTestId("jest.branch-input-label")
    const line1 = getByTestId("jest.line_one-input-label")
    const line2 = getByTestId("jest.line_two-input-label")
    const city = getByTestId("jest.city-input-label")
    const county = getByTestId("jest.county-input-label")
    const sortcode = getByTestId("jest.sortcode-input-label")

    expect(bank).toHaveStyleRule("color", colours.white)
    expect(branch).toHaveStyleRule("color", colours.white)
    expect(line1).toHaveStyleRule("color", colours.white)
    expect(line2).toHaveStyleRule("color", colours.white)
    expect(city).toHaveStyleRule("color", colours.white)
    expect(county).toHaveStyleRule("color", colours.white)
    expect(sortcode).toHaveStyleRule("color", colours.white)
  })
  test("Cancel button", async () => {
    const formik = {
      values: { jest: { ...defaultAddress, city: "Gloucester" } },
      errors: {},
      touched: {},
      setFieldValue: jest.fn()
    }
    const { getByTestId } = renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <BankAddress name="jest" formik={formik} />
      </Providers>
    )
    const cancel = getByTestId("jest.sortcode-input-trailing_icon")
    await waitFor(() => {
      fireEvent.click(cancel)
    })
    expect(formik.setFieldValue).toHaveBeenCalled()
    expect(formik.setFieldValue).toHaveBeenCalledWith("jest", defaultAddress)
  })
})
