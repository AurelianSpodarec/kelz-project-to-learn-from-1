import React from "react"
import "jest-styled-components"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Component
import Breadcrumbs from "."

describe("<Breadcrumbs />", () => {
  test("Basic styling", () => {
    const { getByTestId, getByText, container, getAllByTestId } = renderWithTheme(
      <Breadcrumbs
        trail={[
          { label: "Home", link: "https://www.google.co.uk" },
          { label: "Previous page", link: "/previous-page" },
          { label: "Current page" }
        ]}
      />
    )
    const a = getByTestId("Home")
    const link = getByTestId("Previous page")
    const current = getByText("Current page")

    // All links should be in the document
    expect(a).toBeInTheDocument()
    expect(link).toBeInTheDocument()
    expect(current).toBeInTheDocument()

    // Anchor tag should have Item styles
    expect(a).toHaveStyleRule("display", "flex")
    expect(a).toHaveStyleRule("align-items", "center")
    expect(a).toHaveStyleRule("height", "100%")
    expect(a).toHaveStyleRule("font-size", "1.6rem")
    expect(a).toHaveStyleRule("font-weight", "normal")
    expect(a).toHaveStyleRule("letter-spacing", "0")
    expect(a).toHaveStyleRule("text-decoration", "none")
    expect(a).toHaveStyleRule("color", colours.blue, { modifier: "a" })
    expect(a).toHaveStyleRule("transition", "color 0.3s linear", { modifier: "a" })

    // Link tag should have Item styles
    expect(link).toHaveStyleRule("display", "flex")
    expect(link).toHaveStyleRule("align-items", "center")
    expect(link).toHaveStyleRule("height", "100%")
    expect(link).toHaveStyleRule("font-size", "1.6rem")
    expect(link).toHaveStyleRule("font-weight", "normal")
    expect(link).toHaveStyleRule("letter-spacing", "0")
    expect(link).toHaveStyleRule("text-decoration", "none")
    expect(link).toHaveStyleRule("color", colours.blue, { modifier: "a" })
    expect(link).toHaveStyleRule("transition", "color 0.3s linear", { modifier: "a" })

    // Current page should not have relevant anchor or link styles
    expect(current).not.toHaveStyleRule("color", colours.blue)

    // There should be two dividers
    expect(getAllByTestId("breadcrumb-divider").length).toBe(2)

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("No trail case", () => {
    const { container } = renderWithTheme(
      <>
        <Breadcrumbs trail={[]} />
        <p>Test content</p>
      </>
    )

    // First and only child should be the p tag
    expect(container.firstChild).toHaveTextContent("Test content")
    expect(container.firstChild).toEqual(container.lastChild)
  })
})
