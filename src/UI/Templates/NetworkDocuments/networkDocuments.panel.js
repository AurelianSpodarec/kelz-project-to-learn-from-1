import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import NetworkDocumentView from "./networkDocuments.panel.view"
import NetworkDocumentEdit from "./networkDocuments.panel.edit"

const NetworkDocumentsPanel = () => (
  <FlyOutPanel
    body={() => <NetworkDocumentView />}
    wideBody={() => <NetworkDocumentEdit />}
    name="network_documents_panel"
  />
)

export default NetworkDocumentsPanel
