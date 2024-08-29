/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, within } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import OrganisationDocuments, { OrganisationDocumentsPanel } from "."
import StoryOrganisationDocumentsProvider from "./story/organisationDocuments.story.provider"

// Helpers
import { Providers } from "../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <StoryOrganisationDocumentsProvider value={value}>
      <Container style={{ position: "static" }}>
        <OrganisationDocuments {...props} />
      </Container>
      <OrganisationDocumentsPanel {...props} />
    </StoryOrganisationDocumentsProvider>
  </Providers>
)

describe("<OrganisationDocuments />", () => {
  test("Basic component and styles", () => {
    // Render
    const { getByTestId, container } = renderWithTheme(<TestComponent />)
    const selectDocument = getByTestId("organisation_documents-table-actions_button_0")

    // Assert
    expect(selectDocument).toBeInTheDocument()

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Selecting and deselecting a document", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)
    const selectDocument = getByTestId("organisation_documents-table-actions_button_0")
    const panel = getByTestId("organisation_documents_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectDocument)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the document's information
      expect(within(panel).getAllByText("Network Document One").length).toBe(1)
      expect(within(panel).getAllByText("v2").length).toBe(1)
      expect(within(panel).getAllByText("Display Point").length).toBe(1)
      expect(within(panel).getAllByText("Shared With").length).toBe(1)
    })
  })
})
