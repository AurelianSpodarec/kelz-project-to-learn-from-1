/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { Container } from "@4cplatform/elements/Atoms"

// Component
import SharedAgencyCodes from "."
import StorySharedAgencyCodesProvider from "./story/sharedAgencyCodes.story.provider"

// Helpers
import { Providers } from "../../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <StorySharedAgencyCodesProvider value={value}>
      <Container style={{ position: "static" }}>
        <SharedAgencyCodes {...props} />
      </Container>
    </StorySharedAgencyCodesProvider>
  </Providers>
)

describe("<SharedAgencyCodes />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container, getByText } = renderWithTheme(<TestComponent />)
    const search = getByTestId("search_shared_agency_codes-input")
    // Assert
    expect(search).toBeInTheDocument()
    expect(getByText("PMI")).toBeInTheDocument()
    expect(getByText("BUPA")).toBeInTheDocument()
    expect(getByText("FT134")).toBeInTheDocument()
    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
})
