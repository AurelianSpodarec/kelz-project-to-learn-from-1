/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Helpers
import { Providers, fakeSelfServiceResponse } from "../../Helpers"

// Components
import StartJourney from "."

const TestComponent = ({ user, clientJourneys }) => (
  <Providers user={user}>
    <StartJourney clientSlug="john-smith" clientJourneys={clientJourneys} />
  </Providers>
)

describe("<StartJourney />", () => {
  test("Basic styling and appearance", async () => {
    const { getByTestId, queryByTestId, container } = renderWithTheme(
      <TestComponent clientJourneys={0} />
    )

    const startJourneyButton = getByTestId("start_journey-button")

    expect(startJourneyButton).toBeInTheDocument()

    // Simulating click to open the journeys modal
    fireEvent.click(startJourneyButton)

    await waitFor(() => {
      const startJourneyModalButton = getByTestId("start_journey_modal-button")
      expect(startJourneyModalButton).toBeInTheDocument()

      const newJourneyModalButton = queryByTestId("view_incomplete_journeys_link")
      expect(newJourneyModalButton).toBeNull()
    })

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Show Start and Cancel buttons if simulation mode is off and there are no incomplete journeys", async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(<TestComponent clientJourneys={0} />)

    const startJourneyButton = getByTestId("start_journey-button")

    expect(startJourneyButton).toBeInTheDocument()

    // Simulating click to open the journeys modal
    fireEvent.click(startJourneyButton)

    await waitFor(() => {
      expect(getByTestId("start_journey_modal-button")).toBeInTheDocument()
      expect(getByTestId("cancel_journey_modal-button")).toBeInTheDocument()
      expect(queryByTestId("new_journey-button")).toBeNull()
      expect(queryByTestId("view_incomplete_journeys-button")).toBeNull()
    })
  })

  test("Show Start a New Journey and View Incomplete journey buttons if simulation mode is off and there are incomplete journeys", async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(<TestComponent clientJourneys={1} />)

    const startJourneyButton = getByTestId("start_journey-button")

    expect(startJourneyButton).toBeInTheDocument()

    // Simulating click to open the journeys modal
    fireEvent.click(startJourneyButton)

    await waitFor(() => {
      expect(getByTestId("new_journey-button")).toBeInTheDocument()
      expect(getByTestId("view_incomplete_journeys-button")).toBeInTheDocument()
      expect(queryByTestId("start_journey_modal-button")).toBeNull()
      expect(queryByTestId("cancel_journey_modal-button")).toBeNull()
    })
  })

  test("Show Yes and No buttons if simulation mode is on and there are no incomplete journeys", async () => {
    const user = { ...fakeSelfServiceResponse }
    user.data.role = { name: "SALES_ADVISER" }
    user.data.settings = [
      ...user.data.settings,
      {
        id: 16,
        group: "SALES_SETTINGS",
        key: "SIMULATION_MODE",
        data: {
          value: true
        }
      }
    ]

    const { getByTestId, queryByTestId, getByText } = renderWithTheme(
      <TestComponent user={user} clientJourneys={0} />
    )

    const startJourneyButton = getByTestId("start_journey-button")

    expect(startJourneyButton).toBeInTheDocument()

    // Simulating click to open the journeys modal
    fireEvent.click(startJourneyButton)

    await waitFor(() => {
      expect(getByText("Simulation mode is currently active")).toBeInTheDocument()
      expect(
        getByText(
          "Simulation mode is for training purposes only and should never be used for quoting or advising a client."
        )
      ).toBeInTheDocument()
      expect(
        getByText(
          "To ensure accurate pricing, reports and documentation, please switch to the live environment before progressing to the next stage."
        )
      ).toBeInTheDocument()
      expect(getByText("Is this a training exercise?")).toBeInTheDocument()
      expect(getByTestId("new_journey-button")).toBeInTheDocument()
      expect(getByTestId("cancel_journey_modal-button")).toBeInTheDocument()

      expect(queryByTestId("start_journey_modal-button")).toBeNull()
      expect(queryByTestId("view_incomplete_journeys-button")).toBeNull()
    })
  })

  test("Show Start a New Journey and View incomplete journeys buttons along with simulation mode checkbox if simulation mode is on and there are incomplete journeys", async () => {
    const user = { ...fakeSelfServiceResponse }
    user.data.role = { name: "SALES_ADVISER" }
    user.data.settings = [
      ...user.data.settings,
      {
        id: 16,
        group: "SALES_SETTINGS",
        key: "SIMULATION_MODE",
        data: {
          value: true
        }
      }
    ]

    const { getByTestId, queryByTestId, getByText } = renderWithTheme(
      <TestComponent user={user} clientJourneys={1} />
    )

    const startJourneyButton = getByTestId("start_journey-button")

    expect(startJourneyButton).toBeInTheDocument()

    // Simulating click to open the journeys modal
    fireEvent.click(startJourneyButton)

    await waitFor(() => {
      expect(getByText("Simulation mode is currently active")).toBeInTheDocument()
      expect(
        getByText(
          "Simulation mode is for training purposes only and should never be used for quoting or advising a client."
        )
      ).toBeInTheDocument()
      expect(
        getByText(
          "To ensure accurate pricing, reports and documentation, please switch to the live environment before progressing to the next stage."
        )
      ).toBeInTheDocument()
      expect(getByTestId("simulation_mode-checkbox-checkbox")).toBeInTheDocument()
      expect(getByText("Continue with simulation mode")).toBeInTheDocument()
      expect(getByText("You have incomplete journeys")).toBeInTheDocument()
      expect(
        getByText("There is 1 incomplete journey associated with this client.")
      ).toBeInTheDocument()
      expect(getByText("Start a New journey")).toBeInTheDocument()
      expect(getByText("View incomplete journeys")).toBeInTheDocument()
      expect(queryByTestId("start_journey_modal-button")).toBeNull()
      expect(queryByTestId("cancel_journey_modal-button")).toBeNull()
    })
  })
})
