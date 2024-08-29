import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"
import { fakeDealCodesGetResponse } from "../../../../Helpers"

import DealCodeAssignment from "."
import StoryAgencyCodesProvider from "../../AgencyCodeAdmin/story/agencyCodes.story.provider"

describe("<DealCodeAssignment />", () => {
  test("Basic styles and appearance", () => {
    const { getByTestId, getByText, container } = renderWithTheme(
      <StoryAgencyCodesProvider>
        <DealCodeAssignment />
      </StoryAgencyCodesProvider>
    )
    const card1 = getByTestId("deal_code_assignment-card-0")
    const card2 = getByTestId("deal_code_assignment-card-1")
    const button1 = getByTestId("deal_code_assignment-view_button-0")

    expect(card1).toBeInTheDocument()
    expect(card2).toBeInTheDocument()

    expect(card1).toHaveStyleRule("background", colours.white)
    expect(card1).toHaveStyleRule("border-radius", "0.5rem")
    expect(card1).toHaveStyleRule("padding", "1.5rem")
    expect(card1).toHaveStyleRule("display", "flex")
    expect(card1).toHaveStyleRule("justify-content", "space-between")
    expect(card1).toHaveStyleRule("align-items", "center")
    expect(card1).toHaveStyleRule("margin-bottom", "1rem")

    expect(button1).toBeInTheDocument()

    expect(button1).toHaveStyleRule("margin", "0 0 0 1rem")
    expect(button1).toHaveStyleRule("padding", "0")
    expect(button1).toHaveStyleRule("border", "none")
    expect(button1).toHaveStyleRule("background", "transparent")
    expect(button1).toHaveStyleRule("cursor", "pointer")

    expect(getByText("Deal Code name")).toBeInTheDocument()
    expect(getByText("03492")).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
  test("View button", async () => {
    const { getByTestId, getByText } = renderWithTheme(
      <StoryAgencyCodesProvider>
        <DealCodeAssignment />
      </StoryAgencyCodesProvider>
    )
    const button1 = getByTestId("deal_code_assignment-view_button-0")

    userEvent.click(button1)
    await waitFor(() => {
      expect(getByText("Manage deal code")).toBeInTheDocument()
      expect(getByText("Not Suspended")).toBeInTheDocument()
      expect(
        getByText(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        )
      ).toBeInTheDocument()
      expect(getByText("Suspend")).toBeInTheDocument()
      expect(getByText("Unassign")).toBeInTheDocument()
    })
  })
  test("onSuspend", async () => {
    const mockOnSuspend = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <StoryAgencyCodesProvider value={{ onSuspendDealCode: mockOnSuspend }}>
        <DealCodeAssignment />
      </StoryAgencyCodesProvider>
    )
    const button1 = getByTestId("deal_code_assignment-view_button-0")

    userEvent.click(button1)
    await waitFor(() => {
      expect(getByText("Suspend")).toBeInTheDocument()
    })

    userEvent.click(getByText("Suspend"))
    await waitFor(() => {
      expect(getByText("Yes")).toBeInTheDocument()
      expect(getByText("Confirm suspension")).toBeInTheDocument()
      expect(getByText("Are you sure you want to suspend this deal code?")).toBeInTheDocument()
    })

    userEvent.click(getByText("Yes"))
    await waitFor(() => {
      expect(mockOnSuspend).toHaveBeenCalledTimes(1)
      expect(mockOnSuspend).toHaveBeenCalledWith(get(fakeDealCodesGetResponse, "data[0]"))
    })
  })
  test("onReinstate", async () => {
    const mockOnReinstate = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <StoryAgencyCodesProvider
        value={{
          onReinstateDealCode: mockOnReinstate,
          assignedDealCodes: [{ ...get(fakeDealCodesGetResponse, "data[0]", {}), suspended: true }]
        }}
      >
        <DealCodeAssignment />
      </StoryAgencyCodesProvider>
    )
    const button1 = getByTestId("deal_code_assignment-view_button-0")

    userEvent.click(button1)
    await waitFor(() => {
      expect(getByText("Reinstate")).toBeInTheDocument()
    })

    userEvent.click(getByText("Reinstate"))
    await waitFor(() => {
      expect(getByText("Yes")).toBeInTheDocument()
      expect(getByText("Confirm reinstatement")).toBeInTheDocument()
      expect(getByText("Are you sure you want to reinstate this deal code?")).toBeInTheDocument()
    })
    userEvent.click(getByText("Yes"))
    await waitFor(() => {
      expect(mockOnReinstate).toHaveBeenCalledTimes(1)
    })
  })
  test("onUnassign", async () => {
    const mockOnUnassign = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <StoryAgencyCodesProvider value={{ onUnassignDealCode: mockOnUnassign }}>
        <DealCodeAssignment />
      </StoryAgencyCodesProvider>
    )
    const button1 = getByTestId("deal_code_assignment-view_button-0")

    userEvent.click(button1)
    await waitFor(() => {
      expect(getByText("Unassign")).toBeInTheDocument()
    })

    userEvent.click(getByText("Unassign"))
    await waitFor(() => {
      expect(getByText("Yes")).toBeInTheDocument()
      expect(getByText("Confirm unassignment")).toBeInTheDocument()
      expect(getByText("Are you sure you want to unassign this deal code?")).toBeInTheDocument()
    })
    userEvent.click(getByText("Yes"))
    await waitFor(() => {
      expect(mockOnUnassign).toHaveBeenCalledTimes(1)
      expect(mockOnUnassign).toHaveBeenCalledWith(get(fakeDealCodesGetResponse, "data[0]"))
    })
  })
})
