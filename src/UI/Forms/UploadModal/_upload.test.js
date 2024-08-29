import React from "react"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Helpers
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Component
import UploadModal from "."

describe("<UploadModal />", () => {
  test("Render UploadModal with basic styles", () => {
    const testFormik = {
      values: {
        jest: [
          {
            name: "test.jpeg",
            type: "image/jpeg",
            size: 3
          }
        ]
      },
      setFieldValue: jest.fn()
    }
    // Render
    const { getByTestId, getByText } = renderWithTheme(
      <UploadModal name="jest" formik={testFormik} />
    )

    const confirm = getByTestId("jest_confirm-button")
    const cancel = getByTestId("jest_cancel-button")

    expect(confirm).toBeInTheDocument()
    expect(cancel).toBeInTheDocument()
    expect(getByText("test.jpeg")).toBeInTheDocument()
  })
  test("onConfirm action", async () => {
    const testFormik = {
      values: {
        jest: [
          {
            name: "test.jpeg",
            type: "image/jpeg",
            size: 3
          }
        ]
      },
      setFieldValue: jest.fn(),
      handleSubmit: jest.fn()
    }
    // Render
    const { getByTestId } = renderWithTheme(
      <UploadModal name="jest" formik={testFormik} onConfirm={testFormik.handleSubmit} />
    )
    const confirm = getByTestId("jest_confirm-button")

    // Act and Assert
    userEvent.click(confirm)
    await waitFor(() => {
      expect(testFormik.handleSubmit).toHaveBeenCalledTimes(1)
    })
  })
  test("onCancel action", async () => {
    const testFormik = {
      values: {
        jest: [
          {
            name: "test.jpeg",
            type: "image/jpeg",
            size: 3
          }
        ]
      },
      setFieldValue: jest.fn()
    }
    const mockOnCancel = jest.fn()

    // Render
    const { getByTestId } = renderWithTheme(
      <UploadModal name="jest" formik={testFormik} onCancel={mockOnCancel} />
    )
    const cancel = getByTestId("jest_cancel-button")

    // Act and Assert
    userEvent.click(cancel)
    await waitFor(() => {
      expect(mockOnCancel).toHaveBeenCalledTimes(1)
    })
  })
})
