import React from "react"
import { get } from "lodash"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Component
import Invitations from "."

// Helpers
import NetworkManageProvider from "../../context/manage.provider"
import {
  Providers,
  fakeApiUrl,
  renderWithMockedRouter,
  fakeNetworkGetResponse,
  fakeNetworkInvitationsGetResponse
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

describe("Network Invitations", () => {
  test("All data present at component render", async () => {
    mockAxios
      .onGet(`${fakeApiUrl}/networks/${get(fakeNetworkGetResponse, "data.slug", "")}`)
      .replyOnce(200, fakeNetworkGetResponse)

    mockAxios
      .onGet(`${fakeApiUrl}/networks/${get(fakeNetworkGetResponse, "data.slug", "")}/invitations`)
      .replyOnce(200, fakeNetworkInvitationsGetResponse)
    const { getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <NetworkManageProvider>
            <Invitations />
          </NetworkManageProvider>
        </Providers>
      ),
      { path: "/networks/:slug", route: "/networks/network-1" }
    )

    await waitFor(() => {
      expect(getByText("organisation1@gmail.com")).toBeInTheDocument()
      expect(getByText("Test Organisation 1")).toBeInTheDocument()
      expect(getByText("Cancel")).toBeInTheDocument()
      expect(getByText("01/01/2021 00:00")).toBeInTheDocument()
    })
  })

  test("Default value when missing email address", async () => {
    const [data] = fakeNetworkInvitationsGetResponse.data
    const invitations = { data: [{ ...data }] }
    invitations.data[0].email_address = null
    mockAxios
      .onGet(`${fakeApiUrl}/networks/${get(fakeNetworkGetResponse, "data.slug", "")}`)
      .replyOnce(200, fakeNetworkGetResponse)

    mockAxios
      .onGet(`${fakeApiUrl}/networks/${get(fakeNetworkGetResponse, "data.slug", "")}/invitations`)
      .replyOnce(200, invitations)
    const { getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <NetworkManageProvider>
            <Invitations />
          </NetworkManageProvider>
        </Providers>
      ),
      { path: "/networks/:slug", route: "/networks/network-1" }
    )

    await waitFor(() => {
      expect(getByText("N/A")).toBeInTheDocument()
      expect(getByText("Test Organisation 1")).toBeInTheDocument()
      expect(getByText("Cancel")).toBeInTheDocument()
      expect(getByText("01/01/2021 00:00")).toBeInTheDocument()
    })
  })

  test("Sorting ", async () => {
    const endPointTestForSorting = jest.fn()
    mockAxios
      .onGet(`${fakeApiUrl}/networks/${get(fakeNetworkGetResponse, "data.slug", "")}`)
      .replyOnce(200, fakeNetworkGetResponse)

    mockAxios
      .onGet(`${fakeApiUrl}/networks/${get(fakeNetworkGetResponse, "data.slug", "")}/invitations`)
      .reply(({ params }) => {
        endPointTestForSorting(params)
        return [200, fakeNetworkInvitationsGetResponse]
      })
    const { getByTestId } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <NetworkManageProvider>
            <Invitations />
          </NetworkManageProvider>
        </Providers>
      ),
      { path: "/networks/:slug", route: "/networks/network-1" }
    )

    await waitFor(() => {
      expect(endPointTestForSorting).toHaveBeenCalledWith({
        limit: 10,
        order_by: "email_address",
        page: 1
      })
      endPointTestForSorting.mockReset()
    })

    const organisationStatusSortButton = getByTestId("organisation_status-sorting")
    userEvent.click(organisationStatusSortButton)
    await waitFor(() => {
      expect(endPointTestForSorting).toHaveBeenCalledWith({
        limit: 10,
        order_by: "organisation_status",
        page: 1
      })
      endPointTestForSorting.mockReset()
    })
  })
})
