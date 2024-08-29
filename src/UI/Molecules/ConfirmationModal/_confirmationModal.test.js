import React from "react"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Helpers
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Component
import ConfirmationModal from "."

describe("<ConfirmationModal />", () => {
  test("Render ConfirmationModal with basic styles", () => {
    // Render
    const { getByTestId, getByText } = renderWithTheme(
      <ConfirmationModal title="Test title">
        <p>Test content</p>
      </ConfirmationModal>
    )
    const confirm = getByTestId("confirmation_modal_confirm-button")
    const cancel = getByTestId("confirmation_modal_cancel-button")
    const buttons = getByTestId("confirmation_modal-buttons")

    // All buttons should be present
    expect(confirm).toBeInTheDocument()
    expect(cancel).toBeInTheDocument()
    expect(buttons).toBeInTheDocument()

    // Passed content should be rendered
    expect(getByText("Test title")).toBeInTheDocument()
    expect(getByText("Test content")).toBeInTheDocument()

    // Basic styles
    expect(buttons).toHaveStyleRule("display", "flex")
    expect(buttons).toHaveStyleRule("justify-content", "space-between")
  })

  test("onConfirm action", async () => {
    // Render
    const mockOnConfirm = jest.fn()
    const { getByTestId } = renderWithTheme(
      <ConfirmationModal title="Test title" onConfirm={mockOnConfirm}>
        <p>Test content</p>
      </ConfirmationModal>
    )
    const confirm = getByTestId("confirmation_modal_confirm-button")

    // Act and Assert
    userEvent.click(confirm)
    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    })
  })

  test("onClose action", async () => {
    // Render
    const mockOnClose = jest.fn()
    const { getByTestId } = renderWithTheme(
      <ConfirmationModal title="Test title" onClose={mockOnClose}>
        <p>Test content</p>
      </ConfirmationModal>
    )
    const cancel = getByTestId("confirmation_modal_cancel-button")
    const overlay = getByTestId("confirmation_modal-modal-overlay")
    const close = getByTestId("confirmation_modal-modal-close")

    // Act and Assert
    userEvent.click(cancel)
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    userEvent.click(close)
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(2)
    })

    userEvent.click(overlay)
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(3)
    })
  })
  test("onCancel action and onClose override", async () => {
    // Render
    const mockOnClose = jest.fn()
    const mockOnCancel = jest.fn()
    const { getByTestId } = renderWithTheme(
      <ConfirmationModal title="Test title" onClose={mockOnClose} onCancel={mockOnCancel}>
        <p>Test content</p>
      </ConfirmationModal>
    )
    const cancel = getByTestId("confirmation_modal_cancel-button")

    // Act and Assert
    userEvent.click(cancel)
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(0)
      expect(mockOnCancel).toHaveBeenCalledTimes(1)
    })
  })
})
