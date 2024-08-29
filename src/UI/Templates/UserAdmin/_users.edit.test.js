import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { waitFor, within, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { api } from "@4cplatform/elements/Api/fetchData"
import { Container } from "@4cplatform/elements/Atoms"
import { H1 } from "@4cplatform/elements/Typography"
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Helpers
import { Providers, fakeApiUrl, fakeTitlesResponse } from "../../Helpers"

// Components
import UserAdmin, { UsersPanel } from "."
import StoryUsersProvider from "./story/users.story.provider"

const TestComponent = props => (
  <Providers>
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
  test("Editing a user", async () => {
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)

    const { getByTestId, getByText } = renderWithTheme(<TestComponent />)

    const selectUser = getByTestId("users-table-actions_button_0")
    const panel = getByTestId("users_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectUser)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    // Edit User form
    userEvent.click(getByText("Edit user"))
    const editUserForm = getByTestId("users-edit_user")

    await waitFor(() => {
      // Panel should be wide
      expect(panel).toHaveStyleRule("right", "-1rem")

      // Edit user form should be visible
      expect(editUserForm).toBeInTheDocument()

      // Fields should be prepopulated
      expect(within(editUserForm).getByTestId("first_name-input").value).toBe("James")
      expect(within(editUserForm).getByTestId("middle_names-input").value).toBe("Tiberius")
      expect(within(editUserForm).getByTestId("last_name-input").value).toBe("Kirk")
    })

    // Submit button and validation error
    fireEvent.change(within(editUserForm).getByTestId("title-select"), {
      target: { value: "" }
    })
    expect(within(editUserForm).getByTestId("title-select").value).toBe("")

    const submit = within(editUserForm).getByText("Save")
    userEvent.click(submit)
    await waitFor(() => {
      expect(getByTestId("title-select-trailing_icon")).toHaveStyleRule("fill", colours.red, {
        modifier: "svg path"
      })
    })
  })
})
