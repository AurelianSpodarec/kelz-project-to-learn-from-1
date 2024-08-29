/* eslint-disable react/prop-types */
import React from "react"
import { MemoryRouter } from "react-router-dom"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import { api } from "@4cplatform/elements/Api/fetchData"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import userEvent from "@testing-library/user-event"

// Helpers
import {
  Providers,
  fakeApiUrl,
  fakeTitlesResponse,
  fakeRolesResponse,
  fakeSelfServiceResponse,
  fakeNetworksGetResponse
} from "../../Helpers"

// Component
import UserCreate from "."

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

const TestComponent = ({
  initialEntries = [{ pathname: "users/add" }],
  onSubmit = () => {},
  ...rest
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Providers mockAxios={mockAxios} {...rest}>
      <UserCreate onSubmit={onSubmit} />
    </Providers>
  </MemoryRouter>
)

describe("<UserCreate />", () => {
  test("All fields present and styled correctly", async () => {
    const { getByTestId, container } = await renderWithTheme(<TestComponent />)

    // Check the appropriate fields are present
    expect(getByTestId("title-select")).toBeInTheDocument()
    expect(getByTestId("first_name-input-field_wrapper")).toBeInTheDocument()
    expect(getByTestId("middle_names-input-field_wrapper")).toBeInTheDocument()
    expect(getByTestId("last_name-input-field_wrapper")).toBeInTheDocument()
    expect(getByTestId("email-input-field_wrapper")).toBeInTheDocument()
    expect(getByTestId("role-select-outer_wrapper")).toBeInTheDocument()
    expect(() => getByTestId("parent_id-input")).toThrowError()

    // Check submit button
    expect(getByTestId("create_user-button")).toBeInTheDocument()

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("onSubmit prop", async () => {
    // Mock requests
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    mockAxios.onGet(`${fakeApiUrl}/roles`).replyOnce(200, fakeRolesResponse)
    mockAxios.onGet(`${fakeApiUrl}/networks`).replyOnce(200, fakeNetworksGetResponse)

    const mockOnSubmit = jest.fn()

    const user = {
      ...fakeSelfServiceResponse.data,
      id: 1,
      slug: "system-admin",
      parent: null,
      role: {
        id: 9,
        name: "SYS_ADMIN"
      }
    }

    const { getByText, getByTestId, queryByTestId } = await renderWithTheme(
      <TestComponent
        initialEntries={[{ pathname: "/users/add" }]}
        onSubmit={mockOnSubmit}
        mockAxios={mockAxios}
        canAccess={roles => roles.includes(user.role.name)}
        user={{ data: user }}
      />
    )

    const button = getByTestId("create_user-button")

    // Wait for Titles to finish loading
    await waitFor(() => {
      expect(getByText("Mr")).toBeInTheDocument()
    })

    // Form validation prevents onSubmit from firing until values are in
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(0)
    })

    const testValues = {
      title: "MR",
      first_name: "Test",
      middle_names: "M",
      last_name: "Testington",
      email: "test@gmail.com",
      role: "SYS_ADMIN"
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
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(testValues)
    })
  })

  test("Role: Organisation Admin", async () => {
    // Mock requests
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    mockAxios.onGet(`${fakeApiUrl}/roles`).replyOnce(200, fakeRolesResponse)

    const mockOnSubmit = jest.fn()

    const user = {
      ...fakeSelfServiceResponse.data,
      slug: "organisation-admin",
      parent: {
        id: 17,
        name: "John Salesman",
        type: "ORGANISATION"
      },
      role: {
        id: 4,
        name: "ORG_ADMIN"
      }
    }

    const { getByTestId, queryByTestId } = renderWithTheme(
      <TestComponent
        initialEntries={[{ pathname: "/organisations" }]}
        onSubmit={mockOnSubmit}
        user={{ data: user }}
        mockAxios={mockAxios}
        canAccess={roles => roles.includes(user.role.name)}
      />
    )

    const button = getByTestId("create_user-button")

    // Form validation prevents onSubmit from firing until values are in
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(0)
    })

    const testValues = {
      title: "MR",
      first_name: "Test",
      middle_names: "M",
      last_name: "Testington",
      email: "test@gmail.com",
      role: "SALES_ADVISER",
      parent_id: user.parent.id
    }

    const submittedValues = {
      ...testValues,
      simulation_mode: true
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

    // Parent id fields should not be shown
    expect(() => getByTestId("parent_id-input")).toThrowError()

    const simulationToggleWrapper = queryByTestId("simulation_mode-toggle-wrapper")

    await waitFor(() => {
      expect(simulationToggleWrapper).toBeInTheDocument()
    })

    // Click the button
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(submittedValues)
    })
  })

  test("Role: Network Admin", async () => {
    // Mock requests
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    mockAxios.onGet(`${fakeApiUrl}/roles`).replyOnce(200, fakeRolesResponse)

    const mockOnSubmit = jest.fn()

    const user = {
      data: {
        ...fakeSelfServiceResponse.data,
        slug: "network-admin",
        parent: {
          id: 17,
          name: "John Salesman",
          type: "ORGANISATION"
        },
        role: {
          id: 7,
          name: "NETWORK_ADMIN"
        }
      }
    }

    const { getByTestId, queryByTestId } = renderWithTheme(
      <TestComponent
        initialEntries={[{ pathname: "/networks" }]}
        onSubmit={mockOnSubmit}
        user={user}
        mockAxios={mockAxios}
        canAccess={roles => roles.includes(user.data.role.name)}
      />
    )

    const button = getByTestId("create_user-button")

    // Form validation prevents onSubmit from firing until values are in
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(0)
    })

    const testValues = {
      title: "MR",
      first_name: "Test",
      middle_names: "M",
      last_name: "Testington",
      email: "test@gmail.com",
      role: "NETWORK_MEMBER_ADMIN"
    }
    const submittedValues = {
      ...testValues,
      parent_id: user.data.parent.id
    }

    // Put all values into component state
    const formValues = Object.keys(testValues)
    formValues.forEach(async key => {
      const field = queryByTestId(`${key}-select`) || queryByTestId(`${key}-input`)
      fireEvent.change(field, { target: { value: testValues[key] } })
      await waitFor(() => {
        expect(field.value).toBe(testValues[key])
      })
    })

    // Parent id fields should not be shown
    expect(() => getByTestId("parent_id-input")).toThrowError()

    // Click the button
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(submittedValues)
    })
  })

  test("Role: Provider Admin", async () => {
    // Mock requests
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    mockAxios.onGet(`${fakeApiUrl}/roles`).replyOnce(200, fakeRolesResponse)

    const mockOnSubmit = jest.fn()

    const user = {
      ...fakeSelfServiceResponse.data,
      slug: "provider-admin",
      parent: {
        id: 17,
        name: "John Salesman",
        type: "ORGANISATION"
      },
      role: {
        id: 5,
        name: "PROVIDER_ADMIN"
      }
    }

    const { getByTestId, queryByTestId } = renderWithTheme(
      <TestComponent
        initialEntries={[{ pathname: "/providers" }]}
        onSubmit={mockOnSubmit}
        user={{ data: user }}
        mockAxios={mockAxios}
        canAccess={roles => roles.includes(user.role.name)}
      />
    )

    const button = getByTestId("create_user-button")

    // Form validation prevents onSubmit from firing until values are in
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(0)
    })

    const testValues = {
      title: "MR",
      first_name: "Test",
      middle_names: "M",
      last_name: "Testington",
      email: "test@gmail.com",
      role: "UNDERWRITER"
    }
    const submittedValues = {
      ...testValues,
      parent_id: user.parent.id
    }

    // Put all values into component state
    const formValues = Object.keys(testValues)
    formValues.forEach(async key => {
      const field = queryByTestId(`${key}-select`) || queryByTestId(`${key}-input`)
      fireEvent.change(field, { target: { value: testValues[key] } })
      await waitFor(() => {
        expect(field.value).toBe(testValues[key])
      })
    })

    // Parent id fields should not be shown
    expect(() => getByTestId("parent_id-input")).toThrowError()

    // Click the button
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(submittedValues)
    })
  })

  test("Role: System Admin (create a new network admin)", async () => {
    // Mock requests
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
    mockAxios.onGet(`${fakeApiUrl}/roles`).replyOnce(200, fakeRolesResponse)
    mockAxios.onGet(`${fakeApiUrl}/networks`).replyOnce(200, fakeNetworksGetResponse)
    const firstNetwork = fakeNetworksGetResponse.data[0]
    const mockOnSubmit = jest.fn()

    const user = {
      ...fakeSelfServiceResponse.data,
      id: 1,
      slug: "system-admin",
      parent: null,
      role: {
        id: 9,
        name: "SYS_ADMIN"
      }
    }

    const { getByTestId, queryByTestId, getByText, container } = renderWithTheme(
      <TestComponent
        initialEntries={[{ pathname: "/users/add" }]}
        onSubmit={mockOnSubmit}
        user={{ data: user }}
        mockAxios={mockAxios}
        canAccess={roles => roles.includes(user.role.name)}
      />
    )

    const button = getByTestId("create_user-button")
    // Form validation prevents onSubmit from firing until values are in
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(0)
    })
    const testValues = {
      title: "MR",
      first_name: "Test",
      middle_names: "M",
      last_name: "Testington",
      email: "test@gmail.com",
      role: "NETWORK_ADMIN"
    }
    const submittedValues = {
      ...testValues,
      parent_id: firstNetwork.id
    }
    // Parent id fields should not be shown without a chosen role
    expect(() => getByTestId("parent_id-input")).toThrowError()
    // Put all values into component state
    const formValues = Object.keys(testValues)
    formValues.forEach(key => {
      const field = queryByTestId(`${key}-select`) || queryByTestId(`${key}-input`)
      if (!field) return
      fireEvent.change(field, { target: { value: testValues[key] } })
      expect(field.value).toBe(testValues[key])
    })
    const input = getByTestId("parent_id-input")
    expect(input).toBeInTheDocument()
    expect(getByText("Select network")).toBeInTheDocument()
    fireEvent.change(input, {
      target: { value: "Net" }
    })
    await waitFor(() => {
      expect(getByText(firstNetwork.name)).toBeInTheDocument()
    })
    const dropdownFirstItem = getByTestId("parent_id-typeahead-drop_wrapper").firstChild
    // Select first network
    fireEvent.click(dropdownFirstItem)
    await waitFor(() => {
      expect(input.value).toBe(firstNetwork.name)
      expect(container.firstChild).toMatchSnapshot()
    })
    // Click the button
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(submittedValues)
    })
  })
})
