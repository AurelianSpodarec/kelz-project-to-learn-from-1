/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"
import { Providers } from "../../Helpers"

// Component
import NetworkDetails from "."
import NetworkDetailsProvider from "./story/network.story.provider"
import NetworkManageProvider from "../../../pages/NetworkManage/context/manage.provider"

const TestComponent = ({ value = {} }) => (
  <Providers>
    <NetworkManageProvider>
      <NetworkDetailsProvider value={value}>
        <NetworkDetails />
      </NetworkDetailsProvider>
    </NetworkManageProvider>
  </Providers>
)

describe("<NetworkDetails />", () => {
  test("Basic appearance and styles", () => {
    const { getByText, getByTestId, container } = renderWithTheme(<TestComponent />)
    const section = getByTestId("details-section-network_details")
    // All view fields should be there
    expect(getByText("Network One")).toBeInTheDocument()
    expect(getByText("This is a description of the network")).toBeInTheDocument()
    expect(getByText("07967876545")).toBeInTheDocument()

    // SectionWrapper styles
    expect(section).toBeInTheDocument()
    expect(section).toHaveStyleRule("border-bottom", `1px solid ${colours.faintGrey}`)
    expect(section).toHaveStyleRule("margin", "0 0 2rem")
    expect(section).toHaveStyleRule("padding", "0")
    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Edit details", async () => {
    const mockOnEditDetailsSubmit = jest.fn()
    const { getByTestId } = renderWithTheme(
      <TestComponent value={{ onEditDetailsSubmit: mockOnEditDetailsSubmit }} />
    )
    const updateButton = getByTestId("update_network_information-button")
    userEvent.click(updateButton)
    await waitFor(() => {
      expect(getByTestId("name-input")).toBeInTheDocument()
      expect(getByTestId("description-textarea")).toBeInTheDocument()
      expect(getByTestId("company_registration_number-input")).toBeInTheDocument()
      expect(getByTestId("fca_reference-input")).toBeInTheDocument()
    })

    const submitButton = getByTestId("edit_network_details-button")
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(mockOnEditDetailsSubmit).toHaveBeenCalledTimes(0)
    })
  })

  describe("Cancel edit details", () => {
    test("Dirty form", async () => {
      const { getByText, getByTestId } = renderWithTheme(<TestComponent />)

      const updateButton = getByTestId("update_network_information-button")
      userEvent.click(updateButton)
      await waitFor(() => {
        expect(() => getByTestId("update_network_information-button")).toThrowError()
      })

      const nameInput = getByTestId("name-input")
      fireEvent.change(nameInput, { target: { value: "Network 00" } })
      await waitFor(() => {
        expect(nameInput.value).toBe("Network 00")
      })

      const cancelButton = getByTestId("cancel-button")
      userEvent.click(cancelButton)
      await waitFor(() => {
        expect(
          getByText(
            "You have unsaved changes. Are you sure you want to abandon changes and return to the provider details page?"
          )
        ).toBeInTheDocument()
      })

      const cancelModalButton = getByTestId("confirmation_modal_confirm-button")
      userEvent.click(cancelModalButton)
      await waitFor(() => {
        expect(getByTestId("update_network_information-button")).toBeInTheDocument()
      })
    })

    test("Non dirty form", async () => {
      const { getByText, getByTestId } = renderWithTheme(<TestComponent />)

      const updateButton = getByTestId("update_network_information-button")
      userEvent.click(updateButton)
      await waitFor(() => {
        expect(() => getByTestId("update_network_information-button")).toThrowError()
      })

      const cancelButton = getByTestId("cancel-button")
      userEvent.click(cancelButton)
      await waitFor(() => {
        expect(() => getByText("Cancel Network changes")).toThrowError()
        expect(getByTestId("update_network_information-button")).toBeInTheDocument()
      })
    })
  })
})
