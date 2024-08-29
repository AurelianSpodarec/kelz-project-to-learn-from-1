/* eslint-disable react/prop-types */
import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import { api } from "@4cplatform/elements/Api/fetchData"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { createMemoryHistory } from "history"
import userEvent from "@testing-library/user-event"
import { Router } from "react-router-dom"

// Helpers
import {
  Providers,
  fakeApiUrl,
  fakeTitlesResponse,
  fakeRolesResponse,
  fakeUsersPostResponse
} from "../../UI/Helpers"

// Components
import UserAdd from "."

const fakeError = {
  message: "test"
}

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

const TestComponent = ({ ...rest }) => (
  <Providers mockAxios={mockAxios} {...rest}>
    <UserAdd />
  </Providers>
)

describe("<UserAdd />", () => {
  test("All components present", async () => {
    const { getByText, queryAllByText, getByTestId } = await renderWithTheme(<TestComponent />)
    // Check Breadcrumbs
    expect(getByText("Dashboard")).toBeInTheDocument()
    expect(getByText("Users")).toBeInTheDocument()
    expect(queryAllByText("Add user").length).toBe(3)
    // Check field labels
    expect(getByText("Title")).toBeInTheDocument()
    expect(getByText("First name")).toBeInTheDocument()
    expect(getByText("Middle names")).toBeInTheDocument()
    expect(getByText("Last name")).toBeInTheDocument()
    expect(getByText("Email address")).toBeInTheDocument()
    expect(getByText("Role")).toBeInTheDocument()
    // Check submit button
    expect(getByTestId("create_user-button")).toBeInTheDocument()
  })

  test("Form submission", async () => {
    // Mock requests
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    mockAxios.onGet(`${fakeApiUrl}/roles`).replyOnce(200, fakeRolesResponse)
    mockAxios.onPost(`${fakeApiUrl}/users`).replyOnce(200, fakeUsersPostResponse)

    const history = createMemoryHistory()
    history.push("/users/add")

    await waitFor(() => {
      expect(history.location.pathname).toContain("/users/add")
    })

    const { getByTestId, queryByTestId, getByText } = renderWithTheme(
      <Router history={history}>
        <TestComponent />
      </Router>
    )
    const button = getByTestId("create_user-button")

    // Wait for Titles to finish loading
    await waitFor(() => {
      expect(getByText("Mr")).toBeInTheDocument()
    })

    const testValues = {
      title: "MR",
      first_name: "Test",
      middle_names: "M",
      last_name: "Testington",
      email: "test@gmail.com",
      role: "SYS_ADMIN",
      simulation_mode: null,
      parent_id: null
    }

    // Put all values into component state
    const formValues = Object.keys(testValues)
    formValues.forEach(async key => {
      const field = queryByTestId(`${key}-select`) || queryByTestId(`${key}-input`)
      if (!field) return
      fireEvent.change(field, { target: { value: testValues[key] } })
      await waitFor(() => {
        expect(field.value).toBe(testValues[key])
      })
    })

    // Click the button
    userEvent.click(button)
    await waitFor(() => {
      expect(getByText("User was successfully created")).toBeInTheDocument()
    })
  })

  test("Form error", async () => {
    // Mock requests
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    mockAxios.onGet(`${fakeApiUrl}/roles`).replyOnce(200, fakeRolesResponse)
    mockAxios.onPost(`${fakeApiUrl}/users`).replyOnce(500, fakeError)

    const history = createMemoryHistory()
    history.push("/users/add")

    const { getByTestId, queryByTestId, getByText } = renderWithTheme(
      <Router history={history}>
        <TestComponent />
      </Router>
    )
    const button = getByTestId("create_user-button")

    // Wait for Titles to finish loading
    await waitFor(() => {
      expect(getByText("Mr")).toBeInTheDocument()
    })

    const testValues = {
      title: "MR",
      first_name: "Test",
      middle_names: "M",
      last_name: "Testington",
      email: "test@gmail.com",
      role: "SYS_ADMIN",
      simulation_mode: null,
      parent_id: null
    }

    // Put all values into component state
    const formValues = Object.keys(testValues)
    formValues.forEach(async key => {
      const field = queryByTestId(`${key}-select`) || queryByTestId(`${key}-input`)
      if (!field) return
      fireEvent.change(field, { target: { value: testValues[key] } })
      await waitFor(() => {
        expect(field.value).toBe(testValues[key])
      })
    })

    // Click the button
    userEvent.click(button)
    await waitFor(() => {
      expect(
        getByText("There was an error creating the user - status 500, test")
      ).toBeInTheDocument()
    })
  })

  test("Back-end validation error", async () => {
    // Mock requests
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    mockAxios.onGet(`${fakeApiUrl}/roles`).replyOnce(200, fakeRolesResponse)
    mockAxios.onPost(`${fakeApiUrl}/users`).replyOnce(422, {
      message: "VALIDATION_FAILED",
      validation: { email: ["NOT_UNIQUE"] }
    })

    const history = createMemoryHistory()
    history.push("/users/add")

    const { getByTestId, queryByTestId, getByText } = renderWithTheme(
      <Router history={history}>
        <TestComponent />
      </Router>
    )
    const button = getByTestId("create_user-button")

    // Wait for Titles to finish loading
    await waitFor(() => {
      expect(getByText("Mr")).toBeInTheDocument()
    })

    const testValues = {
      title: "MR",
      first_name: "Test",
      middle_names: "M",
      last_name: "Testington",
      email: "test@gmail.com",
      role: "SYS_ADMIN",
      simulation_mode: null,
      parent_id: null
    }

    // Put all values into component state
    const formValues = Object.keys(testValues)
    formValues.forEach(async key => {
      const field = queryByTestId(`${key}-select`) || queryByTestId(`${key}-input`)
      if (!field) return
      fireEvent.change(field, { target: { value: testValues[key] } })
      await waitFor(() => {
        expect(field.value).toBe(testValues[key])
      })
    })

    // Click the button
    userEvent.click(button)
    await waitFor(() => {
      expect(getByTestId("email-error-message").textContent.includes("NOT_UNIQUE")).toBe(true)
    })
  })
})
