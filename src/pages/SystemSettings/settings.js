import React from "react"
import { Helmet } from "react-helmet-async"
import { H1 } from "@4cplatform/elements/Typography"

// Helpers
import { DASHBOARD } from "../../config/pages"

// Components
import { Wrapper } from "./settings.styles"
import { Breadcrumbs } from "../../UI/Molecules"
import { SystemSettings as Settings } from "../../UI/Templates"
import SystemSettingsProvider from "./context/settings.provider"

const SystemSettings = () => (
  <>
    <Helmet>
      <title>System Settings</title>
    </Helmet>
    <SystemSettingsProvider>
      <Wrapper>
        <Breadcrumbs
          trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "System Settings" }]}
        />
        <H1 margin="0 0 6rem">System Settings</H1>
        <Settings />
      </Wrapper>
    </SystemSettingsProvider>
  </>
)

export default SystemSettings
