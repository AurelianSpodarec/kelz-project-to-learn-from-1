import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { waitFor, fireEvent } from "@testing-library/react"

// Component
import Journeys from "."

// Helpers
import {
  Providers,
  fakeApiUrl,
  fakeJourneysGetResponse,
  renderWithMockedRouter
} from "../../UI/Helpers"

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("Journeys Page", () => {
  test("All data present at component render", async () => {
    mockAxios.onGet(`${fakeApiUrl}/journeys`).replyOnce(200, fakeJourneysGetResponse)
    const { container, getByText, getAllByText } = renderWithTheme(
      <Providers>
        <Journeys />
      </Providers>
    )

    await waitFor(() => {
      expect(getByText("WZAD9-87375")).toBeInTheDocument()
      expect(getAllByText("John Doe").length).not.toBe(null)
      expect(getAllByText("Sales Adviser 1").length).not.toBe(null)
      expect(getAllByText("01/01/2021 00:00").length).not.toBe(null)
    })

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Searching", async () => {
    const endPointTestForSearch = jest.fn()
    mockAxios.onGet(`${fakeApiUrl}/journeys`).reply(({ params }) => {
      endPointTestForSearch(JSON.stringify(params))
      return [200, fakeJourneysGetResponse]
    })
    const { container, getByTestId } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <Journeys />
        </Providers>
      ),
      { path: "/journeys", route: "/journeys?status=IN_PROGRESS" }
    )

    await waitFor(() => {
      const tableBody = getByTestId("test-table-body")
      expect(tableBody.children.length).toBe(fakeJourneysGetResponse.data.length)
      expect(endPointTestForSearch).toHaveBeenCalledWith(
        '{"limit":10,"order_by":"created_at_desc","status":"IN_PROGRESS","page":1}'
      )
      endPointTestForSearch.mockReset()
    })

    const searchInput = getByTestId("search_journeys-input")
    fireEvent.change(searchInput, { target: { value: "KAJ" } })
    await waitFor(() => {
      expect(searchInput.value).toBe("KAJ")
      expect(endPointTestForSearch).toHaveBeenCalledWith(
        '{"limit":10,"order_by":"created_at_desc","status":"IN_PROGRESS","page":1,"reference":"KAJ"}'
      )
      endPointTestForSearch.mockReset()
    })

    fireEvent.change(searchInput, { target: { value: "KA" } })
    await waitFor(() => {
      expect(searchInput.value).toBe("KA")
      expect(endPointTestForSearch).toHaveBeenCalledWith(
        '{"limit":10,"order_by":"created_at_desc","status":"IN_PROGRESS","page":1}'
      )
    })

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
})
