import React from "react"

// Components
import OrganisationNotesProvider from "./context/notes.provider"
import NotesUI from "./notes.ui"

const Notes = () => (
  <OrganisationNotesProvider>
    <NotesUI />
  </OrganisationNotesProvider>
)

export default Notes
