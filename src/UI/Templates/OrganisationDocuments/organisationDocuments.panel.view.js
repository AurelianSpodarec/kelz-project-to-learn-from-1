import React from "react"
import { get } from "lodash"

// Helpers
import { OrganisationDocumentsContext } from "./organisationDocuments.context"
import { formatVersionsAsEvents } from "./organisationDocuments.helpers"

// Components
import { PanelBody } from "../../Molecules/FlyOutPanel"
import { Timeline } from "../../Organisms"
import OrganisationDocumentPanelHeader from "./organisationDocuments.panel.header"

const OrganisationDocumentView = () => {
  const { selectedDocument, onVersionClick } = React.useContext(OrganisationDocumentsContext)
  const versions = get(selectedDocument, "document_versions", [])
  const current = get(selectedDocument, "current_active_version")

  return (
    <>
      <OrganisationDocumentPanelHeader selectedDocument={selectedDocument} context="open" />
      <PanelBody>
        <Timeline
          events={formatVersionsAsEvents({
            versions,
            current,
            onClick: () => onVersionClick(current)
          })}
        />
      </PanelBody>
    </>
  )
}

export default OrganisationDocumentView
