import React from "react"
import "jest-styled-components"
import { Router } from "react-router-dom"
import { createBrowserHistory } from "history"
import { shade } from "polished"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"
import { testDash } from "../../Helpers"

// Component
import Dashboard from "./dashboard"

describe("<Dashboard />", () => {
  test("Basic styles and appearance", () => {
    const { container, getByText, getByTestId } = renderWithTheme(
      <Router history={createBrowserHistory()}>
        <Dashboard dashboard={testDash} />
      </Router>
    )

    // Every category should be present on the dash
    testDash.forEach(category => {
      const { title, links, colour } = category
      const catContainer = getByTestId(`dash-category-${title.toLowerCase()}`)

      expect(catContainer).toHaveStyleRule("flex", "1")

      // Test basic styles and hover state for each category's card type
      expect(getByText(title)).toBeInTheDocument()
      expect(catContainer.lastChild).toHaveStyleRule("background", colour)
      expect(catContainer.lastChild).toHaveStyleRule("text-decoration", "none")
      expect(catContainer.lastChild).toHaveStyleRule("display", "block")
      expect(catContainer.lastChild).toHaveStyleRule("color", colours.white)
      expect(catContainer.lastChild).toHaveStyleRule("padding", "1.1rem")
      expect(catContainer.lastChild).toHaveStyleRule("margin-bottom", "1rem")
      expect(catContainer.lastChild).toHaveStyleRule("box-shadow", "0 0 10px 0 rgba(0,34,43,0.05)")
      expect(catContainer.lastChild).toHaveStyleRule("border-radius", "0.3rem")
      expect(catContainer.lastChild).toHaveStyleRule("text-decoration", "none", {
        modifier: ":hover"
      })
      expect(catContainer.lastChild).toHaveStyleRule("background", shade(0.2, colour), {
        modifier: ":hover"
      })

      // Every link should be present on the dash
      links.forEach(link => {
        const { title: linkTitle } = link
        expect(getByText(linkTitle)).toBeInTheDocument()
      })
    })

    // Test snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
})
