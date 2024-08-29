import React from "react"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Helpers
import { fakeSelfServiceResponse, Providers } from "../../../../Helpers"

// Components
import CommissionRates from "."

const TestCommissionRatesComponent = props => (
  <Providers
    canAccess={roles => roles.includes("SYS_ADMIN")}
    user={{ data: { ...fakeSelfServiceResponse.data, role: "SYS_ADMIN" } }}
  >
    <CommissionRates {...props} />
  </Providers>
)

describe("<CommissionRates />", () => {
  test("Basic styles and appearance", () => {
    const { getByTestId, container } = renderWithTheme(<TestCommissionRatesComponent />)

    expect(getByTestId("primary_commission_rate-input-preceding_icon")).toBeInTheDocument()
    expect(getByTestId("primary_commission_rate-input")).toBeInTheDocument()
    expect(getByTestId("update_primary_commission_rate-button")).toBeInTheDocument()

    const rateWrapper = getByTestId("primary_commission_rate-input-field_wrapper")
    const inputWrapper = getByTestId("primary_commission_rate-input-wrapper")

    expect(rateWrapper).toBeInTheDocument()
    expect(inputWrapper).toBeInTheDocument()
    expect(rateWrapper).toHaveStyleRule("display", "flex")
    expect(rateWrapper).toHaveStyleRule("align-items", "center")

    expect(container.firstChild).toMatchSnapshot()
  })

  test("Update button", async () => {
    const { getByTestId } = renderWithTheme(<TestCommissionRatesComponent />)

    const updateBtn = getByTestId("update_primary_commission_rate-button")

    expect(updateBtn).toBeInTheDocument()

    // Button should be disabled if no input value
    expect(updateBtn.attributes.disabled).not.toBe(undefined)

    fireEvent.change(getByTestId("primary_commission_rate-input"), {
      target: { value: "2" }
    })

    await waitFor(() => {
      // Button should be active after value input
      expect(updateBtn.attributes.disabled).toBe(undefined)
    })
  })

  test("Secondary commission rate field should show for non-pending agency codes", () => {
    const { queryByTestId } = renderWithTheme(<TestCommissionRatesComponent />)

    expect(queryByTestId("secondary_commission_rate-input-wrapper")).toBeInTheDocument()
  })

  test("Secondary commission rate field should not show for pending agency codes", () => {
    const { queryByTestId } = renderWithTheme(<TestCommissionRatesComponent isAgencyCodePending />)

    expect(queryByTestId("secondary_commission_rate-input-wrapper")).toBeNull()
  })
})
