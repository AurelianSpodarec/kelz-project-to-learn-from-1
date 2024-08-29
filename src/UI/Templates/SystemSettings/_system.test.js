import React from "react"
import "jest-styled-components"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import userEvent from "@testing-library/user-event"
import { waitFor } from "@testing-library/react"

import SystemSettings from "."
import TestSystemSettingsProvider from "./story/system.story.provider"

// eslint-disable-next-line react/prop-types
const TestComponent = ({ value }) => (
  <TestSystemSettingsProvider value={value}>
    <SystemSettings />
  </TestSystemSettingsProvider>
)

describe("<SystemSettings />", () => {
  test("Basic components present and accounted for", async () => {
    const { getByText, getByTestId } = renderWithTheme(<TestComponent />)
    expect(getByText("Maintenance Mode")).toBeInTheDocument()
    expect(getByTestId("maintenance_mode-toggle-wrapper")).toBeInTheDocument()

    expect(getByText("Due Diligences")).toBeInTheDocument()
    expect(getByTestId("test_title_1-text_setting-wrapper")).toBeInTheDocument()
    expect(getByTestId("test_title_2-text_setting-wrapper")).toBeInTheDocument()
    expect(getByTestId("test_title_3-text_setting-wrapper")).toBeInTheDocument()
  })
  test("Toggle maintenance mode", async () => {
    const mockOnClickMaintenanceMode = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent value={{ onClickMaintenanceMode: mockOnClickMaintenanceMode }} />
    )
    const disable = getByTestId("maintenance_mode-toggle-option_disabled")

    userEvent.click(disable)
    await waitFor(() => {
      expect(getByText("Are you sure?")).toBeInTheDocument()
      expect(getByText("Really disable maintenance mode on the system?")).toBeInTheDocument()
    })

    userEvent.click(getByText("Disable"))
    await waitFor(() => {
      expect(mockOnClickMaintenanceMode).toHaveBeenCalledTimes(1)
    })
  })
  test("Delete due diligence action", async () => {
    const mockOnDelete = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent value={{ onDueDiligenceDelete: mockOnDelete }} />
    )
    const deleteItem = getByTestId("test_title_1_delete-button")

    userEvent.click(deleteItem)
    await waitFor(() => {
      expect(getByText("Are you sure?")).toBeInTheDocument()
      expect(
        getByText("Are you sure you want to delete this due diligence item?")
      ).toBeInTheDocument()
    })

    userEvent.click(getByText("Delete"))
    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledTimes(1)
    })
  })
  test("Edit due diligence action", async () => {
    const mockOnSubmit = jest.fn()
    const { getByTestId } = renderWithTheme(
      <TestComponent value={{ onDueDiligenceSubmit: mockOnSubmit }} />
    )
    const editItem = getByTestId("test_title_1_edit-button")

    userEvent.click(editItem)
    await waitFor(() => {
      expect(getByTestId("test_title_1_submit-button")).toBeInTheDocument()
    })

    userEvent.click(getByTestId("test_title_1_submit-button"))
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
