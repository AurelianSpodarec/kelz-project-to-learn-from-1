import React from "react"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createMemoryHistory } from "history"

// Helpers
import { renderWithTheme, colours, buttonThemes } from "@4cplatform/elements/Helpers"
import { renderWithMockedRouter } from "../../Helpers"

// Component
import Tabs, { Tab } from "."

describe("<Tabs />", () => {
  test("Basic styles and appearance", () => {
    const { getByTestId } = renderWithTheme(
      <Tabs defaultIndex={0}>
        <Tab header="Tab One">
          <p>This is Tab One content.</p>
        </Tab>
        <Tab header="Tab Two">
          <p>This is Tab Two content.</p>
        </Tab>
      </Tabs>
    )
    const one = getByTestId("tab-tab_one")
    const two = getByTestId("tab-tab_two")

    // Active item
    expect(one).toHaveStyleRule("margin-right", "3rem")
    expect(one.firstChild).toHaveStyleRule("cursor", "default")
    expect(one.firstChild).toHaveStyleRule("color", colours.darkBlue)
    expect(one.firstChild).toHaveStyleRule("border-bottom", `1px solid ${colours.darkBlue}`)
    expect(one.firstChild).toHaveStyleRule(
      "transition",
      "color 0.2s linear,border-bottom 0.2s linear"
    )
    expect(one.firstChild).toHaveStyleRule("text-decoration", "none", { modifier: ":hover" })
    expect(one.firstChild).toHaveStyleRule("text-decoration", "none", { modifier: ":focus" })

    // Inactive item
    expect(two).toHaveStyleRule("margin-right", "0")
    expect(two.firstChild).toHaveStyleRule(
      "transition",
      "color 0.2s linear,border-bottom 0.2s linear"
    )
    expect(two.firstChild).toHaveStyleRule("text-decoration", "none", { modifier: ":hover" })
    expect(two.firstChild).toHaveStyleRule("text-decoration", "none", { modifier: ":focus" })
  })

  test("Interactive behavior", async () => {
    const { getByTestId, getByText } = renderWithTheme(
      <Tabs defaultIndex={0}>
        <Tab header="Tab One">
          <p>This is Tab One content.</p>
        </Tab>
        <Tab header="Tab Two">
          <p>This is Tab Two content.</p>
        </Tab>
      </Tabs>
    )
    const one = getByTestId("tab-tab_one")
    const two = getByTestId("tab-tab_two")

    // One should be active
    expect(getByText("This is Tab One content.")).toBeInTheDocument()

    // After clicking the first link, 'two' should have the active state
    userEvent.click(two)
    await waitFor(() => {
      // Two is active
      expect(two.firstChild).toHaveStyleRule("cursor", "default")
      expect(two.firstChild).toHaveStyleRule("color", colours.darkBlue)
      expect(two.firstChild).toHaveStyleRule("border-bottom", `1px solid ${colours.darkBlue}`)
      expect(two.firstChild).toHaveStyleRule(
        "transition",
        "color 0.2s linear,border-bottom 0.2s linear"
      )

      // One is inactive
      expect(one.firstChild).toHaveStyleRule(
        "transition",
        "color 0.2s linear,border-bottom 0.2s linear"
      )

      expect(getByText("This is Tab Two content.")).toBeInTheDocument()
    })
  })
  test('type="buttons"', () => {
    const { getByTestId } = renderWithTheme(
      <Tabs defaultIndex={0} type="buttons">
        <Tab header="Tab One">
          <p>This is Tab One content.</p>
        </Tab>
        <Tab header="Tab Two">
          <p>This is Tab Two content.</p>
        </Tab>
      </Tabs>
    )
    const button1 = getByTestId("tab-tab_one").firstChild
    const button2 = getByTestId("tab-tab_two").firstChild

    // First button should have primary appearance
    expect(button1).toHaveTextContent("Tab One")
    expect(button1).toHaveStyleRule("border", `2px solid ${buttonThemes.primary.border}`)
    expect(button1).toHaveStyleRule("background-color", buttonThemes.primary.background)
    expect(button1).toHaveStyleRule("color", buttonThemes.primary.colour)
    expect(button1).toHaveStyleRule("border-radius", "0.3rem")
    expect(button1).toHaveStyleRule("height", "4rem")
    expect(button1).toHaveStyleRule("background-color", buttonThemes.primary.hoverBackground, {
      modifier: ":hover:not([disabled])"
    })
    expect(button1).toHaveStyleRule("border-color", buttonThemes.primary.hoverBorder, {
      modifier: ":hover:not([disabled])"
    })
    expect(button1).toHaveStyleRule("color", buttonThemes.primary.hoverColour, {
      modifier: ":hover:not([disabled])"
    })
    expect(button1).toHaveStyleRule("background-color", buttonThemes.primary.disabledBackground, {
      modifier: ":disabled"
    })
    expect(button1).toHaveStyleRule("border-color", buttonThemes.primary.disabledBorder, {
      modifier: ":disabled"
    })
    expect(button1).toHaveStyleRule("color", buttonThemes.primary.disabledColour, {
      modifier: ":disabled"
    })

    // Second button should have primaryGhost appearance
    expect(button2).toHaveTextContent("Tab Two")
    expect(button2).toHaveStyleRule("border", `2px solid ${buttonThemes.primaryGhost.border}`)
    expect(button2).toHaveStyleRule("background-color", buttonThemes.primaryGhost.background)
    expect(button2).toHaveStyleRule("color", buttonThemes.primaryGhost.colour)
    expect(button2).toHaveStyleRule("border-radius", "0.3rem")
    expect(button2).toHaveStyleRule("height", "4rem")
    expect(button2).toHaveStyleRule("background-color", buttonThemes.primaryGhost.hoverBackground, {
      modifier: ":hover:not([disabled])"
    })
    expect(button2).toHaveStyleRule("border-color", buttonThemes.primaryGhost.hoverBorder, {
      modifier: ":hover:not([disabled])"
    })
    expect(button2).toHaveStyleRule("color", buttonThemes.primaryGhost.hoverColour, {
      modifier: ":hover:not([disabled])"
    })
    expect(button2).toHaveStyleRule(
      "background-color",
      buttonThemes.primaryGhost.disabledBackground,
      {
        modifier: ":disabled"
      }
    )
    expect(button2).toHaveStyleRule("border-color", buttonThemes.primaryGhost.disabledBorder, {
      modifier: ":disabled"
    })
    expect(button2).toHaveStyleRule("color", buttonThemes.primaryGhost.disabledColour, {
      modifier: ":disabled"
    })
  })
  describe("Query controls", () => {
    test("Tabs display", async () => {
      const history = createMemoryHistory()
      history.push("/example")
      await waitFor(() => {
        expect(history.location.pathname).toContain("/example")
      })
      renderWithMockedRouter(
        () => (
          <Tabs hasQueryControls name="jest">
            <Tab header="Tab One">
              <p>This is Tab One content.</p>
            </Tab>
            <Tab header="Tab Two">
              <p>This is Tab Two content.</p>
            </Tab>
          </Tabs>
        ),
        { history }
      )

      // Loading the tabs should change the url to save the current tab
      await waitFor(() => {
        expect(`${history.location.pathname}${history.location.search}`).toEqual(
          "/example?jest=tab_one"
        )
      })

      // Changing the url should not add this to the history so that the back button does not simply remove the search query on the url
      history.goBack()
      await waitFor(() => {
        expect(`${history.location.pathname}${history.location.search}`).toContain("/")
      })
    })
    test("Changing tab", async () => {
      const history = createMemoryHistory()
      history.push("/example")
      await waitFor(() => {
        expect(history.location.pathname).toContain("/example")
      })
      const { getByTestId } = renderWithMockedRouter(
        () => (
          <Tabs hasQueryControls name="jest">
            <Tab header="Tab One">
              <p>This is Tab One content.</p>
            </Tab>
            <Tab header="Tab Two">
              <p>This is Tab Two content.</p>
            </Tab>
          </Tabs>
        ),
        { history }
      )

      // Change tab
      const tabTwo = getByTestId("tab-tab_two")
      userEvent.click(tabTwo)
      await waitFor(() => {
        expect(`${history.location.pathname}${history.location.search}`).toEqual(
          "/example?jest=tab_two"
        )
      })

      // Clicking browser back button should return to the previous tab
      history.goBack()
      await waitFor(() => {
        expect(`${history.location.pathname}${history.location.search}`).toContain(
          "/example?jest=tab_one"
        )
      })
    })

    test("URL change when child tabs component is present", async () => {
      const history = createMemoryHistory()
      history.push("/example")
      await waitFor(() => {
        expect(history.location.pathname).toContain("/example")
      })
      const { getByTestId } = renderWithMockedRouter(
        () => (
          <Tabs hasQueryControls name="jest">
            <Tab header="Tab One">
              <p>This is Tab One content.</p>
            </Tab>
            <Tab header="Tab Two">
              <Tabs hasQueryControls name="jest2">
                <Tab header="Tab 2 One">
                  <p>This is Tab One content.</p>
                </Tab>
                <Tab header="Tab 2 Two">
                  <p>This is Tab Two content.</p>
                </Tab>
              </Tabs>
            </Tab>
          </Tabs>
        ),
        { history }
      )

      // Change tab
      const tabTwo = getByTestId("tab-tab_two")
      userEvent.click(tabTwo)
      await waitFor(() => {
        expect(`${history.location.pathname}${history.location.search}`).toEqual(
          "/example?jest=tab_two&jest2=tab_2_one"
        )
      })

      // Clicking browser back button should return to the previous tab
      history.goBack()
      await waitFor(() => {
        expect(`${history.location.pathname}${history.location.search}`).toContain(
          "/example?jest=tab_one"
        )
      })
    })
  })
})
