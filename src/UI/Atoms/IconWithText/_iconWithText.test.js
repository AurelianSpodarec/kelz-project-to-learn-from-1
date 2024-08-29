import React from "react"
import "jest-styled-components"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Component
import IconWithText from "."

describe("<IconWithText />", () => {
  test("Basic styles and appearance", () => {
    const { getByText, container } = renderWithTheme(
      <IconWithText icon="check" content="Test content" />
    )
    const wrapper = container.firstChild
    const iconWrapper = wrapper.firstChild
    const text = getByText("Test content")

    expect(wrapper).toBeInTheDocument()
    expect(iconWrapper).toBeInTheDocument()
    expect(text).toBeInTheDocument()

    expect(wrapper).toHaveStyleRule("display", "flex")
    expect(wrapper).toHaveStyleRule("align-items", "center")
    expect(wrapper).toHaveStyleRule("margin", "0 0 2rem")
    expect(wrapper).toHaveStyleRule("color", colours.darkBlue)

    expect(iconWrapper).toHaveStyleRule("margin-right", "1rem")
    expect(iconWrapper).toHaveStyleRule("display", "flex")
    expect(iconWrapper).toHaveStyleRule("align-items", "center")
    expect(iconWrapper).toHaveStyleRule("justify-content", "center")

    expect(text).toHaveStyleRule("font-size", "1.6rem")
    expect(text).toHaveStyleRule("transition", "color 0.2s linear")
  })
  test("With children instead of with the contact prop", () => {
    const { getByTestId } = renderWithTheme(
      <IconWithText icon="check">
        <p data-testid="test-child">TEST</p>
      </IconWithText>
    )
    const text = getByTestId("test-child")
    expect(text).toHaveTextContent("TEST")
  })
})
