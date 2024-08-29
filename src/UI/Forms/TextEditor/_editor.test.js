import React from "react"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"

// Helpers
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Component
import TextEditor from "."

describe("<TextEditor />", () => {
  test("Basic styles and appearance", async () => {
    const mockSetFieldValue = jest.fn()
    const { getByTestId, getByText, container } = renderWithTheme(
      <TextEditor
        formik={{ values: { story: "<p>Test</p>" }, setFieldValue: mockSetFieldValue }}
        name="story"
      />
    )
    await waitFor(() => {
      expect(getByTestId("story-editor-wrapper")).toBeInTheDocument()
      expect(getByText("Test")).toBeInTheDocument()
    })

    const wrapper = getByTestId("story-editor-wrapper")
    expect(wrapper).toHaveStyleRule("width", "100%")
    expect(container.firstChild).toHaveStyleRule("margin", "0 0 2rem")
  })
})
