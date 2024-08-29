import React from "react"

// Components
import { Tabs, Tab } from "../../Organisms"
import SalesSettings from "./organisationSettings.sales"
import JourneySettings from "./organisationSettings.journey"
import QuickQuoteSettings from "./organisationSettings.quickQuote"

const OrganisationSettings = () => (
  <Tabs margin="0" type="vertical" hasQueryControls name="settings">
    <Tab header="Sales Preferences">
      <SalesSettings />
    </Tab>
    <Tab header="Client Journey">
      <JourneySettings />
    </Tab>
    <Tab header="Quick Quote">
      <QuickQuoteSettings />
    </Tab>
  </Tabs>
)

export default OrganisationSettings
