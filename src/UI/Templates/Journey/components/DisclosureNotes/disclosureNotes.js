import React from "react"

// Componenets
import DisclosureNotesProvider from "./context/disclosureNotes.provider"
import Body from "./disclosureNotes.body"

const DisclosureNotes = props => (
  <DisclosureNotesProvider>
    <Body data={props} />
  </DisclosureNotesProvider>
)

export default DisclosureNotes
