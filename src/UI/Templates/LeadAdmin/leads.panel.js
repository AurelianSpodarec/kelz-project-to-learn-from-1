import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import ViewLead from "./leads.panel.view"
import EditLead from "./leads.panel.edit"

const LeadsPanel = () => (
  <FlyOutPanel body={() => <ViewLead />} wideBody={() => <EditLead />} name="leads_panel" />
)

export default LeadsPanel
