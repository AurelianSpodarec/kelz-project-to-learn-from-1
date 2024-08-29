import React from "react"

// Components
import OrganisationSettingsProvider from "./context/settings.provider"
import { OrganisationSettings } from "../../../../UI/Templates"

const Settings = () => (
  <OrganisationSettingsProvider>
    <OrganisationSettings />
  </OrganisationSettingsProvider>
)

export default Settings
