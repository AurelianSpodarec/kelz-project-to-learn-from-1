import React from "react"
import { within } from "@testing-library/react"
import "jest-styled-components"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Component
import LabelWithText from "."

describe("<LabelWithText />", () => {
  const labelText = "Test label"
  const contentText = "Test content"
  test("Basic styles and appearance", () => {
    const { container } = renderWithTheme(<LabelWithText label={labelText} content={contentText} />)
    const wrapper = container.firstChild
    const [label, content] = wrapper.children

    expect(within(label).getByText(labelText)).toBeInTheDocument()
    expect(within(content).getByText(contentText)).toBeInTheDocument()

    expect(wrapper).toHaveStyleRule("margin", "0 0 2rem")
    expect(wrapper).toHaveStyleRule("color", colours.darkBlue)
    expect(label).toHaveStyleRule("display", "flex")
    expect(label).toHaveStyleRule("align-items", "center")

    expect(content).toHaveStyleRule("margin-top", "0.5rem")
    expect(content).toHaveStyleRule("padding-left", "1rem")

    const text = within(label).getByText(labelText)

    expect(text).toHaveStyleRule("font-size", "1.6rem")
    expect(text).toHaveStyleRule("font-weight", "bold")
    expect(text).toHaveStyleRule("color", colours.darkBlue)
  })
  test("With children instead of with the contact prop", () => {
    const { getByTestId } = renderWithTheme(
      <LabelWithText label={labelText}>
        <p data-testid="test-child">{contentText}</p>
      </LabelWithText>
    )
    const text = getByTestId("test-child")
    expect(text).toHaveTextContent(contentText)
  })
  test("Change text colour", () => {
    const colour = colours.green
    const { container } = renderWithTheme(
      <LabelWithText label={labelText} content={contentText} colour={colour} />
    )
    const [label, content] = container.firstChild.children

    expect(within(label).getByText(labelText)).toHaveStyleRule("color", colour)
    expect(within(content).getByText(contentText)).toHaveStyleRule("color", colour)
  })
  test("Change both text sizes", () => {
    const size = "3rem"
    const { container } = renderWithTheme(
      <LabelWithText label={labelText} content={contentText} textSize={size} />
    )
    const [label, content] = container.firstChild.children

    expect(within(label).getByText(labelText)).toHaveStyleRule("font-size", size)
    expect(within(content).getByText(contentText)).toHaveStyleRule("font-size", size)
  })
  test("Change just label text sizes", () => {
    const size = "3rem"
    const { container } = renderWithTheme(
      <LabelWithText label={labelText} content={contentText} labelSize={size} />
    )
    const [label, content] = container.firstChild.children

    expect(within(label).getByText(labelText)).toHaveStyleRule("font-size", size)
    expect(within(content).getByText(contentText)).toHaveStyleRule("font-size", "1.6rem")
  })
  test("Chane appearance", () => {
    const { container } = renderWithTheme(
      <LabelWithText label={labelText} content={contentText} appearance="light" />
    )
    const wrapper = container.firstChild
    const [label] = wrapper.children

    expect(wrapper).toHaveStyleRule("color", colours.white)

    const text = within(label).getByText(labelText)

    expect(text).toHaveStyleRule("color", colours.white)
  })
})
