/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import AgencyCodesAdmin from "."
import AgencyCodesPanel from "./agencyCodes.panel"

import StoryAgencyCodesProvider from "./story/agencyCodes.story.provider"

// Helpers
import { Providers } from "../../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <StoryAgencyCodesProvider value={value}>
      <Container style={{ position: "static" }}>
        <AgencyCodesAdmin {...props} />
      </Container>
      <AgencyCodesPanel {...props} />
    </StoryAgencyCodesProvider>
  </Providers>
)

describe("<AgencyCodeAdmin />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container } = renderWithTheme(<TestComponent />)
    const search = getByTestId("search_agency_codes-input")
    const selectAgencyCode = getByTestId("agency_codes-table-actions_button_0")
    const actions = getByTestId("agency_codes-actions-wrapper")

    // Assert
    expect(search).toBeInTheDocument()
    expect(selectAgencyCode).toBeInTheDocument()
    expect(actions).toBeInTheDocument()

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "flex-end")
    expect(actions).toHaveStyleRule("align-items", "center")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Selecting and deselecting an agency code", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)

    const selectAgencyCode = getByTestId("agency_codes-table-actions_button_0")
    const panel = getByTestId("agency_codes_panel-flyout_panel-wrapper")

    userEvent.click(selectAgencyCode)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    userEvent.click(selectAgencyCode)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })
})
