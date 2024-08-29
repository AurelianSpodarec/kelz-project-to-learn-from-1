import React from "react"
import "jest-styled-components"
import { waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"
import MyAccountDetailsStoryProvider from "./story/details.story.provider"
import { Providers } from "../../Helpers"

// Component
import MyAccountDetails from "."

import SelfServiceProvider from "../../../pages/MyAccount/pages/Details/context/details.provider.js"

describe("<MyAccountDetails />", () => {
  test("Details pane styles and appearance", () => {
    const { getByTestId } = renderWithTheme(
      <Providers>
        <MyAccountDetailsStoryProvider>
          <MyAccountDetails />
        </MyAccountDetailsStoryProvider>
      </Providers>
    )

    // Wrapper
    const wrapper = getByTestId("details-wrapper")

    expect(wrapper).toHaveStyleRule("border-bottom", `1px solid ${colours.faintGrey}`)
    expect(wrapper).toHaveStyleRule("padding-bottom", "3rem")
    expect(wrapper).toHaveStyleRule("margin", "0 0 2rem")

    // Details pane fields should be present
    expect(within(wrapper).getByText("Mr System Admin")).toBeInTheDocument()
    expect(within(wrapper).getByText("system.admin@usaycompare.com")).toBeInTheDocument()
  })

  test("Update Details form", async () => {
    const mockOnSubmit = jest.fn()
    const { getByText, getByTestId } = renderWithTheme(
      <Providers>
        <MyAccountDetailsStoryProvider value={{ onUpdateDetailsSubmit: mockOnSubmit }}>
          <MyAccountDetails />
        </MyAccountDetailsStoryProvider>
      </Providers>
    )
    const button = getByText("Update personal information")

    // Clicking the button should open the modal
    userEvent.click(button)
    await waitFor(() => {
      expect(getByText("Update Account Details")).toBeInTheDocument()
      expect(getByTestId("confirmation_modal_confirm-button").textContent).toBe("OK")
      expect(getByTestId("confirmation_modal_cancel-button").textContent).toBe("Cancel")
      expect(getByTestId("first_name-input")).toBeInTheDocument()
    })

    // Submit the model form
    userEvent.click(getByTestId("confirmation_modal_confirm-button"))
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith({
        body: {
          email: "system.admin@usaycompare.com",
          first_name: "System",
          last_name: "Admin",
          middle_names: null
        }
      })
    })
  })

  test("Change password Modal", async () => {
    const { getByTestId } = renderWithTheme(
      <Providers>
        <SelfServiceProvider>
          <MyAccountDetails />
        </SelfServiceProvider>
      </Providers>
    )

    const changePasswordButton = getByTestId("change_password-button")
    userEvent.click(changePasswordButton)
    await waitFor(() => {
      expect(getByTestId("confirmation_modal-portal-container"))
    })
    expect(
      within(getByTestId("confirmation_modal-portal-container")).getByText(
        "Please ensure you select a password that is memorable to yourself, but also strong enough that it could not be easily guessed by an unauthorised user."
      )
    ).toBeInTheDocument()
    expect(
      within(getByTestId("confirmation_modal-portal-container")).getByText(
        "Passwords should contain a minimum of 8 characters and include at least one uppercase letter, one lowercase letter and one digit."
      )
    ).toBeInTheDocument()
  })
})
