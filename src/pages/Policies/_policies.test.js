import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { waitFor, fireEvent } from "@testing-library/react"
import { createMemoryHistory } from "history"

// Component
import Policies from "."

// Helpers
import {
  Providers,
  fakeApiUrl,
  fakePoliciesGetResponse,
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

describe("Policies Page", () => {
  test("All data present at component render", async () => {
    mockAxios.onGet(`${fakeApiUrl}/policies`).replyOnce(200, fakePoliciesGetResponse)
    const { container, getByText, queryAllByText } = renderWithTheme(
      <Providers>
        <Policies />
      </Providers>
    )

    await waitFor(() => {
      expect(getByText("reference-1")).toBeInTheDocument()
      expect(getByText("John Apple Doe")).toBeInTheDocument()
      expect(getByText("Product One")).toBeInTheDocument()
      expect(queryAllByText("Sales Adviser 1").length).toBe(1)
      expect(queryAllByText("16/08/2021 12:07")).not.toBe(null)
    })

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Filter status by dropdown", async () => {
    mockAxios.onGet(`${fakeApiUrl}/policies`).replyOnce(200, fakePoliciesGetResponse)
    const history = createMemoryHistory()
    history.push("/policies")
    const { getByTestId } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <Policies />
        </Providers>
      ),
      { history }
    )
    expect(history.location.search.includes("status")).toBe(false)
    expect(getByTestId("heading_1-helper_text-container").textContent).toBe("Policies ")

    const selectDropdown = getByTestId("filter_status-select")
    fireEvent.change(selectDropdown, { target: { value: "ACCEPTED" } })
    await waitFor(() => {
      expect(history.location.search.includes("status")).toBe(true)
      expect(getByTestId("heading_1-helper_text-container").textContent).toBe("Policies accepted")
    })
  })

  describe("Base page", () => {
    test("Page title", () => {
      mockAxios.onGet(`${fakeApiUrl}/policies`).replyOnce(200, fakePoliciesGetResponse)
      const { getByTestId } = renderWithTheme(
        <Providers>
          <Policies />
        </Providers>
      )
      expect(getByTestId("heading_1-helper_text-container").textContent).toBe("Policies ")
    })
  })

  describe("Accepted status page", () => {
    test("Page title", () => {
      mockAxios.onGet(`${fakeApiUrl}/policies`).replyOnce(200, fakePoliciesGetResponse)
      const { getByTestId } = renderWithMockedRouter(
        () => (
          <Providers mockAxios={mockAxios}>
            <Policies />
          </Providers>
        ),
        { path: "/policies", route: "/policies?status=ACCEPTED" }
      )
      expect(getByTestId("heading_1-helper_text-container").textContent).toBe("Policies accepted")
    })

    test("Filter status by dropdown", async () => {
      mockAxios.onGet(`${fakeApiUrl}/policies`).replyOnce(200, fakePoliciesGetResponse)
      const { getByTestId } = renderWithMockedRouter(
        () => (
          <Providers mockAxios={mockAxios}>
            <Policies />
          </Providers>
        ),
        { path: "/policies", route: "/policies?status=ACCEPTED" }
      )

      await waitFor(() => {
        const selectDropdown = getByTestId("filter_status-select")
        expect(selectDropdown.value).toBe("ACCEPTED")
      })
    })
  })
})
