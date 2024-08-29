/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { within } from "@testing-library/react"

// Components
import ApiStatusAdmin from "."
import StoryApiStatusProvider from "./story/status.story.provider"

// Helpers
import { Providers } from "../../Helpers"

const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <StoryApiStatusProvider value={value}>
      <Container style={{ position: "static" }} data-testid="jest_container">
        <ApiStatusAdmin {...props} />
      </Container>
    </StoryApiStatusProvider>
  </Providers>
)

describe("<ApiStatusAdmin />", () => {
  test("Basic component & styles", () => {
    // Render
    const { getByTestId, container } = renderWithTheme(<TestComponent />)
    const testWrapper = getByTestId("jest_container")

    // Headers
    expect(within(testWrapper).getAllByText("Provider").length).toBe(1)
    expect(within(testWrapper).getAllByText("Status").length).toBe(1)
    expect(within(testWrapper).getAllByText("Message").length).toBe(1)
    expect(within(testWrapper).getAllByText("Response time").length).toBe(1)

    // Content
    expect(within(testWrapper).getAllByText("Aviva").length).toBe(1)
    expect(within(testWrapper).getAllByText("AXA").length).toBe(1)
    expect(within(testWrapper).getAllByText("Bupa").length).toBe(1)
    expect(within(testWrapper).getAllByText("The Exeter").length).toBe(1)
    expect(within(testWrapper).getAllByText("OK").length).toBe(3)
    expect(within(testWrapper).getAllByText("Success").length).toBe(3)
    expect(within(testWrapper).getAllByText("TIMED_OUT").length).toBe(1)
    expect(within(testWrapper).getAllByText("Failure").length).toBe(1)

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
})
