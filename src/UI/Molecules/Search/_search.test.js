import React from "react"
import "jest-styled-components"
import { fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Helpers
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Search from "."

describe("<Search />", () => {
  // Render
  test("Basic styling", () => {
    const { getByTestId, container } = renderWithTheme(
      <Search name="jest" placeholder="search placeholder" />
    )
    const wrapper = getByTestId("jest-search-wrapper")
    const input = getByTestId("jest-input")
    const afterIcon = getByTestId("jest-input-trailing_icon")

    expect(wrapper).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(afterIcon).toBeInTheDocument()

    // Assert
    expect(wrapper).toHaveStyleRule("margin", "0 0 2rem")
    expect(wrapper).toHaveStyleRule("width", "30rem")
    expect(input.placeholder).toBe("search placeholder")

    expect(container.firstChild).toMatchSnapshot()
  })

  test("handleChange and cancel", async () => {
    const mockHandleChange = jest.fn()
    const mockCancel = jest.fn()
    // Render
    const { getByTestId } = renderWithTheme(
      <Search name="jest" handleChange={mockHandleChange} onCancel={mockCancel} />
    )
    const input = getByTestId("jest-input")
    const afterIcon = getByTestId("jest-input-trailing_icon")

    userEvent.click(afterIcon)
    await waitFor(() => {
      expect(mockCancel).toHaveBeenCalledTimes(0)
    })

    fireEvent.change(input, { target: { value: "test" } })
    await waitFor(() => {
      expect(mockHandleChange).toHaveBeenCalled()
      expect(input.value).toBe("test")
    })

    const button = getByTestId("jest-input-trailing_icon")

    userEvent.click(button)
    await waitFor(() => {
      expect(mockCancel).toHaveBeenCalledTimes(1)
      expect(input.value).toBe("")
    })
  })
})
