import React from "react"
import { get } from "lodash"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { waitFor } from "@testing-library/react"

// Component
import Applications from "."

// Helpers
import NetworkManageProvider from "../../context/manage.provider"
import {
  Providers,
  fakeApiUrl,
  fakeNetworkGetResponse,
  fakeNetworkApplicationsGetResponse,
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

describe("Network Applications", () => {
  test("All data present at component render", async () => {
    mockAxios
      .onGet(`${fakeApiUrl}/networks/${get(fakeNetworkGetResponse, "data.slug")}`)
      .reply(200, fakeNetworkGetResponse)
    mockAxios
      .onGet(`${fakeApiUrl}/networks/${get(fakeNetworkGetResponse, "data.slug")}/applications`)
      .reply(200, fakeNetworkApplicationsGetResponse)

    const { container, getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <NetworkManageProvider>
            <Applications />
          </NetworkManageProvider>
        </Providers>
      ),
      { path: "/networks/:slug", route: "/networks/network-1" }
    )

    await waitFor(() => {
      expect(getByText("Organisation One")).toBeInTheDocument()
      expect(getByText("Joe Bloggs")).toBeInTheDocument()
      expect(getByText("01/01/2021 00:00")).toBeInTheDocument()
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
