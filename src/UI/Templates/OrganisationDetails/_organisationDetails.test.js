/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { get } from "lodash"
import { waitFor, within, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Helpers
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"
import { api } from "@4cplatform/elements/Api/fetchData"
import MockAdapter from "axios-mock-adapter"
import {
  Providers,
  fakeOrganisationGetResponse,
  fakeOrganisationNetworkInvitationsGetResponse,
  fakeOrganisationNetworkApplicationsGetResponse,
  fakeNetworkGetResponse
} from "../../Helpers"

// Component
import OrganisationDetails from "."
import OrganisationDetailsProvider from "./story/organisation.story.provider"

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <OrganisationDetailsProvider value={value}>
      <OrganisationDetails {...props} />
    </OrganisationDetailsProvider>
  </Providers>
)

describe("<OrganisationDetails />", () => {
  test("Basic appearance and styles", () => {
    const { getByText, getByTestId, container } = renderWithTheme(<TestComponent />)
    const section = getByTestId("details-section-organisation_details")
    // All view fields should be there
    expect(getByText("Organisation 1")).toBeInTheDocument()
    expect(getByText("111111")).toBeInTheDocument()
    expect(getByText("123456")).toBeInTheDocument()
    expect(getByText("http://website1.com")).toBeInTheDocument()
    // SectionWrapper styles
    expect(section).toHaveStyleRule("border-bottom", `1px solid ${colours.faintGrey}`)
    expect(section).toHaveStyleRule("margin", "0 0 2rem")
    expect(section).toHaveStyleRule("padding", "0")
    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Edit details", async () => {
    const mockOnEditDetailsSubmit = jest.fn()
    const { getByText, getByTestId } = renderWithTheme(
      <TestComponent value={{ onEditDetailsSubmit: mockOnEditDetailsSubmit }} />
    )
    const button = getByText("Update organisation information")

    userEvent.click(button)
    await waitFor(() => {
      expect(getByTestId("name-input")).toBeInTheDocument()
      expect(getByTestId("description-textarea")).toBeInTheDocument()

      expect(getByTestId("address.postcode-input")).toBeInTheDocument()
      expect(getByTestId("address.line_one-input")).toBeInTheDocument()
      expect(getByTestId("address.line_two-input")).toBeInTheDocument()
      expect(getByTestId("address.city-input")).toBeInTheDocument()
      expect(getByTestId("address.county-input")).toBeInTheDocument()

      expect(getByTestId("phone_number-input")).toBeInTheDocument()
      expect(getByTestId("company_registration_number-input")).toBeInTheDocument()
      expect(getByTestId("fca_reference-input")).toBeInTheDocument()
      expect(getByTestId("website-input")).toBeInTheDocument()
      expect(getByText("Cancel")).toBeInTheDocument()
    })

    const submit = getByText("Save changes")
    userEvent.click(submit)
    await waitFor(() => {
      expect(mockOnEditDetailsSubmit).toHaveBeenCalledTimes(1)
    })

    const cancel = getByText("Cancel")
    userEvent.click(cancel)
    await waitFor(() => {
      expect(getByText("Update organisation information")).toBeInTheDocument()
    })
  })
  test("Invitations", async () => {
    // Render
    const { getByText, getAllByTestId, getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          data: { ...get(fakeOrganisationGetResponse, "data", {}), network: null }
        }}
      />
    )

    // Assert
    const first = getByTestId("my_invitations-section_0")
    const last = getByTestId("my_invitations-section_1")
    const accept = getAllByTestId("accept-button")[0]
    const reject = getAllByTestId("reject-button")[0]

    // Components present
    expect(getByText("Network invites")).toBeInTheDocument()
    expect(getAllByTestId("accept-button").length).toBe(2)
    expect(getAllByTestId("reject-button").length).toBe(2)
    expect(getByText("Network One")).toBeInTheDocument()
    expect(getByText("Network Two")).toBeInTheDocument()

    // Section styles
    expect(first).toHaveStyleRule("margin", "0 0 1rem")
    expect(first).toHaveStyleRule("padding-bottom", "1rem")
    expect(first).toHaveStyleRule("border-bottom", `1px solid ${get(colours, "faintGrey")}`)

    expect(last).toHaveStyleRule("margin", "0 0 1rem")
    expect(last).not.toHaveStyleRule("padding-bottom", "1rem")
    expect(last).not.toHaveStyleRule("border-bottom", `1px solid ${get(colours, "faintGrey")}`)

    // Button styles
    expect(accept).toHaveStyleRule("font-size", "1.4rem")
    expect(reject).toHaveStyleRule("font-size", "1.4rem")
  })
  test("Applications", async () => {
    // Render
    const { getByText, getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          data: { ...get(fakeOrganisationGetResponse, "data", {}), network: null }
        }}
      />
    )

    expect(() => getByText("Join Network")).toThrowError()

    // Assert
    const first = getByTestId("my_applications-section_0")
    const last = getByTestId("my_applications-section_1")
    const withdrawButton = getByTestId("my_applications-withdraw_0-button")

    // Components present
    expect(getByText("Network applications")).toBeInTheDocument()
    expect(getByText("Network Three")).toBeInTheDocument()
    expect(getByText("Network Four")).toBeInTheDocument()

    // Section styles
    expect(first).toHaveStyleRule("margin", "0 0 1rem")
    expect(first).toHaveStyleRule("padding-bottom", "1rem")
    expect(first).toHaveStyleRule("border-bottom", `1px solid ${get(colours, "faintGrey")}`)

    expect(last).toHaveStyleRule("margin", "0 0 1rem")
    expect(last).not.toHaveStyleRule("padding-bottom", "1rem")
    expect(last).not.toHaveStyleRule("border-bottom", `1px solid ${get(colours, "faintGrey")}`)

    // Button styles
    expect(withdrawButton).toHaveStyleRule("font-size", "1.4rem")
  })
  test("Accept invitation", async () => {
    // Render
    const mockOnAccept = jest.fn()
    const { getByText, getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          onAcceptInvitation: mockOnAccept,
          data: { ...get(fakeOrganisationGetResponse, "data", {}), network: null }
        }}
      />
    )
    const accept = within(getByTestId("my_invitations-section_0")).getByTestId("accept-button")
    userEvent.click(accept)
    await waitFor(() => {
      expect(getByText("Are you sure?")).toBeInTheDocument()
      expect(
        getByText("Are you sure you want to accept this invitation to join the network?")
      ).toBeInTheDocument()
    })
    userEvent.click(getByText("Accept invitation"))
    await waitFor(() => {
      expect(mockOnAccept).toHaveBeenCalledTimes(1)
    })
  })
  test("Accept invitation with single invitation option", async () => {
    // Render
    const { getByText, getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          data: { ...get(fakeOrganisationGetResponse, "data", {}), network: null },
          invitations: get(fakeOrganisationNetworkInvitationsGetResponse, "data", []).slice(0, 1),
          applications: undefined
        }}
      />
    )
    const accept = within(getByTestId("my_invitations-section_0")).getByTestId("accept-button")
    userEvent.click(accept)
    await waitFor(() => {
      expect(() =>
        getByText(
          "Accepting this invitation will mean all other pending invitations and any pending application will be automatically cancelled/rejected."
        )
      ).toThrowError()
    })
  })
  test("Accept invitation with multiple invitation options", async () => {
    // Render
    const { getByText, getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          data: { ...get(fakeOrganisationGetResponse, "data", {}), network: null },
          invitations: get(fakeOrganisationNetworkInvitationsGetResponse, "data", []),
          applications: undefined
        }}
      />
    )
    const accept = within(getByTestId("my_invitations-section_0")).getByTestId("accept-button")
    userEvent.click(accept)
    await waitFor(() => {
      expect(
        getByText(
          "Accepting this invitation will mean all other pending invitations and any pending application will be automatically cancelled/rejected."
        )
      ).toBeInTheDocument()
    })
  })
  test("Accept invitation with single invitation option and one application", async () => {
    // Render
    const { getByText, getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          data: { ...get(fakeOrganisationGetResponse, "data", {}), network: null },
          invitations: get(fakeOrganisationNetworkInvitationsGetResponse, "data", []).slice(0, 1),
          applications: get(fakeOrganisationNetworkApplicationsGetResponse, "data", [])
        }}
      />
    )
    const accept = within(getByTestId("my_invitations-section_0")).getByTestId("accept-button")
    userEvent.click(accept)
    await waitFor(() => {
      expect(
        getByText(
          "Accepting this invitation will mean all other pending invitations and any pending application will be automatically cancelled/rejected."
        )
      ).toBeInTheDocument()
    })
  })
  test("Reject invitation", async () => {
    // Render
    const mockOnReject = jest.fn()
    const { getByText, getAllByTestId } = renderWithTheme(
      <TestComponent
        value={{
          onRejectInvitation: mockOnReject,
          data: { ...get(fakeOrganisationGetResponse, "data", {}), network: null }
        }}
      />
    )
    const [reject] = getAllByTestId("reject-button")
    userEvent.click(reject)
    await waitFor(() => {
      expect(getByText("Are you sure?")).toBeInTheDocument()
      expect(
        getByText("Are you sure you want to reject this invitation to join the network?")
      ).toBeInTheDocument()
    })
    userEvent.click(getByText("Reject invitation"))
    await waitFor(() => {
      expect(mockOnReject).toHaveBeenCalledTimes(1)
    })
  })
  test("Applications", async () => {
    // Render
    const { getByText, getByTestId, getAllByText } = renderWithTheme(
      <TestComponent
        value={{
          data: { ...get(fakeOrganisationGetResponse, "data", {}), network: null }
        }}
      />
    )
    const first = getByTestId("my_applications-section_0")
    const last = getByTestId("my_applications-section_1")
    const withdraw = getByTestId("my_applications-withdraw_1-button")

    // Components present
    expect(getByText("Network applications")).toBeInTheDocument()
    expect(getAllByText("Withdraw").length).toBe(2)
    expect(getAllByText("Pending").length).toBe(2)
    expect(getByText("Network Three")).toBeInTheDocument()
    expect(getByText("Network Four")).toBeInTheDocument()
    expect(withdraw).toBeInTheDocument()

    // Section styles
    expect(first).toHaveStyleRule("margin", "0 0 1rem")
    expect(first).toHaveStyleRule("padding-bottom", "1rem")
    expect(first).toHaveStyleRule("border-bottom", `1px solid ${get(colours, "faintGrey")}`)

    expect(last).toHaveStyleRule("margin", "0 0 1rem")
    expect(last).not.toHaveStyleRule("padding-bottom", "1rem")
    expect(last).not.toHaveStyleRule("border-bottom", `1px solid ${get(colours, "faintGrey")}`)
  })
  test("Withdraw application", async () => {
    // Render
    const mockOnWithdraw = jest.fn()
    const { getByText, getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          onWithdrawApplication: mockOnWithdraw,
          data: { ...get(fakeOrganisationGetResponse, "data", {}), network: null }
        }}
      />
    )
    const withdraw = getByTestId("my_applications-withdraw_0-button")

    userEvent.click(withdraw)
    await waitFor(() => {
      expect(getByText("Are you sure?")).toBeInTheDocument()
      expect(
        getByText("Are you sure you want to withdraw your application to join the network?")
      ).toBeInTheDocument()
    })

    userEvent.click(getByText("Withdraw application"))
    await waitFor(() => {
      expect(mockOnWithdraw).toHaveBeenCalledTimes(1)
    })
  })

  test("Join network", async () => {
    const test = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <OrganisationDetailsProvider
          value={{
            data: {
              ...get(fakeOrganisationGetResponse, "data", {}),
              network: null
            },
            networks: [fakeNetworkGetResponse.data],
            applications: [],
            onJoinNetwork: test
          }}
        >
          <OrganisationDetails />
        </OrganisationDetailsProvider>
      </Providers>
    )

    const joinButton = getByTestId("join_network-button")
    expect(joinButton.textContent).toBe("Join Network")

    userEvent.click(joinButton)
    await waitFor(() => {
      // Correct text
      expect(getByText("Join a Network")).toBeInTheDocument()
      // Is Select field
      expect(getByTestId("network_id-select")).toBeInTheDocument()
      // Is required
      expect(getByTestId("network_id-select-label").textContent).toBe("Network*")
    })

    expect(getByTestId("confirmation_modal-modal-wrapper")).toMatchSnapshot()

    const modal = getByTestId("confirmation_modal-modal-wrapper")
    const selectButton = within(modal).getByTestId("network_id-select")
    fireEvent.change(selectButton, { target: { value: fakeNetworkGetResponse.data.id } })
    await waitFor(() => {
      expect(selectButton.value).toBe(fakeNetworkGetResponse.data.id.toString())
    })

    const submitButton = within(modal).getByTestId("confirmation_modal_confirm-button")
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(test).toHaveBeenCalled()
    })
  })
})
