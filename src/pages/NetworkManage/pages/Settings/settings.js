import React from "react"

// Components
import NetworkSettingsProvider from "./context/settings.provider"
import { NetworkSettings } from "../../../../UI/Templates"
import { Wrapper } from "./settings.styles"

const Settings = () => (
  <NetworkSettingsProvider>
    <Wrapper>
      <NetworkSettings />
    </Wrapper>
  </NetworkSettingsProvider>
)

export default Settings
