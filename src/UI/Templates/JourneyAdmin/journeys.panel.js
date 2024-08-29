import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import JourneyView from "./journeys.panel.view"

const JourneysPanel = () => <FlyOutPanel body={() => <JourneyView />} name="journeys_panel" />

export default JourneysPanel
