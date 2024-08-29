/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from "react"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"
import { Providers } from "../../Helpers"
import { duration } from "./panel.animations"

// Components
import { PageContext } from "../../Organisms"
import FlyOutPanel, { PanelHeader } from "."

describe("<FlyOutPanel />", () => {
  // Component setup
  const TestingComponent = props => {
    const { setPanelStatus } = React.useContext(PageContext)
    return (
      <div style={{ height: "50rem" }}>
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 14rem)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <button onClick={() => setPanelStatus("open")} data-testid="jest-button-open_panel">
            Open Panel
          </button>
          <button onClick={() => setPanelStatus("wide")} data-testid="jest-button-wide_panel">
            Open Wide
          </button>
          <button onClick={() => setPanelStatus("closed")} data-testid="jest-button-close_panel">
            Force Closed
          </button>
        </div>
        <FlyOutPanel
          name="jest"
          body={() => (
            <>
              <PanelHeader>
                <h1>This is Panel Header content.</h1>
              </PanelHeader>
              <h1>This is Panel Content.</h1>
            </>
          )}
          wideBody={() => (
            <>
              <h1>This is Wide Body Content.</h1>
            </>
          )}
          setPanel={props.setPanelStatus}
          statusControls={props.panelStatusControls}
        />
      </div>
    )
  }

  test("Basic styling", () => {
    const { getByTestId, container } = renderWithTheme(
      <Providers>
        <TestingComponent />
      </Providers>
    )
    const panel = getByTestId("jest-flyout_panel-wrapper")

    // Panel wrapper styles
    expect(panel).toBeInTheDocument()
    expect(panel).toHaveStyleRule("width", "80rem")
    expect(panel).toHaveStyleRule("position", "absolute")
    expect(panel).toHaveStyleRule("top", "7rem")
    expect(panel).toHaveStyleRule("z-index", "3")
    expect(panel).toHaveStyleRule("height", "calc(100% - 14rem)")
    expect(panel).toHaveStyleRule(
      "background",
      "linear-gradient(180deg,#21879a 0%,#197da4 39.8%,#4a6db1 100%)"
    )
    expect(panel).toHaveStyleRule("color", colours.white)
    expect(panel).toHaveStyleRule("right", "-80rem")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Panel interactive behavior", async () => {
    const { getByTestId } = renderWithTheme(
      <Providers>
        <TestingComponent />
      </Providers>
    )
    const panel = getByTestId("jest-flyout_panel-wrapper")
    const openButton = getByTestId("jest-button-open_panel")
    const content = getByTestId("test-content")
    const overlay = getByTestId("test-page-overlay")

    let body
    let closeButton
    let openWide

    // Closed > Open
    userEvent.click(openButton)
    await waitFor(() => {
      body = getByTestId("jest-flyout_panel-body_wrapper")
      closeButton = getByTestId("jest-flyout_panel-body_close")
      openWide = getByTestId("jest-button-wide_panel")

      expect(panel).toHaveStyleRule("right", "-40rem")
      expect(panel).toHaveStyleRule("animation", `jVqItg ${duration / 2}ms ease-in-out`)

      expect(overlay).toHaveStyleRule("background-color", colours.white)
      expect(overlay).toHaveStyleRule("opacity", "0.5")
    })

    let wide
    let closeWide

    // Open > Wide
    userEvent.click(openWide)
    await waitFor(() => {
      wide = getByTestId("jest-flyout_panel-wide_body_wrapper")
      closeWide = getByTestId("jest-flyout_panel-wide_close")

      expect(panel).toHaveStyleRule("right", "-1rem")

      expect(overlay).toHaveStyleRule("background-color", colours.white)
      expect(overlay).toHaveStyleRule("opacity", "0.5")

      expect(wide).toHaveStyleRule("opacity", "1")
      expect(wide).toHaveStyleRule("animation", `cjYHVW ${duration}ms ease-in-out`)
    })

    // Wide > Open
    userEvent.click(closeWide)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-40rem")

      expect(overlay).toHaveStyleRule("background-color", colours.white)
      expect(overlay).toHaveStyleRule("opacity", "0.5")

      expect(body).toHaveStyleRule("opacity", "1")
    })

    // Open > Closed
    userEvent.click(closeButton)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-40rem")
      expect(panel).toHaveStyleRule("animation", `hBlJvC ${duration}ms ease-in-out`)

      expect(content).not.toHaveStyleRule("padding-right", "40rem")
    })
  })

  test("Closed > Wide, Wide > Closed", async () => {
    const { getByTestId } = renderWithTheme(
      <Providers>
        <TestingComponent />
      </Providers>
    )
    const panel = getByTestId("jest-flyout_panel-wrapper")
    const openWide = getByTestId("jest-button-wide_panel")
    const close = getByTestId("jest-button-close_panel")

    let wide

    // Closed > Wide
    userEvent.click(openWide)
    await waitFor(() => {
      wide = getByTestId("jest-flyout_panel-wide_body_wrapper")

      expect(panel).toHaveStyleRule("right", "-1rem")
      expect(panel).toHaveStyleRule("animation", `jLXUFp ${duration / 2}ms ease-in-out`)

      expect(wide).toHaveStyleRule("opacity", "1")
    })

    // Wide > Closed
    userEvent.click(close)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-80rem")
      expect(panel).toHaveStyleRule("animation", `hSIboV ${duration / 2}ms ease-in-out`)

      expect(wide).toHaveStyleRule("opacity", "1")
    })
  })
})
