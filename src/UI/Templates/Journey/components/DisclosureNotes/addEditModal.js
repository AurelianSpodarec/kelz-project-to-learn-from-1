import React, { useContext } from "react"
import { get } from "lodash"
import { ConfirmationModal } from "../../../../Molecules"
import { DisclosureNotesContext } from "./disclosureNotes.context"
import { JourneyContext } from "../../journey.context"

const AddEditModal = noteFormTemplate => {
  const { isLoading } = useContext(JourneyContext)
  const { addEditModal, handleSubmit, disclosureNoteCreating, updateNoteLoading, onCancelOrClose } =
    useContext(DisclosureNotesContext)

  const NoteFormComponent = get(noteFormTemplate, "noteFormTemplate", "")
  if (!isLoading && addEditModal.isOpen) {
    return (
      <ConfirmationModal
        confirmIcon="accept"
        confirmText={addEditModal.type !== "edit" ? "Add note" : "Edit note"}
        confirmAppearance="primary"
        isLoadingConfirm={disclosureNoteCreating || updateNoteLoading}
        onClose={onCancelOrClose}
        onConfirm={handleSubmit}
        onCancel={onCancelOrClose}
      >
        <NoteFormComponent />
      </ConfirmationModal>
    )
  }
  return null
}

export default AddEditModal
