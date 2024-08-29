import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { object, string } from "yup"
import { get } from "lodash"
import { Input, Select, TextArea } from "@4cplatform/elements/Forms"
import { useFormik } from "formik"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { MedicalHistoryContext } from "./medicalHistory.context"
import { getName } from "../../../../../../../../Helpers"

// Components
import { ButtonsWrapper } from "./medicalHistory.styles"

const NoteForm = ({ noteData, isEdit }) => {
  const {
    applicants,
    addNoteLoading,
    addNote,
    setNotesModal,
    onUpdateNote,
    updateNoteLoading,
    onEditHandleSubmit,
    setOnCancelEditForm,
    setSaveChangesForNoteModal,
    setOnEditHandleSubmit,
    setSelectedNote
  } = React.useContext(MedicalHistoryContext)
  const validationSchema = object({
    journey_applicant_id: string().required("MISSING_REQUIRED_FIELD"),
    condition: string().required("MISSING_REQUIRED_FIELD"),
    note: string().required("MISSING_REQUIRED_FIELD")
  })
  const applicantId = get(noteData, "applicantId", "")
  const noteSlug = get(noteData, "noteSlug")

  const addMedicalNoteFormik = useFormik({
    initialValues: {
      journey_applicant_id: isEdit ? applicantId : "",
      condition: isEdit ? get(noteData, "condition", "") : "",
      note: isEdit ? get(noteData, "noteText", "") : ""
    },
    validationSchema,
    onSubmit: body => {
      if (!isEdit) {
        addNote({ body })
      } else {
        onUpdateNote(noteSlug, body)
        setSelectedNote(null)
      }
    }
  })

  const formik = { ...addMedicalNoteFormik, validationSchema }
  const { handleSubmit } = formik

  useEffect(() => {
    setOnEditHandleSubmit(handleSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setOnCancelEditForm(() => {
      formik.dirty ? setSaveChangesForNoteModal(true) : setSelectedNote(null)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.dirty])

  return (
    <>
      <Select
        margin="2rem"
        name="journey_applicant_id"
        label="Person to whom this note refers"
        formik={formik}
        isLoading={addNoteLoading || updateNoteLoading}
        isDisabled={isEdit}
      >
        <option value="">Select person</option>
        {applicants.map(applicant => (
          <option value={get(applicant, "id")} key={get(applicant, "id")}>
            {getName({ data: applicant })}
          </option>
        ))}
      </Select>
      <Input
        name="condition"
        width="initial"
        margin="2rem"
        formik={formik}
        label="Medical condition"
        isLoading={addNoteLoading || updateNoteLoading}
      />
      <TextArea
        name="note"
        formik={formik}
        margin="2rem"
        label="Note"
        isLoading={addNoteLoading || updateNoteLoading}
      />

      {!isEdit && (
        <ButtonsWrapper>
          <Button
            appearance="success"
            name="add_edit_note"
            trailingIcon="chevron-right"
            isLoading={addNoteLoading || updateNoteLoading}
            onClick={onEditHandleSubmit}
          >
            Add Note
          </Button>
          <Button
            appearance="error"
            name="cancel"
            onClick={() => (formik.dirty ? setSaveChangesForNoteModal(true) : setNotesModal(false))}
            trailingIcon="cancel"
            isLoading={addNoteLoading || updateNoteLoading}
          >
            Cancel
          </Button>
        </ButtonsWrapper>
      )}
    </>
  )
}

NoteForm.defaultProps = {
  isEdit: false,
  noteData: null
}

NoteForm.propTypes = {
  isEdit: PropTypes.bool,
  noteData: PropTypes.object
}

export default NoteForm
