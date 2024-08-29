import React from "react"

// Components
import { Tabs, Tab } from "../../../../UI/Organisms"
import Codes from "./pages/AgencyCodes/agencyCodes"
import SharedAgencyCodes from "./pages/SharedAgencyCodes/sharedAgencyCodes"

const AgencyCodes = () => (
  <Tabs hasQueryControls type="table" name="agency_codes_type">
    <Tab header="Agency codes">
      <Codes />
    </Tab>
    <Tab header="Shared with me">
      <SharedAgencyCodes />
    </Tab>
  </Tabs>
)

export default AgencyCodes
