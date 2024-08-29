/* eslint-disable react/prop-types */
import React from "react"
import Router from "react-router-dom"
import "jest-styled-components"
import MockAdapter from "axios-mock-adapter"
import { waitFor, within } from "@testing-library/react"
import { api } from "@4cplatform/elements/Api/fetchData"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

import StoryNetworkDocumentsProvider from "./story/networkDocuments.story.provider"
import NetworkManageProvider from "../../../pages/NetworkManage/context/manage.provider"

// Components
import NetworkDocuments, { NetworkDocumentsPanel } from "."
import Documents from "../../../pages/NetworkManage/pages/Documents"

// Helpers
import {
  Providers,
  fakeApiUrl,
  renderWithMockedRouter,
  fakeNetworkDocumentsGetResponse
} from "../../Helpers"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}))

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
    <StoryNetworkDocumentsProvider value={value}>
      <Container style={{ position: "static" }}>
        <NetworkDocuments {...props} />
      </Container>
      <NetworkDocumentsPanel {...props} />
    </StoryNetworkDocumentsProvider>
  </Providers>
)

describe("<NetworkDocuments />", () => {
  test("Basic component and styles", () => {
    // Render
    const { getByTestId, container } = renderWithTheme(<TestComponent />)
    const selectDocument = getByTestId("network_documents-table-actions_button_0")
    const actions = getByTestId("network_documents-actions-wrapper")
    const add = getByTestId("add_document-button")

    // Assert
    expect(selectDocument).toBeInTheDocument()
    expect(actions).toBeInTheDocument()
    expect(add).toBeInTheDocument()

    expect(actions).toHaveStyleRule("display", "flex")
    expect(actions).toHaveStyleRule("justify-content", "flex-end")
    expect(actions).toHaveStyleRule("align-items", "center")
    expect(actions).toHaveStyleRule("margin-bottom", "1rem")

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Selecting and deselecting a document", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)
    const selectDocument = getByTestId("network_documents-table-actions_button_0")
    const panel = getByTestId("network_documents_panel-flyout_panel-wrapper")

    // Panel open state
    userEvent.click(selectDocument)
    await waitFor(() => {
      // Panel should be open
      expect(panel).toHaveStyleRule("right", "-40rem")
      // Panel should be populated with the document's information
      expect(within(panel).getAllByText("some text").length).toBe(1)
      expect(within(panel).getAllByText("v2").length).toBe(1)
      expect(within(panel).getAllByText("Both").length).toBe(1)
      expect(within(panel).getAllByText("2 Organisations").length).toBe(1)
      expect(within(panel).getAllByText("some text v1").length).toBe(1)
      expect(within(panel).getAllByText("some text v2").length).toBe(1)
    })

    // Panel closed state
    userEvent.click(getByTestId("network_documents_panel-flyout_panel-body_close"))
    await waitFor(() => {
      // Panel should be closed
      expect(panel).toHaveStyleRule("right", "-80rem")
    })
  })

  test("Revoking document", async () => {
    // Mock functions
    const endPointTestForSearch = jest.fn()
    const onRevoke = jest.fn()

    // Mock routing
    jest.spyOn(Router, "useParams").mockReturnValue({ slug: "network-1" })

    // Mock endpoints
    mockAxios
      .onGet(`${fakeApiUrl}/networks/network-1`)
      .replyOnce(200, { data: { slug: "network-1" } })
    mockAxios.onGet(`${fakeApiUrl}/networks/network-1/documents`).reply(({ params }) => {
      endPointTestForSearch(JSON.stringify(params))
      return [200, fakeNetworkDocumentsGetResponse]
    })
    mockAxios.onDelete(`${fakeApiUrl}/networks/network-1/documents/documentname`).replyOnce(() => {
      onRevoke()
      return [200]
    })

    // Render
    const { getByText, getByTestId } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <NetworkManageProvider>
            <Documents />
          </NetworkManageProvider>
        </Providers>
      ),
      { path: "/networks/network-1", route: "/networks/network-1?manage=documents" }
    )

    // Wait for data to load
    await waitFor(() => {
      expect(() => getByText("No data is available for display")).toThrowError()
    })

    const panel = getByTestId("network_documents_panel-flyout_panel-wrapper")

    // Select document
    const rowSelectButton = getByTestId("network_documents-table-actions_button_0")
    userEvent.click(rowSelectButton)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    // Open revoke document Modal
    const revokeButton = getByTestId("revoke_document-button")
    userEvent.click(revokeButton)
    await waitFor(() => {
      expect(getByText("Are you sure you want to revoke this document?")).toBeInTheDocument()
    })

    // Revoke document (via button on Modal)
    const revokeModalButton = getByTestId("confirmation_modal_confirm-button")
    userEvent.click(revokeModalButton)
    await waitFor(() => {
      expect(onRevoke).toHaveBeenCalled()
    })

    expect(panel).toHaveStyleRule("right", "-80rem")

    // This test makes sure that the Modal has been closed after Revoke was successful
    userEvent.click(rowSelectButton)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    expect(() => getByText("Are you sure you want to revoke this document?")).toThrowError()
  })

  test("Loading timeline for document", async () => {
    // Mock routing
    jest.spyOn(Router, "useParams").mockReturnValue({ slug: "network-1" })

    const { data } = fakeNetworkDocumentsGetResponse
    const [firstDocument] = data
    const document = { ...firstDocument }
    const { document_versions: versions } = document
    delete document.document_versions

    // Mock endpoints
    mockAxios
      .onGet(`${fakeApiUrl}/networks/network-1`)
      .replyOnce(200, { data: { slug: "network-1" } })
    mockAxios
      .onGet(`${fakeApiUrl}/networks/network-1/documents`)
      .replyOnce(200, { data: [document] })
    mockAxios.onGet(`${fakeApiUrl}/networks/network-1/documents/documentname`).reply(() => {
      const newData = { ...document, document_versions: versions }
      return [200, { data: newData }]
    })

    // Render
    const { getByText, getByTestId } = renderWithMockedRouter(
      () => (
        <Providers mockAxios={mockAxios}>
          <NetworkManageProvider>
            <Documents />
          </NetworkManageProvider>
        </Providers>
      ),
      { path: "/networks/network-1", route: "/networks/network-1?manage=documents" }
    )

    // Wait for data to load
    await waitFor(() => {
      expect(() => getByText("No data is available for display")).toThrowError()
    })

    const panel = getByTestId("network_documents_panel-flyout_panel-wrapper")

    // Select document
    const rowSelectButton = getByTestId("network_documents-table-actions_button_0")
    userEvent.click(rowSelectButton)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    // Timeline should show after document loads
    expect(getByTestId("timeline-timeline-wrapper")).toBeInTheDocument()

    // Close the panel
    const closePanelButton = getByTestId("network_documents_panel-flyout_panel-body_close")
    userEvent.click(closePanelButton)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-80rem")
    })

    // Open the panel again
    userEvent.click(rowSelectButton)
    await waitFor(() => {
      expect(panel).toHaveStyleRule("right", "-40rem")
    })

    // This test should provide that, as the same row has been selected there is no need to load
    // the data again and retain the previous data.
    expect(getByTestId("timeline-timeline-wrapper")).toBeInTheDocument()
  })
})
