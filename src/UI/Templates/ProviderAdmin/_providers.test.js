/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, within } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import ProviderAdmin, { ProvidersPanel } from "."
import StoryProvidersProvider from "./story/providers.story.provider"

// Helpers
import { fakeProviderGetResponse, fakeSelfServiceResponse, Providers } from "../../Helpers"

const TestComponent = ({ user, canAccess, ...props }) => (
  <Providers user={user} canAccess={canAccess}>
    <StoryProvidersProvider>
      <Container style={{ position: "static" }}>
        <ProviderAdmin {...props} />
      </Container>
      <ProvidersPanel {...props} />
    </StoryProvidersProvider>
  </Providers>
)

describe("<ProviderAdmin />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container, getByText } = renderWithTheme(<TestComponent />)
    const search = getByTestId("search_providers-input")
    const selectLead = getByTestId("providers-table-actions_button_0")
    const title = getByText("Providers")
    const actions = getByTestId("providers-actions-wrapper")
    const addProvider = getByTestId("add_provider-button")

    // Assert
    expect(search).toBeInTheDocument()
    expect(selectLead).toBeInTheDocument()
    expect(title).toBeInTheDocument()

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "space-between")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "2rem")

    expect(addProvider).toHaveStyleRule("height", "5rem")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Selecting and deselecting a provider", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)

    const selectLead = getByTestId("providers-table-actions_button_0")
    const panel = getByTestId("providers_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectLead)

    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    // Panel should be populated with the provider's information
    expect(
      within(panel).getByText(`Key: ${fakeProviderGetResponse.data.provider_key}`)
    ).toBeInTheDocument()
    expect(within(panel).getByText(fakeProviderGetResponse.data.name)).toBeInTheDocument()
    expect(
      within(panel).getByText(`Abbr: ${fakeProviderGetResponse.data.abbreviation}`)
    ).toBeInTheDocument()
    expect(within(panel).getByText(fakeProviderGetResponse.data.id)).toBeInTheDocument()
    expect(
      within(panel).getByText(fakeProviderGetResponse.data.registration_number)
    ).toBeInTheDocument()
    expect(
      within(panel).getByText(fakeProviderGetResponse.data.primary_contact_email)
    ).toBeInTheDocument()
    expect(within(panel).getByText(fakeProviderGetResponse.data.website)).toBeInTheDocument()

    userEvent.click(selectLead)
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })

  test("Selecting a Provider as Support admin", async () => {
    const user = JSON.parse(JSON.stringify(fakeSelfServiceResponse))
    user.data.role.name = "SUPPORT_ADMIN"
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent user={user} canAccess={roles => roles.includes(user.data.role.name)} />
    )
    const selectLead = getByTestId("providers-table-actions_button_0")
    const panel = getByTestId("providers_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectLead)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      expect(() => getByText("Delete provider")).toThrowError()
    })
  })
})
