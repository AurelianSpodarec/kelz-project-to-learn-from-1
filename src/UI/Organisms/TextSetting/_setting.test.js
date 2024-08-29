import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"
import userEvent from "@testing-library/user-event"
import { waitFor } from "@testing-library/react"

import TextSetting from "."

describe("<TextSetting />", () => {
  test("Basic components present and accounted for", () => {
    const { container, getByText, getByTestId } = renderWithTheme(
      <TextSetting name="jest" title="Setting title" content="<p>Setting content</p>" />
    )
    const editButton = getByTestId("jest_edit-button")
    const deleteButton = getByTestId("jest_delete-button")
    const wrapper = getByTestId("jest-text_setting-wrapper")

    expect(getByText("Setting title")).toBeInTheDocument()
    expect(getByText("Setting content")).toBeInTheDocument()
    expect(wrapper).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()

    expect(wrapper).toHaveStyleRule("width", "100%")
    expect(wrapper).toHaveStyleRule(
      "border",
      `1px solid ${get(colours, "tints.secondary.darkBlue.t70")}`
    )
    expect(wrapper).toHaveStyleRule("border-radius", "0.3rem")
    expect(wrapper).toHaveStyleRule("margin", "0 0 2rem")

    expect(editButton).toHaveStyleRule("padding", "0.5rem")
    expect(editButton).toHaveStyleRule("height", "3.5rem")
    expect(editButton).toHaveStyleRule("width", "3.5rem")
    expect(editButton).toHaveStyleRule("border-radius", "50%")
    expect(editButton).toHaveStyleRule("display", "flex")
    expect(editButton).toHaveStyleRule("align-items", "center")
    expect(editButton).toHaveStyleRule("justify-content", "center")
    expect(editButton).toHaveStyleRule("margin-right", "0.5rem")

    expect(deleteButton).toHaveStyleRule("padding", "0.5rem")
    expect(deleteButton).toHaveStyleRule("height", "3.5rem")
    expect(deleteButton).toHaveStyleRule("width", "3.5rem")
    expect(deleteButton).toHaveStyleRule("border-radius", "50%")
    expect(deleteButton).toHaveStyleRule("display", "flex")
    expect(deleteButton).toHaveStyleRule("align-items", "center")
    expect(deleteButton).toHaveStyleRule("justify-content", "center")
    expect(deleteButton).toHaveStyleRule("margin-right", "0.5rem")

    // Snapshot
    expect(container).toMatchSnapshot()
  })

  test("Edit button", async () => {
    const mockSetEdit = jest.fn()
    const { getByTestId } = renderWithTheme(
      <TextSetting
        name="jest"
        title="Setting title"
        content="<p>Setting content</p>"
        setEdit={mockSetEdit}
      />
    )
    const editButton = getByTestId("jest_edit-button")

    userEvent.click(editButton)
    await waitFor(() => {
      expect(mockSetEdit).toHaveBeenCalledTimes(1)
    })
  })

  describe("Submit button", () => {
    test("Edit title", async () => {
      const mockOnSubmit = jest.fn()
      const { getByTestId } = renderWithTheme(
        <TextSetting
          name="jest"
          title="Setting title"
          content="<p>Setting content</p>"
          onSubmit={mockOnSubmit}
          isEdit
          canEditTitle
        />
      )
      const submitButton = getByTestId("jest_submit-button")

      userEvent.click(submitButton)
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      })
    })

    test("onEdit prop", async () => {
      const mockOnSubmit = jest.fn()
      const { getByTestId } = renderWithTheme(
        <TextSetting
          name="jest"
          title="Setting title"
          content="<p>Setting content</p>"
          isEdit
          onEdit={mockOnSubmit}
        />
      )
      const submitButton = getByTestId("jest_submit-button")

      userEvent.click(submitButton)
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      })
    })
  })

  test("Delete button", async () => {
    const mockOnDelete = jest.fn()
    const { getByTestId } = renderWithTheme(
      <TextSetting
        name="jest"
        title="Setting title"
        content="<p>Setting content</p>"
        onDelete={mockOnDelete}
      />
    )
    const deleteButton = getByTestId("jest_delete-button")

    userEvent.click(deleteButton)
    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledTimes(1)
    })
  })

  describe("When editing", () => {
    test("Tick and cross buttons present", () => {
      const name = "jest"
      const { getByTestId } = renderWithTheme(
        <TextSetting name={name} title="Setting title" content="<p>Setting content</p>" isEdit />
      )
      expect(getByTestId(`${name}_submit-button`)).toBeInTheDocument()
      expect(getByTestId(`${name}_cancel-button`)).toBeInTheDocument()
      expect(() => getByTestId(`${name}_delete-button`)).toThrowError()
    })

    test("Cancel edit", () => {
      const test = jest.fn()
      const name = "jest"
      const { getByTestId } = renderWithTheme(
        <TextSetting
          name={name}
          title="Setting title"
          content="<p>Setting content</p>"
          isEdit
          onCancel={test}
        />
      )

      const cancelButton = getByTestId(`${name}_cancel-button`)
      userEvent.click(cancelButton)
      expect(test).toHaveBeenCalled()
    })

    test("Delete button present", () => {
      const name = "jest"
      const { getByTestId } = renderWithTheme(
        <TextSetting
          name={name}
          title="Setting title"
          content="<p>Setting content</p>"
          isEdit
          shouldShowDeleteOnEdit
        />
      )
      expect(getByTestId(`${name}_delete-button`)).toBeInTheDocument()
    })
  })
})
