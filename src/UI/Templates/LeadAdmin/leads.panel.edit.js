import React from "react"

// Helpers
import { LeadsContext } from "./leads.context"
import { PageContext } from "../../Organisms"

// Components
import { PanelBody } from "../../Molecules/FlyOutPanel"
import LeadsPanelHeader from "./leads.panel.header"
import EditLeadForm from "./leads.panel.edit.form"

const EditLead = () => {
  const { selectedLead } = React.useContext(LeadsContext)
  const {
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)

  return (
    <>
      <LeadsPanelHeader selectedLead={selectedLead} context="wide" />
      {!!selectedLead && panelStatus !== "closed" && (
        <PanelBody>
          <EditLeadForm selectedLead={selectedLead} />
        </PanelBody>
      )}
    </>
  )
}

export default EditLead
