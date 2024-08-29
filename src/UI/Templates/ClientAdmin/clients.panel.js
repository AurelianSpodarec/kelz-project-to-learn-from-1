import React, { useContext, useEffect } from "react"

// Components
import { FlyOutPanel } from "../../Molecules"
import { ClientsContext } from "./clients.context"
import ViewClient from "./clients.panel.view"
import EditClient from "./clients.panel.edit.form"
import ClientsPoliciesTab from "./tabs/policies"
import ClientsQuotesTab from "./tabs/quotes"
import ClientsNotesTab from "./tabs/notes"
import { PageContext } from "../../Organisms"

const ClientsPanel = () => {
  const { panelBodyContent, setPanelBodyContent } = useContext(ClientsContext)
  const { panelStatusControls, setPanelStatus } = useContext(PageContext)

  const getPanelBodyContent = () => {
    switch (panelBodyContent) {
      case "Policies":
        return <ClientsPoliciesTab />
      case "Quotes":
        return <ClientsQuotesTab />
      case "Notes":
        return <ClientsNotesTab />
      default:
        return <EditClient />
    }
  }

  useEffect(() => {
    if (
      panelStatusControls.panelStatus === "open" &&
      (panelBodyContent === "Policies" || panelBodyContent === "Quotes")
    ) {
      setPanelStatus("wide")
    }
  }, [panelStatusControls.panelStatus, panelBodyContent, setPanelStatus])

  useEffect(() => {
    if (panelStatusControls.panelStatus === "open") {
      setPanelBodyContent("Journey")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelStatusControls.panelStatus])

  return (
    <FlyOutPanel body={() => <ViewClient />} wideBody={getPanelBodyContent} name="clients_panel" />
  )
}
export default ClientsPanel
