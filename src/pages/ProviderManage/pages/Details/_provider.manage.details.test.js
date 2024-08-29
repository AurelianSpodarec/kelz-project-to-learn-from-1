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
import ProviderManageProvider from "../../context/manage.provider"
import {
  Providers,
  fakeApiUrl,
  fakeProviderGetResponse,
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

describe("Provider Details", () => {
  test("All data present at component render", async () => {
    mockAxios
      .onGet(`${fakeApiUrl}/providers/${get(fakeProviderGetResponse, "data.slug")}`)
      .replyOnce(200, fakeProviderGetResponse)

    const { getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <ProviderManageProvider>
            <Details />
          </ProviderManageProvider>
        </Providers>
      ),
      { path: "/providers/:slug", route: "/providers/aviva" }
    )
    await waitFor(() => {
      expect(getByText("Aviva")).toBeInTheDocument()
      expect(getByText("This is a description of Aviva")).toBeInTheDocument()
      expect(getByText("123456rthrth")).toBeInTheDocument()
      expect(getByText("www.aviva.com")).toBeInTheDocument()
    })
  })

  test("Closing the update Logo Modal should reset the form", async () => {
    const fileName = "foo.txt"
    const file = new File(["foo"], fileName, {
      type: "text/plain"
    })

    mockAxios
      .onGet(`${fakeApiUrl}/organisations/${get(fakeProviderGetResponse, "data.slug")}`)
      .replyOnce(200, fakeProviderGetResponse)

    const { getByTestId, getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <ProviderManageProvider>
            <Details />
          </ProviderManageProvider>
        </Providers>
      ),
      { path: "/providers/:slug", route: "/providers/aviva" }
    )

    const updateButton = getByTestId("update_provider_information-button")
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
