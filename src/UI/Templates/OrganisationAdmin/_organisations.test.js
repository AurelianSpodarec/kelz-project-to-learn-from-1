/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, within } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"

// Components
import OrganisationAdmin, { OrganisationsPanel } from "."
import StoryOrganisationsProvider from "./story/organisations.story.provider"

// Helpers
import {
  fakeOrganisationGetResponse,
  fakeOrganisationsGetResponse,
  fakeSelfServiceResponse,
  Providers
} from "../../Helpers"

const TestComponent = ({ value = {}, user, canAccess }) => (
  <Providers user={user} canAccess={canAccess}>
    <StoryOrganisationsProvider value={value}>
      <Container style={{ position: "static" }}>
        <OrganisationAdmin />
      </Container>
      <OrganisationsPanel />
    </StoryOrganisationsProvider>
  </Providers>
)

describe("<OrganisationAdmin />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container } = renderWithTheme(<TestComponent />)
    const selectOrganisationButton = getByTestId("organisations-table-actions_button_0")
    const search = getByTestId("search_organisations-input")
    const actions = getByTestId("organisations-actions-wrapper")

    // Assert
    expect(selectOrganisationButton).toBeInTheDocument()
    expect(search).toBeInTheDocument()

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "space-between")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "1rem")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Selecting an organisation", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)
    await waitFor(() => {
      expect(getByTestId("organisations-table-actions_button_0")).toBeInTheDocument()
    })

    const selectOrganisationButton = getByTestId("organisations-table-actions_button_0")
    const panel = getByTestId("organisations_panel-flyout_panel-wrapper")

    const selectedOrganisation = fakeOrganisationGetResponse.data

    // Open the panel
    userEvent.click(selectOrganisationButton)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the organisation's information
      expect(within(panel).getByTestId("heading_2-helper_text-container").textContent).toBe(
        "Organisation 1"
      )
      expect(
        within(panel)
          .getByTestId("last_login-helper_text-container")
          .textContent.includes("Last login: ")
      ).toBe(true)
      expect(within(panel).getByText(selectedOrganisation.id)).toBeInTheDocument()
      expect(within(panel).getByText(selectedOrganisation.description)).toBeInTheDocument()
      expect(within(panel).getByText(selectedOrganisation.phone_number)).toBeInTheDocument()

      const addressPanel = within(panel).getByTestId("address-helper_text-container").parentNode

      ;["line_one", "line_two", "city", "county", "postcode"].forEach(x => {
        expect(within(addressPanel).getByText(selectedOrganisation.address[x])).toBeInTheDocument()
      })
    })
  })

  test("Switching organisation side panel", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)
    await waitFor(() => {
      expect(getByTestId("organisations_panel-flyout_panel-wrapper")).toBeInTheDocument()
      expect(getByTestId("organisations-table-actions_button_0")).toBeInTheDocument()
    })

    const panel = getByTestId("organisations_panel-flyout_panel-wrapper")
    const selectOrganisationButton1 = getByTestId("organisations-table-actions_button_0")

    const selectedOrganisation1 = fakeOrganisationsGetResponse.data[0]

    // Open the panel
    userEvent.click(selectOrganisationButton1)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the organisation's information
      expect(within(panel).getByTestId("heading_2-helper_text-container").textContent).toBe(
        "Organisation 1"
      )
      expect(
        within(panel)
          .getByTestId("last_login-helper_text-container")
          .textContent.includes("Last login: ")
      ).toBe(true)
      expect(within(panel).getByText(selectedOrganisation1.id)).toBeInTheDocument()
      expect(within(panel).getByText(selectedOrganisation1.description)).toBeInTheDocument()
      expect(within(panel).getByText(selectedOrganisation1.phone_number)).toBeInTheDocument()
    })

    const selectedOrganisation2 = fakeOrganisationsGetResponse.data[1]

    // This counts as clicking outside the panel, therefore closing it
    userEvent.click(selectOrganisationButton1)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })

    const selectOrganisationButton2 = getByTestId("organisations-table-actions_button_1")

    // Open the panel again
    userEvent.click(selectOrganisationButton2)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the lead's information on re opening
      expect(within(panel).getByTestId("heading_2-helper_text-container").textContent).toBe(
        "Organisation 2"
      )
      expect(
        within(panel)
          .getByTestId("last_login-helper_text-container")
          .textContent.includes("Last login: ")
      ).toBe(true)
      expect(within(panel).getByText(selectedOrganisation2.id)).toBeInTheDocument()
      expect(within(panel).getByText(selectedOrganisation2.description)).toBeInTheDocument()
      expect(within(panel).getByText(selectedOrganisation2.phone_number)).toBeInTheDocument()
    })
  })

  test("Inactive, unapproved organisation", async () => {
    const organisation = { ...fakeOrganisationGetResponse.data, approved: false, active: false }
    const { getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          data: [organisation],
          onOrganisationSelect: () => {},
          selectedOrganisation: organisation
        }}
      />
    )
    const selectOrganisation = getByTestId("organisations-table-actions_button_0")
    const panel = getByTestId("organisations_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectOrganisation)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    const activateButton = within(panel).getByTestId("activate-button")
    expect(activateButton.textContent).toBe("Activate")
    expect(activateButton).toHaveStyleRule("background-color", colours.green)
    expect(activateButton).toHaveAttribute("disabled")
  })

  test("Inactive, approved organisation", async () => {
    const organisation = { ...fakeOrganisationGetResponse.data, approved: true, active: false }
    const { getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          data: [organisation],
          onOrganisationSelect: () => {},
          selectedOrganisation: organisation
        }}
      />
    )
    const selectOrganisation = getByTestId("organisations-table-actions_button_0")
    const panel = getByTestId("organisations_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectOrganisation)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    const activateButton = within(panel).getByTestId("activate-button")
    expect(activateButton.textContent).toBe("Activate")
    expect(activateButton).toHaveStyleRule("background-color", colours.green)
    expect(activateButton).not.toHaveAttribute("disabled")
  })

  test("Selecting a Organisation as Support admin", async () => {
    const user = JSON.parse(JSON.stringify(fakeSelfServiceResponse))
    user.data.role.name = "SUPPORT_ADMIN"
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent user={user} canAccess={roles => roles.includes(user.data.role.name)} />
    )
    const selectOrganisation = getByTestId("organisations-table-actions_button_0")
    const panel = getByTestId("organisations_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectOrganisation)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      expect(() => getByText("Delete organisation")).toThrowError()
    })
  })
})
