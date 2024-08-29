import React from "react"
import { Button, Modal } from "@4cplatform/elements/Molecules"
import { v4 as uuid } from "uuid"

// Helpers
import { LeadsContext } from "./leads.context"

// Components
import { Notes } from "../../Molecules"

const LeadNotes = () => {
  const { leadNotes, notesModal, setNotesModal, notesLoading, onAddNote, noteCreateLoading } =
    React.useContext(LeadsContext)

  return (
    <>
      <Button
        appearance="whiteGhost"
        name="add_note"
        margin="2rem 0"
        trailingIcon="playlist-plus"
        onClick={() => setNotesModal(true)}
      >
        Add note
      </Button>
      {notesModal && (
        <Modal
          title="Notes"
          onClose={() => setNotesModal(false)}
          name="notes_modal"
          hasPadding={false}
        >
          <Notes
            width="100%"
            hasHeader={false}
            isLoading={notesLoading || noteCreateLoading}
            onAddNote={str => onAddNote(str)}
            onAddNoteCancel={() => setNotesModal(false)}
            notes={
              !Array.isArray(leadNotes)
                ? []
                : leadNotes.map(item => {
                    const { body: note, created_by: user, created_at: created } = item
                    return { id: uuid(), note, user, created_at: created }
                  })
            }
          />
        </Modal>
      )}
    </>
  )
}

export default LeadNotes
