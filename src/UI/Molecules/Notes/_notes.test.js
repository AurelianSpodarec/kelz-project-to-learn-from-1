import React from "react"
import "jest-styled-components"
import userEvent from "@testing-library/user-event"
import { waitFor, fireEvent } from "@testing-library/react"
import { Provider } from "@4cplatform/elements/Auth/auth.context"
import { get } from "lodash"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Components
import Notes from "."

const TestComponent = props => (
  <Provider
    value={{
      canAccess: () => true,
      loggedIn: true,
      user: { first_name: "first", last_name: "last" }
    }}
  >
    <Notes
      {...props}
      notes={[
        {
          id: 1,
          note: "test",
          created_at: "2021-03-30T14:03:42.000000Z",
          updated_at: "2021-03-30T14:03:42.000000Z",
          deleted_at: null
        }
      ]}
    />
  </Provider>
)

describe("<Notes />", () => {
  test("Basic styles and appearance", () => {
    // Render
    const { getByTestId, container } = renderWithTheme(<TestComponent />)

    const wrapper = getByTestId("test-notes")
    const notesWrapper = getByTestId("test-notes-wrapper")
    const inputWrapper = getByTestId("test-notes-input-wrapper")
    const notesFooterWrapper = getByTestId("test-notes-footer-wrapper")
    const notesButtonsWrapper = getByTestId("test-notes-buttons-wrapper")
    const headerWrapper = getByTestId("test-notes-input-header-wrapper")
    const headerText = getByTestId("test-notes-input-header-text")

    expect(wrapper).toBeInTheDocument()
    expect(notesWrapper).toBeInTheDocument()
    expect(inputWrapper).toBeInTheDocument()
    expect(headerWrapper).toBeInTheDocument()
    expect(headerText).toBeInTheDocument()

    expect(wrapper).toHaveStyleRule("height", "78.6rem")
    expect(wrapper).toHaveStyleRule("width", "54.1rem")
    expect(wrapper).toHaveStyleRule("display", "flex")
    expect(wrapper).toHaveStyleRule("flex-direction", "column")
    expect(wrapper).toHaveStyleRule("border", "1px solid #B2BEC0")
    expect(wrapper).toHaveStyleRule("background-color", get(colours, "white"))

    expect(notesWrapper).toHaveStyleRule("overflow-y", "scroll")
    expect(notesWrapper).toHaveStyleRule("height", "69.5rem")
    expect(notesWrapper).toHaveStyleRule("width", "100%")
    expect(notesWrapper).toHaveStyleRule("display", "flex")
    expect(notesWrapper).toHaveStyleRule("flex-direction", "column")
    expect(notesWrapper).toHaveStyleRule("background-color", get(colours, "veryFaintGrey"))

    expect(inputWrapper).toHaveStyleRule("margin-bottom", "2rem")

    expect(notesFooterWrapper).toHaveStyleRule("padding", "2rem")
    expect(notesFooterWrapper).toHaveStyleRule("background-color", get(colours, "white"))
    expect(notesFooterWrapper).toHaveStyleRule(
      "border-top",
      `1px solid ${get(colours, "faintGrey")}`
    )

    expect(notesButtonsWrapper).toHaveStyleRule("display", "flex")
    expect(notesButtonsWrapper).toHaveStyleRule("justify-content", "space-between")

    expect(headerWrapper).toHaveStyleRule("width", "100%")
    expect(headerWrapper).toHaveStyleRule("align-items", "center")
    expect(headerWrapper).toHaveStyleRule("align-self", "center")
    expect(headerWrapper).toHaveStyleRule("justify-content", "center")
    expect(headerWrapper).toHaveStyleRule("background-color", get(colours, "white"))

    expect(headerText).toHaveStyleRule("height", "3.5rem")
    expect(headerText).toHaveStyleRule("width", "14.1rem")
    expect(headerText).toHaveStyleRule("color", colours.tints.secondary.darkBlue.t10)
    expect(headerText).toHaveStyleRule("font-size", "3rem")
    expect(headerText).toHaveStyleRule("letter-spacing", "0")
    expect(headerText).toHaveStyleRule("line-height", "3.5rem")
    expect(headerText).toHaveStyleRule("flex-direction", "column")
    expect(headerText).toHaveStyleRule("justify-content", "center")
    expect(headerText).toHaveStyleRule("align-self", "center")

    // Check submit button
    expect(getByTestId("note-input")).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  test("With notes", () => {
    const { getByTestId, getByText } = renderWithTheme(<TestComponent />)

    const messageWrapper = getByTestId("test-notes-message-wrapper")
    const message = getByTestId("test-notes-message")
    const underWrapper = getByTestId("test-notes-under-wrapper")
    const content = getByTestId("test-notes-content")
    const timestamp = getByTestId("test-notes-timestamp")

    getByText("test")

    expect(messageWrapper).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    expect(underWrapper).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    expect(timestamp).toBeInTheDocument()

    expect(messageWrapper).toHaveStyleRule("height", "auto")
    expect(messageWrapper).toHaveStyleRule("width", "48.5rem")
    expect(messageWrapper).toHaveStyleRule("align-self", "center")
    expect(messageWrapper).toHaveStyleRule("margin", "2rem 1rem 3rem 0")
    expect(messageWrapper).toHaveStyleRule("display", "flex")
    expect(messageWrapper).toHaveStyleRule("flex-direction", "column")
    expect(messageWrapper).toHaveStyleRule("justify-content", "center")
    expect(messageWrapper).toHaveStyleRule("align-items", "center")

    expect(message).toHaveStyleRule("min-height", "7.4rem")
    expect(message).toHaveStyleRule("height", "auto")
    expect(message).toHaveStyleRule("border-radius", "0.3rem 0.3rem 0.3rem 0")
    expect(message).toHaveStyleRule("background-color", get(colours, "white"))
    expect(message).toHaveStyleRule("box-shadow", "0 0 0.1rem 0 rgba(0,34,43,0.05)")
    expect(message).toHaveStyleRule("display", "flex")
    expect(message).toHaveStyleRule("flex-direction", "column")
    expect(message).toHaveStyleRule("justify-content", "center")
    expect(message).toHaveStyleRule("align-items", "center")
    expect(message).toHaveStyleRule("width", "100%")

    expect(underWrapper).toHaveStyleRule("justify-content", "flex-end")
    expect(underWrapper).toHaveStyleRule("width", "100%")
    expect(underWrapper).toHaveStyleRule("font-size", "12px")
    expect(underWrapper).toHaveStyleRule("letter-spacing", "0")
    expect(underWrapper).toHaveStyleRule("line-height", "15px")
    expect(underWrapper).toHaveStyleRule("display", "flex")
    expect(underWrapper).toHaveStyleRule("align-items", "center")

    expect(content).toHaveStyleRule("margin-top", "1rem")
    expect(content).toHaveStyleRule("width", "41.1rem")
    expect(content).toHaveStyleRule("font-size", "1.4rem")
    expect(content).toHaveStyleRule("letter-spacing", "0")
    expect(content).toHaveStyleRule("line-height", "1.7rem")

    expect(timestamp).toHaveStyleRule("height", "2rem")
    expect(timestamp).toHaveStyleRule("margin-top", "-0.9rem")
    expect(timestamp).toHaveStyleRule("width", "100%")
    expect(timestamp).toHaveStyleRule("color", get(colours, "darkBlue"))
    expect(timestamp).toHaveStyleRule("font-size", "1.4rem")
    expect(timestamp).toHaveStyleRule("letter-spacing", "0")
    expect(timestamp).toHaveStyleRule("line-height", "3rem")
    expect(timestamp).toHaveStyleRule("text-align", "left")
    expect(timestamp).toHaveStyleRule("border-top-right-radius", "1rem")
    expect(timestamp).toHaveStyleRule("background-color", get(colours, "veryFaintGrey"))
  })

  test("onSubmit prop", async () => {
    const mockOnAddNote = jest.fn()
    const { queryByTestId, getByTestId } = renderWithTheme(
      <TestComponent onAddNote={mockOnAddNote} />
    )
    // Mock input change
    const input = getByTestId("note-input")
    fireEvent.change(input, { target: { value: "test" } })

    const addButton = getByTestId("add_new_note-button")
    const cancelButton = queryByTestId("cancel_note-button")

    // Cancel button should not be rendered
    expect(cancelButton).toBeNull()

    // Click the button
    userEvent.click(addButton)
    await waitFor(() => {
      expect(mockOnAddNote).toHaveBeenCalledTimes(1)
      expect(mockOnAddNote).toHaveBeenCalledWith("test")
    })
  })

  test("onAddNoteCancel prop", async () => {
    const mockOnAddNoteCancel = jest.fn()
    const { queryByTestId } = renderWithTheme(
      <TestComponent onAddNoteCancel={mockOnAddNoteCancel} />
    )

    const cancelButton = queryByTestId("cancel_note-button")

    // Cancel button should be rendered
    expect(cancelButton).not.toBeNull()

    // Click the button
    userEvent.click(cancelButton)
    await waitFor(() => {
      expect(mockOnAddNoteCancel).toHaveBeenCalledTimes(1)
    })
  })
})
