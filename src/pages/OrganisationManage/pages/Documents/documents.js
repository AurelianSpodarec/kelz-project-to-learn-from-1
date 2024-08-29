import React from "react"

// Components
import OrganisationDocumentsProvider from "./context/documents.provider"
import { OrganisationDocuments, OrganisationDocumentsPanel } from "../../../../UI/Templates"

const Documents = () => (
  <OrganisationDocumentsProvider>
    <OrganisationDocuments />
    <OrganisationDocumentsPanel />
  </OrganisationDocumentsProvider>
)

export default Documents
