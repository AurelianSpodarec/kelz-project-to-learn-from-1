/* eslint-disable react/prop-types */
import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { get } from "lodash"
import { waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { api } from "@4cplatform/elements/Api/fetchData"
import { Container } from "@4cplatform/elements/Atoms"
import { H1 } from "@4cplatform/elements/Typography"
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Helpers
import { fakeSelfServiceResponse, Providers } from "../../Helpers"

// Components
import UserAdmin, { UsersPanel } from "."
import StoryUsersProvider from "./story/users.story.provider"

const TestComponent = ({ user, canAccess, ...props }) => (
  <Providers user={user} canAccess={canAccess}>
    <StoryUsersProvider>
      <Container style={{ position: "static" }}>
        <H1 margin="5rem 0 2rem">User Administration</H1>
        <UserAdmin {...props} />
      </Container>
      <UsersPanel {...props} />
    </StoryUsersProvider>
  </Providers>
)

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("<UserAdmin />", () => {
  // Render
  test("Basic component and styles", () => {
    const { getByTestId, container, getByText } = renderWithTheme(<TestComponent />)
    const checkbox = getByTestId("show_deleted-checkbox")
    const search = getByTestId("search_users-input")
    const selectUser = getByTestId("users-table-actions_button_0")
    const actions = getByTestId("users-actions-wrapper")
    const addUser = getByTestId("add_user-button")

    // Assert
    expect(checkbox).toBeInTheDocument()
    expect(search).toBeInTheDocument()
    expect(selectUser).toBeInTheDocument()
    expect(addUser).toBeInTheDocument()

    expect(getByText("James")).toHaveStyleRule("color", colours.blue)
    expect(getByText("Tiberius")).toHaveStyleRule("opacity", "0.7")
    expect(getByText("Kirk")).toHaveStyleRule("color", colours.blue)
    expect(getByText("jamest@outlook.com")).toHaveStyleRule(
      "color",
      get(colours, "tints.secondary.darkBlue.t20")
    )

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "space-between")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "1rem")

    expect(addUser).toHaveStyleRule("height", "5rem")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Selecting and deselecting a user", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)

    const selectUser = getByTestId("users-table-actions_button_0")
    const panel = getByTestId("users_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectUser)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with user's information
      expect(within(panel).getAllByText("Mr James Kirk").length).toBe(1)
      expect(within(panel).getAllByText("Test Insurance Provider").length).toBe(1)
      expect(within(panel).getAllByText("Original Enterprise Network").length).toBe(1)
      expect(within(panel).getAllByText("jamest@outlook.com").length).toBe(1)
    })

    userEvent.click(selectUser)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })

  test("Selecting a User as Support admin", async () => {
    const user = fakeSelfServiceResponse
    user.data.role.name = "SUPPORT_ADMIN"
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent user={user} canAccess={roles => roles.includes(user.data.role.name)} />
    )
    const selectUser = getByTestId("users-table-actions_button_0")
    const panel = getByTestId("users_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectUser)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      expect(() => getByText("Delete user")).toThrowError()
    })
  })

  test("Filters users to be available for only system admin and support admin users", () => {
    const user = fakeSelfServiceResponse
    user.data.role.name = "SYS_ADMIN"
    const { getByTestId } = renderWithTheme(
      <TestComponent user={user} canAccess={roles => roles.includes(user.data.role.name)} />
    )
    const filterByParentType = getByTestId("filter_parent_type-select-wrapper")
    expect(filterByParentType).toBeInTheDocument()
  })
})
