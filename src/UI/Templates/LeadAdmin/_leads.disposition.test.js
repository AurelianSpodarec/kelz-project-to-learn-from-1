/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import StoryLeadsProvider from "./story/leads.story.provider"
import Disposition from "./leads.panel.header.disposition"

// Helpers
import { fakeLeadConfigGetResponse, Providers } from "../../Helpers"

const TestComponent = ({ value = {} }) => (
  <Providers>
    <StoryLeadsProvider value={value}>
      <Disposition />
    </StoryLeadsProvider>
  </Providers>
)

describe("<Disposition />", () => {
  test("Basic component & styles", async () => {
    // Render
    const { getByText, getByTestId } = renderWithTheme(<TestComponent />)

    const dispositionButton = getByTestId("disposition-button")

    // Assert
    expect(dispositionButton).toBeInTheDocument()

    userEvent.click(dispositionButton)
    await waitFor(() => {
      expect(getByText("Change disposition")).toBeInTheDocument()
      expect(getByText("Write your notes")).toBeInTheDocument()

      expect(getByText("Submit")).toBeInTheDocument()
      expect(getByText("Cancel")).toBeInTheDocument()
    })
  })
  test("Render with initial values (populated form)", async () => {
    const disposition = Object.keys(fakeLeadConfigGetResponse.data.disposition)[0]
    const note = "Test"
    const value = {
      selectedLead: {
        disposition: {
          disposition,
          note
        }
      }
    }
    // Render
    const { getByTestId, queryByTestId, container } = renderWithTheme(
      <TestComponent value={value} />
    )

    userEvent.click(getByTestId("disposition-button"))
    await waitFor(() => {
      expect(queryByTestId("disposition-select").value).toBe(disposition)
      expect(queryByTestId("note-textarea").value).toBe(note)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
  test("Submit", async () => {
    // Render
    const mockOnDispositionSubmit = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent value={{ onSubmitDisposition: mockOnDispositionSubmit }} />
    )

    const dispositionButton = getByTestId("disposition-button")

    // Act/Assert
    userEvent.click(dispositionButton)
    await waitFor(() => {
      expect(getByTestId("disposition-select")).toBeInTheDocument()
      expect(getByTestId("note-textarea")).toBeInTheDocument()
    })

    fireEvent.change(getByTestId("disposition-select"), { target: { value: "NO_CONTACT" } })
    await waitFor(() => {
      expect(getByText("Asked to not be contacted")).toBeInTheDocument()
    })

    userEvent.click(getByText("Submit"))
    await waitFor(() => {
      expect(mockOnDispositionSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnDispositionSubmit).toHaveBeenCalledWith({ disposition: "NO_CONTACT", note: "" })
    })
  })
})
