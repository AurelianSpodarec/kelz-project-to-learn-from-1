/* eslint-disable react/prop-types */
import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { fireEvent, waitFor } from "@testing-library/react"
import { api } from "@4cplatform/elements/Api/fetchData"
import userEvent from "@testing-library/user-event"
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Helpers
import { Providers, fakeApiUrl, fakeAvailableProvidersGetResponse } from "../../Helpers"

// Component
import ProviderDetails from "."
import TestDetailsProvider from "./story/provider.story.provider"
import ProviderManageProvider from "../../../pages/ProviderManage/context/manage.provider"

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

const TestComponent = ({ value = {} }) => (
  <Providers>
    <ProviderManageProvider>
      <TestDetailsProvider value={value}>
        <ProviderDetails />
      </TestDetailsProvider>
    </ProviderManageProvider>
  </Providers>
)

describe("<ProviderDetails />", () => {
  test("Basic appearance and styles for Details page", () => {
    const { getByText, getAllByTestId, container } = renderWithTheme(<TestComponent />)
    const section = getAllByTestId("provider-details-section")[0]
    // All view fields should be there
    expect(getByText("Aviva")).toBeInTheDocument()
    expect(getByText("This is a description of Aviva")).toBeInTheDocument()
    expect(getByText("123456rthrth")).toBeInTheDocument()
    expect(getByText("www.aviva.com")).toBeInTheDocument()
    expect(getByText("primary.contact@aviva.com")).toBeInTheDocument()
    expect(getByText("risk@aviva.com")).toBeInTheDocument()
    expect(getByText("underwriting@aviva.com")).toBeInTheDocument()
    expect(getByText("onboarding@aviva.com")).toBeInTheDocument()
    expect(getByText("agency.codes@aviva.com")).toBeInTheDocument()
    expect(getByText("extra.contact@aviva.test")).toBeInTheDocument()
    expect(getByText("Example email address for Aviva")).toBeInTheDocument()
    expect(getByText("01234567890")).toBeInTheDocument()
    expect(getByText("Example phone number for Aviva")).toBeInTheDocument()
    expect(getByText("Update provider information")).toBeInTheDocument()
    // SectionWrapper styles
    expect(section).toHaveStyleRule("border-bottom", `1px solid ${colours.faintGrey}`)
    expect(section).toHaveStyleRule("margin", "1rem 0")
    expect(section).toHaveStyleRule("padding", "0")
    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Edit details", async () => {
    mockAxios
      .onGet(`${fakeApiUrl}/available-providers`)
      .replyOnce(200, fakeAvailableProvidersGetResponse)

    const mockOnEditProviderSubmit = jest.fn()
    const { getByTestId } = renderWithTheme(
      <TestComponent value={{ onEditDetailsSubmit: mockOnEditProviderSubmit }} />
    )
    const updateBtn = getByTestId("update_provider_information-button")
    userEvent.click(updateBtn)

    await waitFor(() => {
      expect(getByTestId("name-input")).toBeInTheDocument()
      expect(getByTestId("description-textarea")).toBeInTheDocument()
      expect(getByTestId("registration_number-input")).toBeInTheDocument()
      expect(getByTestId("website-input")).toBeInTheDocument()
    })

    const submitBtn = getByTestId("edit_provider_details-button")
    userEvent.click(submitBtn)

    await waitFor(() => {
      expect(mockOnEditProviderSubmit).toHaveBeenCalledTimes(0)
    })
  })

  test("Should show confirmation modal when cancelling unsaved changes", async () => {
    const mockOnEditProviderSubmit = jest.fn()
    const { getByText, getByTestId } = renderWithTheme(
      <TestComponent value={{ onEditDetailsSubmit: mockOnEditProviderSubmit }} />
    )

    const updateBtn = getByTestId("update_provider_information-button")
    userEvent.click(updateBtn)

    await waitFor(() => {
      expect(getByTestId("name-input")).toBeInTheDocument()
      fireEvent.change(getByTestId("name-input"), { target: { value: "Avivaa" } })
    })

    const cancelBtn = getByTestId("cancel-button")
    userEvent.click(cancelBtn)

    await waitFor(() => {
      expect(mockOnEditProviderSubmit).toHaveBeenCalledTimes(0)
      expect(getByTestId("confirmation_modal-modal-wrapper")).toBeInTheDocument()
      expect(getByText("Are you sure?")).toBeInTheDocument()
      expect(
        getByText(
          "You have unsaved changes. Are you sure you want to abandon changes and return to the provider details page?"
        )
      ).toBeInTheDocument()
      expect(getByTestId("confirmation_modal_confirm-button")).toBeInTheDocument()
      expect(getByTestId("confirmation_modal_cancel-button")).toBeInTheDocument()
    })
  })
})
