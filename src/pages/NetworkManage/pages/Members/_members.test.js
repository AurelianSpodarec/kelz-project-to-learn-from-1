import React from "react"
import Router from "react-router-dom"
import "jest-styled-components"
import MockAdapter from "axios-mock-adapter"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { api } from "@4cplatform/elements/Api/fetchData"

import NetworkManageProvider from "../../context/manage.provider"

// Component
import Members from "."

// Helpers
import {
  Providers,
  fakeApiUrl,
  fakeJourneysGetResponse,
  renderWithMockedRouter
} from "../../../../UI/Helpers"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}))

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("Members Page", () => {
  test("Ordering by", async () => {
    const endPointTestForSearch = jest.fn()
    jest.spyOn(Router, "useParams").mockReturnValue({ slug: "network-1" })
    mockAxios
      .onGet(`${fakeApiUrl}/networks/network-1`)
      .replyOnce(200, { data: { slug: "network-1" } })
    mockAxios.onGet(`${fakeApiUrl}/networks/network-1/organisations`).reply(({ params }) => {
      endPointTestForSearch(JSON.stringify(params))
      return [200, fakeJourneysGetResponse]
    })
    const { getByTestId } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <NetworkManageProvider>
            <Members />
          </NetworkManageProvider>
        </Providers>
      ),
      { path: "/networks/network-1", route: "/networks/network-1?manage=members" }
    )

    await waitFor(() => {
      expect(endPointTestForSearch).toHaveBeenCalledWith(
        JSON.stringify({ order_by: "name", member_organisations: true })
      )
      endPointTestForSearch.mockReset()
    })

    const idSortingButton = getByTestId("id-sorting")

    userEvent.click(idSortingButton)
    await waitFor(() => {
      expect(endPointTestForSearch).toHaveBeenCalledWith(
        JSON.stringify({ order_by: "id", member_organisations: true })
      )
      endPointTestForSearch.mockReset()
    })

    userEvent.click(idSortingButton)
    await waitFor(() => {
      expect(endPointTestForSearch).toHaveBeenCalledWith(
        JSON.stringify({ order_by: "id_desc", member_organisations: true })
      )
      endPointTestForSearch.mockReset()
    })
  })
})
