import React from "react"
import MockAdapter from "axios-mock-adapter"
import { get } from "lodash"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { waitFor } from "@testing-library/react"

// Component
import Notes from "."

// Helpers
import OrganisationManageProvider from "../../context/manage.provider"
import {
  Providers,
  fakeOrganisationGetResponse,
  fakeOrganisationNotesGetResponse,
  renderWithMockedRouter,
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

describe("Organisation Notes", () => {
  test("All data present at component render", async () => {
    mockAxios
      .onGet(`${fakeApiUrl}/organisations/${get(fakeOrganisationGetResponse, "data.slug", "")}`)
      .reply(200, fakeOrganisationGetResponse)
    mockAxios
      .onGet(
        `${fakeApiUrl}/organisations/${get(fakeOrganisationGetResponse, "data.slug", "")}/notes`
      )
      .reply(200, fakeOrganisationNotesGetResponse)

    const { getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <OrganisationManageProvider>
            <Notes />
          </OrganisationManageProvider>
        </Providers>
      ),
      { path: "/organisations/:slug", route: "/organisations/organisation-1" }
    )
    await waitFor(() => {
      expect(
        getByText(
          "In animi neque porro ratione eos animi. Illo consequuntur et est optio ullam sint dolor."
        )
      ).toBeInTheDocument()
    })
  })
})
