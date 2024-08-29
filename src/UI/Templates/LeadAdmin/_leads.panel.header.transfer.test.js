/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, fireEvent, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import StoryLeadsProvider from "./story/leads.story.provider"
import TransferLead from "./leads.panel.header.transfer"

// Helpers
import { fakeUsersGetResponse, Providers } from "../../Helpers"

const TestComponent = ({ value = {} }) => (
  <Providers>
    <StoryLeadsProvider value={value}>
      <TransferLead users={fakeUsersGetResponse.data} />
    </StoryLeadsProvider>
  </Providers>
)

describe("<TransferLead />", () => {
  test("Form validation", async () => {
    // Mock submit call
    const onTransferLead = jest.fn()

    // Render
    const { container, getByTestId, getByText } = renderWithTheme(
      <TestComponent value={{ onTransferLead }} />
    )

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()

    expect(getByText("Transfer Ownership")).toBeInTheDocument()
    const transferButton = getByTestId("transfer_lead-button")

    // Open transfer modal
    userEvent.click(transferButton)
    await waitFor(() => {
      expect(getByText("Transfer a Lead")).toBeInTheDocument()
      expect(getByTestId("transfer_confirm-button")).toBeInTheDocument()
      expect(getByTestId("user_id-input")).toBeInTheDocument()
      expect(() => getByTestId("user_id-input-error_wrapper")).toThrowError()
    })

    const submitButton = getByTestId("transfer_confirm-button")
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(onTransferLead).toHaveBeenCalledTimes(0)
      expect(getByTestId("user_id-input-error_wrapper")).toBeInTheDocument()
      const errorText = within(getByTestId("user_id-input-error_wrapper")).getByTestId(
        "user_id-error-message"
      ).firstChild
      expect(errorText.textContent.includes("User Id"))
    })
  })

  test("Submit success", async () => {
    // Mock submit call
    const onTransferLead = jest.fn()

    // Render
    const { getByTestId, getByText } = renderWithTheme(<TestComponent value={{ onTransferLead }} />)

    expect(getByText("Transfer Ownership")).toBeInTheDocument()
    const transferButton = getByTestId("transfer_lead-button")

    // Open transfer modal
    userEvent.click(transferButton)
    await waitFor(() => {
      expect(getByText("Transfer a Lead")).toBeInTheDocument()
      expect(getByTestId("transfer_confirm-button")).toBeInTheDocument()
      expect(getByTestId("user_id-input")).toBeInTheDocument()
    })

    // Input valid value
    const field = getByTestId("user_id-input")
    fireEvent.change(field, { target: { value: "ro" } })
    await waitFor(() => {
      expect(getByTestId("user_id-typeahead-drop_wrapper")).toBeInTheDocument()
      expect(getByText("Robert Smith")).toBeInTheDocument()
    })
    const dropdown = getByTestId("user_id-typeahead-drop_wrapper")
    expect(dropdown.children.length).toBe(1)
    const [child] = dropdown.children
    fireEvent.click(child)
    await waitFor(() => {
      expect(getByTestId("transfer_confirm-button")).toBeInTheDocument()
    })

    // Hit the submit button
    const submitButton = getByTestId("transfer_confirm-button")
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(onTransferLead).toHaveBeenCalledTimes(1)
    })
  })
})
