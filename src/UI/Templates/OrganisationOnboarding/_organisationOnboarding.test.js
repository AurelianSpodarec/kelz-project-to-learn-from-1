import React from "react"
import "jest-styled-components"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import userEvent from "@testing-library/user-event"
import { waitFor } from "@testing-library/react"

import OrganisationOnboarding from "."
import TestNetworkSettingsProvider from "./story/organisationOnboarding.story.provider"

// eslint-disable-next-line react/prop-types
const TestComponent = ({ value }) => (
  <TestNetworkSettingsProvider value={value}>
    <OrganisationOnboarding />
  </TestNetworkSettingsProvider>
)

describe("<OrganisationOnboarding />", () => {
  test("Approval", async () => {
    const onBypass = jest.fn()
    const { getByText, getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          onBypass
        }}
      />
    )

    getByText("Status")
    getByText("Not approved")
    getByText("Status")

    getByText("Due Diligence")
    getByText("Not started")

    expect(getByTestId("activate-button")).toBeInTheDocument()

    // Mock user click on bypass
    userEvent.click(getByTestId("bypass_due_diligence-checkbox-wrapper").firstChild)

    await waitFor(() => {
      getByTestId("confirmation_modal-modal-wrapper")
    })

    // Mock on confirm
    userEvent.click(getByTestId("confirmation_modal_confirm-button"))

    await waitFor(() => {
      expect(onBypass).toBeCalledTimes(1)
    })
  })

  test("Due Diligence", async () => {
    const onComplete = jest.fn()
    const { getByText, getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          onComplete
        }}
      />
    )

    getByText("Due Diligence Checklist")

    getByText("Completed online application received")
    getByText("Confirm that the online application is complete.")
    const toggleSlider1 = getByTestId("due_diligence_item_999-toggle-options").children[1]

    getByText("Companies House check")
    getByText(
      "Confirm the applicant company is registered at Companies House, and that the supplied registration number is correct."
    )

    const toggleSlider2 = getByTestId("due_diligence_item_1000-toggle-options").children[1]

    // Mock user click item 1
    userEvent.click(toggleSlider1)

    await waitFor(() => {
      expect(onComplete).toBeCalledTimes(1)
    })

    // Mock user click item 2
    userEvent.click(toggleSlider2)

    await waitFor(() => {
      expect(onComplete).toBeCalledTimes(2)
    })
  })
})
