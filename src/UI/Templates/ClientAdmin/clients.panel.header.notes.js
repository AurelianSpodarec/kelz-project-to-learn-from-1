import React, { useContext } from "react"
import { Modal } from "@4cplatform/elements/Molecules"
import { v4 as uuid } from "uuid"

// Helpers
import { ClientsContext } from "./clients.context"

// Components
import { Notes } from "../../Molecules"

const ClientNotes = () => {
  const { clientNotes, setNotesModal, getNotesLoading, onAddNote, addNoteLoading } =
    useContext(ClientsContext)

  return (
    <>
      <Modal
        title="Notes"
        onClose={() => setNotesModal(false)}
        name="notes_modal"
        hasPadding={false}
      >
        <Notes
          width="100%"
          hasHeader={false}
          isLoading={getNotesLoading || addNoteLoading}
          onAddNote={onAddNote}
          onAddNoteCancel={() => setNotesModal(false)}
          notes={
            !Array.isArray(clientNotes)
              ? []
              : clientNotes.map(item => {
                  const { body: note, created_by: user, created_at: created } = item
                  return { id: uuid(), note, user, created_at: created }
                })
          }
        />
      </Modal>
    </>
  )
}

export default ClientNotes
