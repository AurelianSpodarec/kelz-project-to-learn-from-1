import React from "react"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Component
import Timeline from "."

describe("<Timeline />", () => {
  test("Basic styles and appearance", () => {
    const mockOnClick = jest.fn()
    const { getByTestId, getByText, container } = renderWithTheme(
      <Timeline
        name="jest"
        events={[
          {
            id: 1,
            content: "Test content 1",
            icon: "check",
            iconColour: colours.green,
            date: "2018-02-10T09:30Z"
          },
          {
            id: 2,
            content: "Interactive Item",
            icon: "plus",
            iconColour: colours.darkBlue,
            date: "2018-05-10T09:30Z",
            onClick: mockOnClick,
            buttonIcon: "file-cog-outline"
          },
          {
            id: 3,
            content: "Last Item",
            icon: "alert",
            colour: colours.darkBlue,
            iconColour: colours.orange,
            date: "2018-06-10T09:30Z"
          }
        ]}
      />
    )
    const wrapper = getByTestId("jest-timeline-wrapper")
    const eventWrapper = getByTestId("jest-timeline-event_wrapper_0")
    const lastEventWrapper = getByTestId("jest-timeline-event_wrapper_2")
    const content = getByText("Test content 1")
    const interactiveContent = getByTestId("jest-timeline-button_1")

    expect(wrapper).toHaveStyleRule("margin", "0 0 2rem")

    expect(eventWrapper).toHaveStyleRule("padding", "0 0 3rem 2rem")
    expect(eventWrapper).toHaveStyleRule("position", "relative")
    expect(eventWrapper).toHaveStyleRule("border-left", `2px solid ${colours.darkBlue}`)

    expect(lastEventWrapper).not.toHaveStyleRule("border-left", `2px solid ${colours.darkBlue}`)

    expect(content).toHaveStyleRule("margin", "0")
    expect(content).toHaveStyleRule("font-size", "1.4rem")
    expect(content).toHaveStyleRule("line-height", "1.9rem")
    expect(content).toHaveStyleRule("font-weight", "thin")
    expect(content).toHaveStyleRule("color", colours.white)

    expect(interactiveContent).toHaveStyleRule("margin", "0")
    expect(interactiveContent).toHaveStyleRule("padding", "0")
    expect(interactiveContent).toHaveStyleRule("display", "flex")
    expect(interactiveContent).toHaveStyleRule("align-items", "center")
    expect(interactiveContent).toHaveStyleRule("font-size", "1.4rem")
    expect(interactiveContent).toHaveStyleRule("line-height", "1.9rem")
    expect(interactiveContent).toHaveStyleRule("color", colours.white)
    expect(interactiveContent).toHaveStyleRule("border", "none")
    expect(interactiveContent).toHaveStyleRule("background", "transparent")
    expect(interactiveContent).toHaveStyleRule("cursor", "pointer")
    expect(interactiveContent).toHaveStyleRule("text-decoration", "underline")
    expect(interactiveContent).toHaveStyleRule("font-weight", "bold")

    expect(container.firstChild).toMatchSnapshot()
  })
  test("Interactive behaviour", async () => {
    const mockOnClick = jest.fn()
    const { getByTestId } = renderWithTheme(
      <Timeline
        name="jest"
        events={[
          {
            id: 1,
            content: "Test content 1",
            icon: "check",
            iconColour: colours.green,
            date: "2018-02-10T09:30Z"
          },
          {
            id: 2,
            content: "Interactive Item",
            icon: "plus",
            iconColour: colours.darkBlue,
            date: "2018-05-10T09:30Z",
            onClick: mockOnClick,
            buttonIcon: "file-cog-outline"
          },
          {
            id: 3,
            content: "Last Item",
            icon: "alert",
            colour: colours.darkBlue,
            iconColour: colours.orange,
            date: "2018-06-10T09:30Z"
          }
        ]}
      />
    )
    const button = getByTestId("jest-timeline-button_1")

    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(1)
      expect(mockOnClick).toHaveBeenCalledWith(2)
    })
  })
})
