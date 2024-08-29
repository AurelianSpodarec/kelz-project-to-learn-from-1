import React from "react"

// Components
import { Tabs, Tab } from "../../../../UI/Organisms"
import NetworkAgencyCodes from "./pages/NetworkAgencyCodes"
import NetworkAgencyCodeRequests from "../AgencyCodeRequests"

const AgencyCodesTabs = props => (
  <Tabs hasQueryControls type="table" name="agency_codes_type" {...props}>
    <Tab header="Agency codes">
      <NetworkAgencyCodes />
    </Tab>
    <Tab header="Pending requests">
      <NetworkAgencyCodeRequests />
    </Tab>
    <Tab header="Shared with organisations">
      <NetworkAgencyCodes isSharedWith />
    </Tab>
  </Tabs>
)

export default AgencyCodesTabs
