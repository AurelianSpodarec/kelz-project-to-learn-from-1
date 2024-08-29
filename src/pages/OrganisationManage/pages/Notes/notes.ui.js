import React from "react"

// Helpers
import { OrganisationNotesContext } from "./context/notes.context"

// Components
import { Notes } from "../../../../UI/Molecules"

const NotesUI = () => {
  const { notes, notesLoading, createLoading, onCreateNote } =
    React.useContext(OrganisationNotesContext)
  return <Notes notes={notes} onAddNote={onCreateNote} isLoading={notesLoading || createLoading} />
}

export default NotesUI
