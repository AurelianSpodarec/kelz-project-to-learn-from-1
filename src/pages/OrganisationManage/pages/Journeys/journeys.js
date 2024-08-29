import React from "react"

// Components
import JourneysProvider from "./context/journeys.provider"
import { JourneyAdmin, JourneysPanel } from "../../../../UI/Templates"

const Journeys = () => (
  <JourneysProvider>
    <JourneyAdmin />
    <JourneysPanel />
  </JourneysProvider>
)

export default Journeys
