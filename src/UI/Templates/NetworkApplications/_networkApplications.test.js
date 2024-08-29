/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"
import { Container } from "@4cplatform/elements/Atoms"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Components
import NetworkApplications from "."
import StoryNetworkApplicationsProvider from "./story/networkApplications.story.provider"

// Helpers
import { Providers } from "../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <StoryNetworkApplicationsProvider value={value}>
      <Container style={{ position: "static" }}>
        <NetworkApplications {...props} />
      </Container>
    </StoryNetworkApplicationsProvider>
  </Providers>
)

describe("<NetworkApplications />", () => {
  test("Basic component & styles", () => {
    const { getByTestId, queryAllByText, container } = renderWithTheme(<TestComponent />)
    const search = getByTestId("search_network_applications-input")
    const actions = getByTestId("network_applications-actions-wrapper")
    const accept = queryAllByText("Accept")[0]
    const reject = queryAllByText("Reject")[0]

    expect(search).toBeInTheDocument()
    expect(actions).toBeInTheDocument()
    expect(accept).toBeInTheDocument()
    expect(reject).toBeInTheDocument()

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Accept modal", async () => {
    const mockOnAccept = jest.fn()
    const { queryAllByText, getByText } = renderWithTheme(
      <TestComponent value={{ onAcceptApplication: mockOnAccept }} />
    )

    const accept = queryAllByText("Accept")[0]

    userEvent.click(accept)
    await waitFor(() => {
      expect(getByText("Are you sure?")).toBeInTheDocument()
    })

    userEvent.click(getByText("Accept application"))
    await waitFor(() => {
      expect(mockOnAccept).toHaveBeenCalledTimes(1)
    })
  })
  test("Reject modal", async () => {
    const mockOnReject = jest.fn()

    const { queryAllByText, getByText } = renderWithTheme(
      <TestComponent value={{ onRejectApplication: mockOnReject }} />
    )

    const reject = queryAllByText("Reject")[0]

    userEvent.click(reject)
    await waitFor(() => {
      expect(getByText("Are you sure?")).toBeInTheDocument()
    })

    userEvent.click(getByText("Reject application"))
    await waitFor(() => {
      expect(mockOnReject).toHaveBeenCalledTimes(1)
    })
  })
})
