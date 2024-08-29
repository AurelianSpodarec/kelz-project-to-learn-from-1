import React from "react"

// Components
import NetworkDocumentsProvider from "./context/documents.provider"
import { NetworkDocuments, NetworkDocumentsPanel } from "../../../../UI/Templates"

const Documents = () => (
  <NetworkDocumentsProvider>
    <NetworkDocuments />
    <NetworkDocumentsPanel />
  </NetworkDocumentsProvider>
)

export default Documents
