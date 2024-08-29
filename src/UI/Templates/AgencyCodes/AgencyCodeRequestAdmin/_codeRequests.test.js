/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import MockAdapter from "axios-mock-adapter"
import { waitFor } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { api } from "@4cplatform/elements/Api/fetchData"

// Components
import AgencyCodeRequestsAdmin from "."
import AgencyCodeRequestsPanel from "./codeRequests.panel"

// Providers
import StoryAgencyCodeRequestsProvider from "./story/codeRequests.story.provider"
import NetworkManageProvider from "../../../../pages/NetworkManage/context/manage.provider"
import NetworkAgencyCodeRequestsProvider from "../../../../pages/NetworkManage/pages/AgencyCodeRequests/context/codeRequests.provider"

// Helpers
import {
  fakeAgencyCodesRequestsGetResponse,
  Providers,
  fakeApiUrl,
  renderWithMockedRouter
} from "../../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <StoryAgencyCodeRequestsProvider value={value}>
      <Container style={{ position: "static" }}>
        <AgencyCodeRequestsAdmin {...props} />
      </Container>
      <AgencyCodeRequestsPanel {...props} />
    </StoryAgencyCodeRequestsProvider>
  </Providers>
)

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("<AgencyCodeRequestAdmin />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container } = renderWithTheme(<TestComponent />)
    const selectAgencyCodeRequest = getByTestId("agency_codes_requests-table-actions_button_0")

    // Assert
    expect(selectAgencyCodeRequest).toBeInTheDocument()

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Selecting and deselecting an agency code request", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)

    const selectAgencyCodeRequest = getByTestId("agency_codes_requests-table-actions_button_0")
    const panel = getByTestId("agency_codes_requests_panel-flyout_panel-wrapper")

    userEvent.click(selectAgencyCodeRequest)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    userEvent.click(selectAgencyCodeRequest)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
  test("Decling agency code request", async () => {
    const { getByTestId, getByText } = renderWithTheme(<TestComponent />)

    const selectAgencyCodeRequest = getByTestId("agency_codes_requests-table-actions_button_0")
    const panel = getByTestId("agency_codes_requests_panel-flyout_panel-wrapper")

    userEvent.click(selectAgencyCodeRequest)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    const declineButton = getByTestId("decline_request-button")
    userEvent.click(declineButton)
    await waitFor(() => {
      expect(getByText("Decline Request")).toBeInTheDocument()

      const [modalContent] = getByTestId("confirmation_modal-modal-body").children
      const [agencyCode] = fakeAgencyCodesRequestsGetResponse.data
      expect(modalContent.textContent).toBe(
        `Are you sure you want to decline ${agencyCode.owner.name}'s Agency Code request for ${agencyCode.product}?`
      )
    })
  })
  describe("Pending requests", () => {
    test("Call the correct api, when the slug is available", async () => {
      const testPrematureCall = jest.fn()
      const testCodes = jest.fn()
      mockAxios
        .onGet(`${fakeApiUrl}/networks/network-1`)
        .replyOnce(200, { data: { slug: "network-1" } })
      mockAxios.onGet(`${fakeApiUrl}/networks//agency-code-requests`).replyOnce(() => {
        testPrematureCall()
        return [200, fakeAgencyCodesRequestsGetResponse]
      })
      mockAxios.onGet(`${fakeApiUrl}/networks/network-1/agency-code-requests`).replyOnce(() => {
        testCodes()
        return [200, fakeAgencyCodesRequestsGetResponse]
      })

      renderWithMockedRouter(
        () => (
          <Providers>
            <NetworkManageProvider>
              <NetworkAgencyCodeRequestsProvider>
                <AgencyCodeRequestsAdmin />
              </NetworkAgencyCodeRequestsProvider>
            </NetworkManageProvider>
          </Providers>
        ),
        { path: "/networks/:slug", route: "/networks/network-1" }
      )

      expect(testPrematureCall).not.toHaveBeenCalled()

      await waitFor(() => {
        expect(testCodes).toHaveBeenCalled()
      })
    })
  })
})
