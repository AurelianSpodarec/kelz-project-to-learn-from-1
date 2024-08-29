/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import MockAdapter from "axios-mock-adapter"
import { api } from "@4cplatform/elements/Api/fetchData"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"
import { Providers, fakeApiUrl, fakeTitlesResponse } from "../../Helpers"

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

const TestComponent = () => <p>Test Component</p>

describe("<Page />", () => {
  test("Basic styles and appearance", () => {
    const { getByText, getByTestId, container } = renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <TestComponent />
      </Providers>
    )
    const header = getByTestId("test-header")
    const footer = getByTestId("test-footer")
    const content = getByTestId("test-content")
    const page = getByTestId("test-page")
    const text = getByText("Test Component")

    // Expect everything to be there
    expect(text).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
    expect(content).toBeInTheDocument()

    // Expect wrapped component to be rendered
    expect(page).toBeInTheDocument()

    // Visual styling
    expect(page).toHaveStyleRule("background-color", colours.darkBlue)
    expect(page).toHaveStyleRule("margin", "0")
    expect(page).toHaveStyleRule("padding", "0")
    expect(page).toHaveStyleRule("display", "flex")
    expect(page).toHaveStyleRule("flex-flow", "row wrap")
    expect(page).toHaveStyleRule("height", "100vh")
    expect(page).toHaveStyleRule("width", "100vw")

    expect(header).toHaveStyleRule("height", "7rem")
    expect(header).toHaveStyleRule("position", "absolute", { modifier: ":after" })
    expect(header).toHaveStyleRule(
      "background",
      `linear-gradient(45deg,rgba(255,255,255,0) 0%,${colours.tints.primary.blue.t20} 50%,${colours.blue} 100%)`,
      { modifier: ":after" }
    )
    expect(header).toHaveStyleRule("height", "0.4rem", { modifier: ":after" })
    expect(header).toHaveStyleRule("width", "calc(100vw - 7rem)", { modifier: ":after" })
    expect(header).toHaveStyleRule("right", "0rem", { modifier: ":after" })

    expect(footer).toHaveStyleRule("height", "7rem")
    expect(footer).toHaveStyleRule("position", "absolute", { modifier: ":before" })
    expect(footer).toHaveStyleRule(
      "background",
      `linear-gradient(45deg,rgba(255,255,255,0) 0%,${colours.tints.primary.blue.t20} 50%,${colours.blue} 100%)`,
      { modifier: ":before" }
    )
    expect(footer).toHaveStyleRule("height", "0.4rem", { modifier: ":before" })
    expect(footer).toHaveStyleRule("width", "calc(100vw - 7rem)", { modifier: ":before" })
    expect(footer).toHaveStyleRule("right", "0rem", { modifier: ":before" })

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Self Service links", () => {
    const { getByTestId } = renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <TestComponent />
      </Providers>
    )
    const selfServiceWrapper = getByTestId("self-service-wrapper")
    const userWrapper = getByTestId("user_info-wrapper")
    const avatar = getByTestId("self-service-avatar-wrapper")
    const name = getByTestId("self-service-name")
    const email = getByTestId("self-service-email")
    const notificationsWrapper = getByTestId("self-service-notifications")
    const iconWrapper = getByTestId("self-service-icon")
    const logoutButton = getByTestId("logout-button")

    // Everything should be in the document
    expect(selfServiceWrapper).toBeInTheDocument()
    expect(userWrapper).toBeInTheDocument()
    expect(avatar).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(notificationsWrapper).toBeInTheDocument()
    expect(iconWrapper).toBeInTheDocument()
    expect(logoutButton).toBeInTheDocument()

    // Text content should be pulled from the Auth Provider
    expect(name).toHaveTextContent("System Admin")
    expect(email).toHaveTextContent("system.admin@usaycompare.com")
    // Styles
    expect(selfServiceWrapper).toHaveStyleRule("display", "flex")

    expect(userWrapper).toHaveStyleRule("display", "flex")
    expect(userWrapper).toHaveStyleRule("justify-content", "center")
    expect(userWrapper).toHaveStyleRule("padding-right", "1rem")
    expect(userWrapper).toHaveStyleRule("position", "relative")
    expect(userWrapper).toHaveStyleRule("cursor", "pointer")
    expect(userWrapper).toHaveStyleRule("text-decoration", "none")
    expect(userWrapper).toHaveStyleRule("text-decoration", "none", { modifier: ":hover" })
    expect(userWrapper).toHaveStyleRule("text-decoration", "none", { modifier: ":focus" })
    expect(userWrapper).toHaveStyleRule("content", '""', { modifier: "::after" })
    expect(userWrapper).toHaveStyleRule("position", "absolute", { modifier: "::after" })
    expect(userWrapper).toHaveStyleRule("width", "0.1rem", { modifier: "::after" })
    expect(userWrapper).toHaveStyleRule("height", "4rem", { modifier: "::after" })
    expect(userWrapper).toHaveStyleRule("background", colours.tints.secondary.darkBlue.t10, {
      modifier: "::after"
    })
    expect(userWrapper).toHaveStyleRule("right", "0", { modifier: "::after" })

    expect(name).toHaveStyleRule("color", colours.white)
    expect(name).toHaveStyleRule("font-size", "1.4rem")
    expect(name).toHaveStyleRule("letter-spacing", "0")
    expect(name).toHaveStyleRule("line-height", "1.7rem")
    expect(name).toHaveStyleRule("margin", "0")

    expect(email).toHaveStyleRule("color", colours.tints.secondary.darkBlue.t50)
    expect(email).toHaveStyleRule("font-size", "1.3rem")
    expect(email).toHaveStyleRule("line-height", "2rem")
    expect(email).toHaveStyleRule("margin", "0")

    expect(notificationsWrapper).toHaveStyleRule("height", "100%")
    expect(notificationsWrapper).toHaveStyleRule("width", "4rem")
    expect(notificationsWrapper).toHaveStyleRule("display", "flex")
    expect(notificationsWrapper).toHaveStyleRule("align-items", "center")
    expect(notificationsWrapper).toHaveStyleRule("justify-content", "center")

    expect(iconWrapper).toHaveStyleRule("font-size", "3rem")
    expect(iconWrapper).toHaveStyleRule("height", "4rem")
    expect(iconWrapper).toHaveStyleRule("width", "4rem")
    expect(iconWrapper).toHaveStyleRule("display", "flex")
    expect(iconWrapper).toHaveStyleRule("align-items", "center")
    expect(iconWrapper).toHaveStyleRule("justify-content", "center")
  })

  test("Loading titles", () => {
    const mockSubmit = jest.fn()
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(() => {
      mockSubmit()
      return [200, fakeTitlesResponse]
    })

    renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <TestComponent />
      </Providers>
    )

    expect(mockSubmit).toHaveBeenCalled()
    expect(localStorage.getItem("usay-titles-store")).not.toBe(null)
  })
})
