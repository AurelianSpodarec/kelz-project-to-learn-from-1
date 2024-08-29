import React from "react"
import "jest-styled-components"

// Helpers
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import Avatar from "."

const first = "test"
const last = "test"

describe("<Avatar />", () => {
  test("Render default Column and styles", () => {
    // Render
    const { getByText, container } = renderWithTheme(<Avatar first={first} last={last} />)
    getByText("TT")
    // Assert
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Basic styles and appearance", () => {
    const { container } = renderWithTheme(<Avatar first={first} last={last} />)

    const wrapper = container.firstChild
    const initials = wrapper.firstChild

    expect(wrapper).toBeInTheDocument()
    expect(initials).toBeInTheDocument()

    expect(wrapper).toHaveStyleRule("margin", "0")
    expect(wrapper).toHaveStyleRule("width", "3rem")
    expect(wrapper).toHaveStyleRule("height", "3rem")

    expect(initials).toHaveStyleRule("height", "100%")
    expect(initials).toHaveStyleRule("width", "100%")
    expect(initials).toHaveStyleRule("color", "#335257")
    expect(initials).toHaveStyleRule("font-size", "calc(3rem / 2)")
    expect(initials).toHaveStyleRule("letter-spacing", "0")
    expect(initials).toHaveStyleRule("text-align", "center")
    expect(initials).toHaveStyleRule("background-color", "#EFEFEF")
    expect(initials).toHaveStyleRule("border-radius", "50%")
    expect(initials).toHaveStyleRule("display", "flex")
    expect(initials).toHaveStyleRule("flex-direction", "column")
    expect(initials).toHaveStyleRule("justify-content", "center")
    expect(initials).toHaveStyleRule("align-items", "center")
  })
})
