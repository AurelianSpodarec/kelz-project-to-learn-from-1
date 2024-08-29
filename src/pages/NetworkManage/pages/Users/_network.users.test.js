import React from "react"
import { get } from "lodash"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { waitFor } from "@testing-library/react"

// Component
import Users from "."

// Helpers
import NetworkManageProvider from "../../context/manage.provider"
import {
  Providers,
  fakeApiUrl,
  fakeUsersGetResponse,
  renderWithMockedRouter,
  fakeNetworkGetResponse
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

describe("Network Users", () => {
  test("All data present at component render", async () => {
    mockAxios
      .onGet(`${fakeApiUrl}/networks/${get(fakeNetworkGetResponse, "data.slug", "")}`)
      .replyOnce(200, fakeNetworkGetResponse)

    mockAxios.onGet(`${fakeApiUrl}/users`).replyOnce(200, fakeUsersGetResponse)
    const { getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <NetworkManageProvider>
            <Users />
          </NetworkManageProvider>
        </Providers>
      ),
      { path: "/networks/:slug", route: "/networks/network-1" }
    )

    await waitFor(() => {
      expect(getByText("Robert")).toBeInTheDocument()
      expect(getByText("James")).toBeInTheDocument()
      expect(getByText("Smith")).toBeInTheDocument()
      expect(getByText("rjsmith@gmail.com")).toBeInTheDocument()
    })
  })
})
