import React from "react"
import { get } from "lodash"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Component
import Details from "."

// Helpers
import NetworkManageProvider from "../../context/manage.provider"
import {
  Providers,
  fakeApiUrl,
  fakeNetworkGetResponse,
  renderWithMockedRouter
} from "../../../../UI/Helpers"

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("Network Details", () => {
  test("All data present at component render", async () => {
    mockAxios
      .onGet(`${fakeApiUrl}/networks/${get(fakeNetworkGetResponse, "data.slug")}`)
      .replyOnce(200, fakeNetworkGetResponse)

    const { getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <NetworkManageProvider>
            <Details />
          </NetworkManageProvider>
        </Providers>
      ),
      { path: "/networks/:slug", route: "/networks/network-1" }
    )
    await waitFor(() => {
      expect(getByText("Network One")).toBeInTheDocument()
      expect(getByText("This is a description of the network")).toBeInTheDocument()
      expect(getByText("07967876545")).toBeInTheDocument()
      expect(getByText("Joe Bloggs")).toBeInTheDocument()
      expect(getByText("joebloggs@gmail.com")).toBeInTheDocument()
    })
  })

  test("Closing the update Logo Modal should reset the form", async () => {
    const fileName = "foo.txt"
    const file = new File(["foo"], fileName, {
      type: "text/plain"
    })

    mockAxios
      .onGet(`${fakeApiUrl}/organisations/${get(fakeNetworkGetResponse, "data.slug")}`)
      .replyOnce(200, fakeNetworkGetResponse)

    const { getByTestId, getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <NetworkManageProvider>
            <Details />
          </NetworkManageProvider>
        </Providers>
      ),
      { path: "/networks/:slug", route: "/networks/network-1" }
    )

    const updateButton = getByTestId("update_network_information-button")
    await waitFor(() => {
      expect(updateButton).not.toHaveAttribute("disabled")
    })

    fireEvent.click(updateButton)
    await waitFor(() => {
      expect(getByTestId("name-input")).toBeInTheDocument()
    })

    const updateLogoButton = getByTestId("update_logo-button")
    userEvent.click(updateLogoButton)
    await waitFor(() => {
      expect(getByTestId("update_logo-file_select-input")).toBeInTheDocument()
    })

    fireEvent.change(getByTestId("update_logo-file_select-input"), {
      target: { files: [file] }
    })
    await waitFor(() => {
      expect(getByText(fileName)).toBeInTheDocument()
    })

    const cancelLogoButton = getByTestId("update_logo_cancel-button")
    userEvent.click(cancelLogoButton)
    await waitFor(() => {
      expect(() => getByTestId("update_logo-file_select-input")).toThrowError()
    })

    userEvent.click(updateLogoButton)
    await waitFor(() => {
      expect(() => getByTestId(fileName)).toThrowError()
    })
  })
})
