import React from "react"

// Components
import { MyAccountSettings } from "../../../../UI/Templates"
import MyAccountSettingsProvider from "./context/settings.provider"

const Settings = () => (
  <MyAccountSettingsProvider>
    <MyAccountSettings />
  </MyAccountSettingsProvider>
)

export default Settings
