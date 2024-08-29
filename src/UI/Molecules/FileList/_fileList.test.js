import React from "react"
import "jest-styled-components"

// Helpers
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Component
import FileList from "."

describe("<FileList />", () => {
  test("Renders all files in the list", () => {
    const list = [
      { name: "File 1", type: "image/png", size: 3 },
      { name: "File 2", type: "image/png", size: 3 }
    ]
    const { getByText } = renderWithTheme(<FileList files={list} />)

    expect(getByText("File 1")).toBeInTheDocument()
    expect(getByText("File 2")).toBeInTheDocument()
  })
  test("Render default empty message if no files are present", () => {
    const list = []
    const { getByText } = renderWithTheme(<FileList files={list} />)

    expect(getByText("No files have been selected")).toBeInTheDocument()
  })
})
