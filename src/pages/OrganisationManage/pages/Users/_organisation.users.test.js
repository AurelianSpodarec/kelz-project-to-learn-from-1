import React from "react"
import { get } from "lodash"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { waitFor } from "@testing-library/react"

// Component
import Users from "."

// Helpers
import OrganisationManageProvider from "../../context/manage.provider"
import {
  Providers,
  fakeUsersGetResponse,
  renderWithMockedRouter,
  fakeOrganisationGetResponse,
  fakeApiUrl
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

describe("Organisation Users", () => {
  test("All data present at component render", async () => {
    mockAxios
      .onGet(`${fakeApiUrl}/organisations/${get(fakeOrganisationGetResponse, "data.slug", "")}`)
      .replyOnce(200, fakeOrganisationGetResponse)

    mockAxios.onGet(`${fakeApiUrl}/users`).replyOnce(200, fakeUsersGetResponse)
    const { getByText } = renderWithMockedRouter(() => (
      <Providers>
        <OrganisationManageProvider>
          <Users />
        </OrganisationManageProvider>
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
