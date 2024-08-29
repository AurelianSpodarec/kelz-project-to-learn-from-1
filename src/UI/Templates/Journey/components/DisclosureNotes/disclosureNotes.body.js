import React, { useContext } from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import { Toggle } from "@4cplatform/elements/Forms"
import { P } from "@4cplatform/elements/Typography"

// Components
import Notes from "./disclosureNotes.notes"
import AddEditModal from "./addEditModal"
import { DisclosureNotesContext } from "./disclosureNotes.context"
import { JourneyContext } from "../../journey.context"
import { ConfirmationModal } from "../../../../Molecules"

const Body = ({ data }) => {
  const { noteFormTemplate, noteDisplayTemplate, name, ...restData } = data
  const { setAddEditModal, confirmationModal, setConfirmationModal, noteToDelete, deleteLoading } =
    useContext(DisclosureNotesContext)
  const { formik, isLoading } = useContext(JourneyContext)

  const onToggleChange = (value, fieldName) => {
    if (value) {
      setAddEditModal({ type: "new", isOpen: true, field: fieldName, noteInitialValues: {} })
      formik.setFieldValue(fieldName, value)
    } else if (!value) {
      setConfirmationModal({
        ...confirmationModal,
        warningText: "All the associated disclosure notes will be deleted.",
        isOpen: true,
        fieldName,
        query: "deleteAllNotes"
      })
    }
  }
  if (isLoading) return ""
  return (
    <>
      <Toggle
        {...restData}
        labelWidth="auto"
        margin="1rem 0"
        onChange={value => onToggleChange(value, name)}
        value={get(formik, `values.${name}`)}
        name={name}
        isDisabled={!isEmpty(noteToDelete.notesArrayToDelete) || deleteLoading}
      />
      <Notes fieldName={name} noteDisplayTemplate={noteDisplayTemplate} />
      <AddEditModal noteFormTemplate={noteFormTemplate} />
      {confirmationModal.isOpen && (
        <ConfirmationModal
          confirmIcon="cancel"
          confirmText="Yes"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() =>
            setConfirmationModal({
              ...confirmationModal,
              closedSelected: true,
              confirmedSelected: false
            })
          }
          onConfirm={() =>
            setConfirmationModal({
              ...confirmationModal,
              closedSelected: false,
              confirmedSelected: true
            })
          }
        >
          <P>{confirmationModal.warningText}</P>
        </ConfirmationModal>
      )}
    </>
  )
}
Body.defaultProps = {
  data: {}
}

Body.propTypes = {
  data: PropTypes.object
}
export default Body
