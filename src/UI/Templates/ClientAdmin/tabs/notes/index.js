import React, { useContext } from "react"

import { ClientsContext } from "../../clients.context"

// Components
import { Notes } from "../../../../Molecules"
import { PanelBody } from "../../../../Molecules/FlyOutPanel"
import ClientsPanelHeader from "../../clients.panel.header"
import ClientsPanelButtons from "../../clients.panel.body.buttons"

const ClientsNotesTab = () => {
  const { clientNotes, getNotesLoading, addNoteLoading } = useContext(ClientsContext)

  return (
    <PanelBody>
      <ClientsPanelHeader isWidePanel />
      <ClientsPanelButtons margin="3rem 0 1rem" />
      <Notes
        width="100%"
        hasHeader={false}
        onAddNote={() => {}}
        isNoteTab
        isLoading={getNotesLoading || addNoteLoading}
        notes={clientNotes.map(x => ({ ...x, user: x.created_by }))}
      />
    </PanelBody>
  )
}
export default ClientsNotesTab
