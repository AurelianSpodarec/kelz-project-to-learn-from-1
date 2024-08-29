import React from "react"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Helpers
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Component
import Logo from "."

describe("<Logo />", () => {
  test("Render Logo in View mode", () => {
    // Render
    const { container } = renderWithTheme(<Logo isEdit={false} title="Test logo" />)

    expect(container.firstChild).toBe(null)
  })
  test("Render Logo in Edit mode", async () => {
    // Render
    const { getByText } = renderWithTheme(<Logo isEdit title="Test logo" path="/test" />)

    expect(getByText("Change logo")).toBeInTheDocument()
    expect(getByText("Delete logo")).toBeInTheDocument()
  })
  test("Clicking update button opens the update dialog", async () => {
    const mockSetUpdate = jest.fn()
    // Render
    const { getByTestId } = renderWithTheme(
      <Logo isEdit title="Test logo" setUpdate={mockSetUpdate} />
    )

    const update = getByTestId("update_logo-button")

    userEvent.click(update)
    await waitFor(() => {
      expect(mockSetUpdate).toHaveBeenCalledTimes(1)
      expect(mockSetUpdate).toHaveBeenCalledWith(true)
    })
  })
  test("Clicking delete button opens the delete dialog", async () => {
    const mockSetDelete = jest.fn()
    // Render
    const { getByTestId } = renderWithTheme(
      <Logo isEdit title="Test logo" setDelete={mockSetDelete} path="/test" />
    )

    const deleteButton = getByTestId("delete_logo-button")

    userEvent.click(deleteButton)
    await waitFor(() => {
      expect(mockSetDelete).toHaveBeenCalledTimes(1)
      expect(mockSetDelete).toHaveBeenCalledWith(true)
    })
  })
})
