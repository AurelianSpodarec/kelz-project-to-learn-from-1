/* eslint-disable react/prop-types */
import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"
import { api } from "@4cplatform/elements/Api/fetchData"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import userEvent from "@testing-library/user-event"

// Helpers
import { Providers, fakeApiUrl, fakeProductTypesGetResponse } from "../../Helpers"

// Component
import DealCodeCreate from "."

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("<DealCodeCreate />", () => {
  test("All fields present", () => {
    const { getByTestId } = renderWithTheme(
      <Providers>
        <DealCodeCreate />
      </Providers>
    )

    const type = getByTestId("product_type-select")
    const provider = getByTestId("provider_id-select")
    const product = getByTestId("product-select")
    const name = getByTestId("name-input")
    const code = getByTestId("deal_code-input")
    const description = getByTestId("description-textarea")
    const start = getByTestId("start_date_datepicker_input")
    const end = getByTestId("end_date_datepicker_input")
    const styleNew = getByTestId("style_new-checkbox")
    const styleSwitch = getByTestId("style_switch-checkbox")
    const underwritingFmu = getByTestId("underwriting_fmu-checkbox")
    const underwritingMori = getByTestId("underwriting_mori-checkbox")
    const quoting = getByTestId("quoting-checkbox")
    const onboarding = getByTestId("onboarding-checkbox")

    expect(type).toBeInTheDocument()
    expect(provider).toBeInTheDocument()
    expect(product).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(code).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(start).toBeInTheDocument()
    expect(end).toBeInTheDocument()
    expect(styleNew).toBeInTheDocument()
    expect(styleSwitch).toBeInTheDocument()
    expect(underwritingFmu).toBeInTheDocument()
    expect(underwritingMori).toBeInTheDocument()
    expect(quoting).toBeInTheDocument()
    expect(onboarding).toBeInTheDocument()
  })
  test("Form submission", async () => {
    mockAxios.onGet(`${fakeApiUrl}/product-types`).replyOnce(200, fakeProductTypesGetResponse)

    const mockOnSubmit = jest.fn()
    const initialValues = {
      product_type: "PMI",
      provider_id: 1,
      product: "HEALTHIER_SOLUTIONS",
      name: "NCD Uplift for 1 month",
      deal_code: "1 NCD Uplift",
      description: "This is a description of a deal code",
      start_date: "2018-02-10T09:30Z",
      end_date: "2021-02-10T09:30Z",
      style_new: true,
      style_switch: true,
      underwriting_fmu: true,
      underwriting_mori: true,
      quoting: true,
      onboarding: true
    }
    const { getByTestId } = renderWithTheme(
      <Providers>
        <DealCodeCreate onSubmit={mockOnSubmit} initialValues={initialValues} />
      </Providers>
    )
    const button = getByTestId("create_deal_code-button")

    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(initialValues)
    })
  })
})
