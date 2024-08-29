/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import DealCodeAdmin, { DealCodesPanel } from "."
import StoryDealCodesProvider from "./story/deals.story.provider"

// Helpers
import { fakeSelfServiceResponse, Providers } from "../../Helpers"

const TestComponent = ({ value = {}, user, canAccess, ...props }) => (
  <Providers user={user} canAccess={canAccess}>
    <StoryDealCodesProvider value={value}>
      <Container style={{ position: "static" }}>
        <DealCodeAdmin {...props} />
      </Container>
      <DealCodesPanel {...props} />
    </StoryDealCodesProvider>
  </Providers>
)

describe("<DealCodeAdmin />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container } = renderWithTheme(<TestComponent />)
    const search = getByTestId("search_deal_codes-input")
    const selectDealCode = getByTestId("deal_codes-table-actions_button_0")
    const actions = getByTestId("deal_codes-actions-wrapper")
    const addDealCode = getByTestId("add_deal_code-button")

    // Assert
    expect(search).toBeInTheDocument()
    expect(selectDealCode).toBeInTheDocument()

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "flex-end")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "1rem")

    expect(addDealCode).toHaveStyleRule("height", "5rem")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Selecting and deselecting a deal code", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)

    const selectDealCode = getByTestId("deal_codes-table-actions_button_0")
    const panel = getByTestId("deal_codes_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectDealCode)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the code's information
      expect(within(panel).getAllByText("Deal Code name").length).toBe(1)
      expect(within(panel).getAllByText("Aviva").length).toBe(1)
      expect(within(panel).getAllByText("03492").length).toBe(1)
      expect(within(panel).getAllByText("PMI").length).toBe(1)
      expect(within(panel).getAllByText("Active").length).toBe(1)
      expect(
        within(panel).getAllByText(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ).length
      ).toBe(1)
    })

    userEvent.click(selectDealCode)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
  test("Editing a deal code", async () => {
    const mockSubmit = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent value={{ onUpdateDealCodeSubmit: mockSubmit }} />
    )
    const selectDealCode = getByTestId("deal_codes-table-actions_button_0")
    const panel = getByTestId("deal_codes_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectDealCode)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    // Edit User form
    userEvent.click(getByText("Edit Deal Code"))
    const editDealCodesForm = getByTestId("deal_codes-edit_deal_codes")

    await waitFor(() => {
      // Panel should be wide
      expect(panel).toHaveStyleRule("right", "-1rem")

      // Edit user form should be visible
      expect(editDealCodesForm).toBeInTheDocument()

      expect(within(editDealCodesForm).getByTestId("description-textarea").value).toBe(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      )
    })

    // Submission
    const submit = within(editDealCodesForm).getByText("Save")
    userEvent.click(submit)
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1)
    })
  })
  test("Editing a deal code as Support admin", async () => {
    const user = JSON.parse(JSON.stringify(fakeSelfServiceResponse))
    user.data.role.name = "SUPPORT_ADMIN"
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent user={user} canAccess={roles => roles.includes(user.data.role.name)} />
    )
    const selectDealCode = getByTestId("deal_codes-table-actions_button_0")
    const panel = getByTestId("deal_codes_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectDealCode)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    // Edit User form
    userEvent.click(getByText("Edit Deal Code"))
    await waitFor(() => {
      // Panel should be wide
      expect(panel).toHaveStyleRule("right", "-1rem")
      expect(() => getByText("Delete Deal Code")).toThrowError()
    })
  })
})
