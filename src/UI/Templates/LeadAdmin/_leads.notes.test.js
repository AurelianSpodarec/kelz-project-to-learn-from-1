import React from "react"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import LeadNotes from "./leads.panel.view.notes"
import StoryLeadsProvider from "./story/leads.story.provider"

// Helpers
import { Providers } from "../../Helpers"

// eslint-disable-next-line react/prop-types
const TestComponent = ({ value = {} }) => (
  <Providers>
    <StoryLeadsProvider value={value}>
      <LeadNotes />
    </StoryLeadsProvider>
  </Providers>
)

describe("<LeadNotes />", () => {
  test("Basic component & styles", async () => {
    // Render
    const { getByTestId, getAllByText, container, getByText } = renderWithTheme(<TestComponent />)
    const button = getByTestId("add_note-button")

    // Act/Assert
    expect(button).toBeInTheDocument()
    userEvent.click(button)
    await waitFor(() => {
      expect(getByText("Notes")).toBeInTheDocument()
      expect(
        getAllByText(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        ).length
      ).toBe(3)
    })

    expect(container.firstChild).toMatchSnapshot()
  })

  test("Add note", async () => {
    // Render
    const mockOnAddNote = jest.fn()
    const { getByTestId } = renderWithTheme(
      <TestComponent value={{ onAddNote: mockOnAddNote, notesModal: true }} />
    )
    const addButton = getByTestId("add_new_note-button")
    const input = getByTestId("note-input")

    // Act/Assert
    fireEvent.change(input, { target: { value: "test" } })
    await waitFor(() => {
      expect(input).toHaveValue("test")
    })

    userEvent.click(addButton)
    await waitFor(() => {
      expect(mockOnAddNote).toHaveBeenCalledTimes(1)
      expect(mockOnAddNote).toHaveBeenCalledWith("test")
    })
  })
})
