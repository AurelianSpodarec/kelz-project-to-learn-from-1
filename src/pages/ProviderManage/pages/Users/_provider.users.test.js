import React from "react"
import { get } from "lodash"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { waitFor } from "@testing-library/react"

// Component
import Users from "."

// Helpers
import ProviderManageProvider from "../../context/manage.provider"
import {
  Providers,
  fakeApiUrl,
  fakeUsersGetResponse,
  renderWithMockedRouter,
  fakeProviderGetResponse
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

describe("Provider Users", () => {
  test("All data present at component render", async () => {
    mockAxios
      .onGet(`${fakeApiUrl}/providers/${get(fakeProviderGetResponse, "data.slug", "")}`)
      .replyOnce(200, fakeProviderGetResponse)

    mockAxios.onGet(`${fakeApiUrl}/users`).replyOnce(200, fakeUsersGetResponse)
    const { getByText } = renderWithMockedRouter(() => (
      <Providers mockAxios={mockAxios}>
        <ProviderManageProvider>
          <Users />
        </ProviderManageProvider>
      </Providers>
    ))

    await waitFor(() => {
      expect(getByText("Robert")).toBeInTheDocument()
      expect(getByText("James")).toBeInTheDocument()
      expect(getByText("Smith")).toBeInTheDocument()
      expect(getByText("rjsmith@gmail.com")).toBeInTheDocument()
    })
  })
})
