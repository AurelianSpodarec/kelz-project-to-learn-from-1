import React from "react"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { NetworkDocumentsContext } from "./networkDocuments.context"
import { formatVersionsAsEvents } from "./networkDocuments.helpers"

// Components
import { PanelBody } from "../../Molecules/FlyOutPanel"
import { Timeline } from "../../Organisms"
import UploadNewVersion from "./networkDocuments.panel.view.upload"
import NetworkDocumentPanelHeader from "./networkDocuments.panel.header"

const NetworkDocumentView = () => {
  const { selectedDocument, onVersionClick, newVersion, setNewVersion } =
    React.useContext(NetworkDocumentsContext)
  const versions = get(selectedDocument, "document_versions", [])
  const current = get(selectedDocument, "current_active_version")

  return (
    <>
      <NetworkDocumentPanelHeader context="open" />
      <PanelBody>
        <Timeline events={formatVersionsAsEvents({ versions, current, onClick: onVersionClick })} />
        <Button
          appearance="whiteGhost"
          trailingIcon="tray-arrow-up"
          onClick={() => setNewVersion(true)}
        >
          Upload new version
        </Button>
        {newVersion && <UploadNewVersion />}
      </PanelBody>
    </>
  )
}

export default NetworkDocumentView
