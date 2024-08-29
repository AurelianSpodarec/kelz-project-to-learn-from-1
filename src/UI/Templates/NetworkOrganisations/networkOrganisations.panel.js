import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import NetworkOrganisationView from "./networkOrganisations.panel.view"

const NetworkOrganisationsPanel = () => (
  <FlyOutPanel body={() => <NetworkOrganisationView />} name="network_organisations_panel" />
)

export default NetworkOrganisationsPanel
