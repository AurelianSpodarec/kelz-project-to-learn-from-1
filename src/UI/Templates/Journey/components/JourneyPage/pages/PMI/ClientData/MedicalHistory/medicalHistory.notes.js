import React, { useContext, Fragment } from "react"
import { get } from "lodash"
import moment from "moment"
import { Button, Modal } from "@4cplatform/elements/Molecules"
import { H2, H3, P } from "@4cplatform/elements/Typography"

// Helpers
import { MedicalHistoryContext } from "./medicalHistory.context"
import { getName } from "../../../../../../../../Helpers"

// Components
import {
  NotesWrapper,
  AddNoteButtonWrapper,
  NotesTitleWrapper,
  NotesNumberWrapper
} from "./medicalHistory.styles"
import NoteForm from "./medicalHistory.notes.form"
import { ConfirmationModal } from "../../../../../../../../Molecules"
import { TextSetting } from "../../../../../../../../Organisms"

const AddNoteModalTitle = () => (
  <H2
    margin="0"
    helperTitle="Note"
    helperText={`
  <p>Where possible, please obtain the following information from the client in relation to the condition disclosed:</p>
  <ul>
    <li>Diagnosis.</li>
    <li>Nature of symptoms (if no diagnosis made).</li>
    <li>Date of first symptoms and when saw GP/Specialist.</li>
    <li>Nature of treatment received.</li>
    <li>Date of last symptoms/treatment.</li>
    <li>Any known underlying cause.</li>
    <li>Specific location suffered on the body (including the left or right side).</li>
    <li>Any prognosis.</li>
  </ul>
`}
  >
    Add a note
  </H2>
)

const Notes = () => {
  const {
    notes,
    applicants,
    notesLoading,
    setNotesModal,
    notesModal,
    addNoteLoading,
    updateNoteLoading,
    onDeleteNote,
    onCancelEditForm,
    saveChangesForNoteModal,
    setSaveChangesForNoteModal,
    deleteNoteModal,
    setDeleteNoteModal,
    deleteNoteLoading,
    onEditHandleSubmit,
    setSelectedNote,
    selectedNote
  } = useContext(MedicalHistoryContext)
  return (
    <NotesWrapper>
      {
        <NotesTitleWrapper>
          <H3 margin="0 0 2rem">Medical Notes</H3>
          {notes.length && !notesLoading && !updateNoteLoading && !deleteNoteLoading ? (
            <NotesNumberWrapper>
              <P margin="0" appearance="light">{`${notes.length}`}</P>
            </NotesNumberWrapper>
          ) : (
            <P margin="0.5rem 0 0 2rem">No notes exist</P>
          )}
        </NotesTitleWrapper>
      }

      {notesModal && (
        <Modal name="add_note_modal" CustomTitle={AddNoteModalTitle} hasClose={false}>
          <NoteForm />
        </Modal>
      )}

      {saveChangesForNoteModal && (
        <ConfirmationModal
          hasTrailingIcon={false}
          confirmText="Discard changes"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          cancelText="Cancel"
          onConfirm={() => {
            selectedNote === null ? setNotesModal(false) : setSelectedNote(null)
            setSaveChangesForNoteModal(false)
          }}
          onCancel={() => setSaveChangesForNoteModal(false)}
          onClose={() => setSaveChangesForNoteModal(false)}
          name="save_changes_for_note_modal"
          hasPadding={false}
        >
          <P>Are you sure you want to lose unsaved changes?</P>
        </ConfirmationModal>
      )}

      {notes.map(note => {
        const applicantData = applicants.find(
          applicant => applicant.id === note.journey_applicant_id
        )
        const applicantName = getName({ data: applicantData })
        const applicantId = get(applicantData, "id", "")
        const updatedAt = get(note, "updated_at")
        const updatedAtTimeStamp = moment(updatedAt, "YYYY-MM-DDTHH:mmZ")
          .local()
          .format("DD/MM/YYYY HH:mm")
        const condition = get(note, "condition")
        const noteText = get(note, "note")
        const journeyApplicantId = get(note, "journey_applicant_id")
        const noteId = get(note, "id")
        const noteSlug = get(note, "slug")

        return (
          <Fragment key={noteId}>
            <TextSetting
              name={`${journeyApplicantId}-${noteId}`}
              title={`${applicantName} ${updatedAtTimeStamp}`}
              content={
                !(selectedNote === noteId) ? (
                  <>
                    <H3
                      name="condition"
                      isLoading={
                        notesLoading || addNoteLoading || updateNoteLoading || deleteNoteLoading
                      }
                    >
                      {condition}
                    </H3>
                    <P
                      name="note"
                      isLoading={
                        notesLoading || addNoteLoading || updateNoteLoading || deleteNoteLoading
                      }
                    >
                      {noteText}
                    </P>
                  </>
                ) : (
                  <NoteForm noteData={{ applicantId, condition, noteText, noteSlug }} isEdit />
                )
              }
              canEditHTML={false}
              isCustomContent
              isLoading={notesLoading || addNoteLoading || updateNoteLoading || deleteNoteLoading}
              isHeaderButtonDisabled={selectedNote === noteId}
              helperText="Where possible, please obtain the following information from the client in relation to the condition disclosed:
<li>Diagnosis.</li>
<li>Nature of symptoms (if no diagnosis made).</li>
<li>Date of first symptoms and when saw GP/Specialist.</li>
<li>Nature of treatment received.</li>
<li>Date of last symptoms/treatment.</li>
<li>Any known underlying cause.</li>
<li>Specific location suffered on the body (including the left or right side).</li>
<li>Any prognosis.</li>"
              isEdit={selectedNote === noteId}
              setEdit={() => setSelectedNote(noteId)}
              onDelete={() => setDeleteNoteModal(true)}
              onEdit={onEditHandleSubmit}
              onCancel={onCancelEditForm}
              shouldShowDeleteOnEdit
            />
            {deleteNoteModal && (
              <ConfirmationModal
                confirmIcon="cancel"
                confirmText="Yes"
                confirmAppearance="error"
                cancelAppearance="errorGhost"
                onClose={() => setDeleteNoteModal(false)}
                onConfirm={() => onDeleteNote(noteSlug)}
                name="delete_note_modal"
                hasPadding={false}
                isLoadingConfirm={deleteNoteLoading}
                isLoadingCancel={deleteNoteLoading}
              >
                <P>Are you sure you want to delete this note?</P>
              </ConfirmationModal>
            )}
          </Fragment>
        )
      })}

      <AddNoteButtonWrapper>
        {selectedNote === null && (
          <Button
            name="add_new_note"
            trailingIcon="message-plus"
            isLoading={addNoteLoading || notesLoading || updateNoteLoading || deleteNoteLoading}
            onClick={setNotesModal}
          >
            Add Note
          </Button>
        )}
      </AddNoteButtonWrapper>
    </NotesWrapper>
  )
}
export default Notes
