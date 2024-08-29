import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import OrganisationDocumentView from "./organisationDocuments.panel.view"

const OrganisationDocumentsPanel = () => (
  <FlyOutPanel body={() => <OrganisationDocumentView />} name="organisation_documents_panel" />
)

export default OrganisationDocumentsPanel
