import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import OrganisationView from "./organisations.panel.view"

const OrganisationsPanel = () => (
  <FlyOutPanel body={() => <OrganisationView />} name="organisations_panel" />
)

export default OrganisationsPanel
