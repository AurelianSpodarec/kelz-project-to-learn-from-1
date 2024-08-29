import React from "react"
import { get } from "lodash"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { waitFor, within, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Component
import Details from "."

// Helpers
import OrganisationManageProvider from "../../context/manage.provider"
import {
  Providers,
  fakeOrganisationGetResponse,
  renderWithMockedRouter,
  fakeApiUrl,
  fakeOrganisationNetworkInvitationsGetResponse
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

describe("Organisation Details", () => {
  test("All data present at component render", async () => {
    mockAxios
      .onGet(`${fakeApiUrl}/organisations/${get(fakeOrganisationGetResponse, "data.slug")}`)
      .replyOnce(200, fakeOrganisationGetResponse)

    const { getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <OrganisationManageProvider>
            <Details />
          </OrganisationManageProvider>
        </Providers>
      ),
      { path: "/organisations/:slug", route: "/organisations/organisation-1" }
    )

    await waitFor(() => {
      expect(getByText("Organisation 1")).toBeInTheDocument()
      expect(getByText("Test organisation 1")).toBeInTheDocument()
      expect(getByText("http://website1.com")).toBeInTheDocument()
      expect(getByText("111111")).toBeInTheDocument()
      expect(getByText("123456")).toBeInTheDocument()
    })
  })

  test("Reject invite", async () => {
    const test = jest.fn()
    const organisation = { ...fakeOrganisationGetResponse.data, network: undefined }
    mockAxios
      .onGet(`${fakeApiUrl}/organisations/${get(fakeOrganisationGetResponse, "data.slug")}`)
      .replyOnce(200, { data: organisation })
    mockAxios
      .onGet(
        `${fakeApiUrl}/organisations/${get(
          fakeOrganisationGetResponse,
          "data.slug"
        )}/network-invitations`
      )
      .replyOnce(200, fakeOrganisationNetworkInvitationsGetResponse)
    mockAxios
      .onPost(
        `${fakeApiUrl}/organisations/${get(
          fakeOrganisationGetResponse,
          "data.slug"
        )}/network-invitations/90/reject`
      )
      .reply(() => {
        test()
        return [
          200,
          {
            message: "OK"
          }
        ]
      })

    const { container, getByTestId, getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <OrganisationManageProvider>
            <Details />
          </OrganisationManageProvider>
        </Providers>
      ),
      { path: "/organisations/:slug", route: "/organisations/organisation-1" }
    )

    await waitFor(() => {
      expect(getByTestId("my_invitations-section_0")).toBeInTheDocument()
    })

    const rejectButton = within(getByTestId("my_invitations-section_0")).getByTestId(
      "reject-button"
    )

    userEvent.click(rejectButton)
    await waitFor(() => {
      expect(getByText("Reject invitation")).toBeInTheDocument()
      expect(getByText("Are you sure?")).toBeInTheDocument()
    })

    const acceptModalButton = getByTestId("confirmation_modal_confirm-button")
    userEvent.click(acceptModalButton)
    await waitFor(() => {
      expect(getByText("INVITATION_REJECT_SUCCESS")).toBeInTheDocument()
      expect(test).toHaveBeenCalled()
    })

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Accept invite", async () => {
    const test = jest.fn()
    const organisation = { ...fakeOrganisationGetResponse.data, network: undefined }
    mockAxios
      .onGet(`${fakeApiUrl}/organisations/${get(fakeOrganisationGetResponse, "data.slug")}`)
      .replyOnce(200, { data: organisation })
    mockAxios
      .onGet(
        `${fakeApiUrl}/organisations/${get(
          fakeOrganisationGetResponse,
          "data.slug"
        )}/network-invitations`
      )
      .replyOnce(200, fakeOrganisationNetworkInvitationsGetResponse)
    mockAxios
      .onPost(
        `${fakeApiUrl}/organisations/${get(
          fakeOrganisationGetResponse,
          "data.slug"
        )}/network-invitations/90/accept`
      )
      .reply(() => {
        test()
        return [
          200,
          {
            message: "OK"
          }
        ]
      })

    const { container, getByTestId, getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <OrganisationManageProvider>
            <Details />
          </OrganisationManageProvider>
        </Providers>
      ),
      { path: "/organisations/:slug", route: "/organisations/organisation-1" }
    )

    await waitFor(() => {
      expect(getByTestId("my_invitations-section_0")).toBeInTheDocument()
    })

    const acceptButton = within(getByTestId("my_invitations-section_0")).getByTestId(
      "accept-button"
    )

    userEvent.click(acceptButton)
    await waitFor(() => {
      expect(getByText("Accept invitation")).toBeInTheDocument()
      expect(getByText("Are you sure?")).toBeInTheDocument()
    })

    const acceptModalButton = getByTestId("confirmation_modal_confirm-button")
    userEvent.click(acceptModalButton)
    await waitFor(() => {
      expect(getByText("INVITATION_ACCEPT_SUCCESS")).toBeInTheDocument()
      expect(test).toHaveBeenCalled()
    })

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Closing the update Logo Modal should reset the form", async () => {
    const fileName = "foo.txt"
    const file = new File(["foo"], fileName, {
      type: "text/plain"
    })

    mockAxios
      .onGet(`${fakeApiUrl}/organisations/${get(fakeOrganisationGetResponse, "data.slug")}`)
      .replyOnce(200, fakeOrganisationGetResponse)

    const { getByTestId, getByText } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <OrganisationManageProvider>
            <Details />
          </OrganisationManageProvider>
        </Providers>
      ),
      { path: "/organisations/:slug", route: "/organisations/organisation-1" }
    )

    const updateButton = getByTestId("update_organisation_information-button")
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
