import React from "react"
import PropTypes from "prop-types"
import { Button, Modal } from "@4cplatform/elements/Molecules"
import { P } from "@4cplatform/elements/Typography"
import { get } from "lodash"

// Helpers
import { ApplicantsContext } from "./applicants.context"

// Components
import { ButtonsWrapper } from "./applicants.styles"
import ApplicantForm from "./applicants.applicant.form"
import { ConfirmationModal } from "../../../../../../../../Molecules"

const RowActions = ({ applicant: theApplicant }) => {
  const {
    setEditApplicantModal,
    editApplicantModal,
    setDeleteApplicantModal,
    deleteApplicantModal,
    deleteApplicant,
    deleteApplicantLoading
  } = React.useContext(ApplicantsContext)
  const applicant = { ...theApplicant, type: theApplicant.type.toLowerCase() }

  const isPrimary = get(applicant, "type") === "primary"

  if (isPrimary) return null

  return (
    <>
      <ButtonsWrapper>
        <Button
          type="inline-button"
          appearance="primaryInline"
          onClick={() => setEditApplicantModal({ isOpen: true, applicant })}
        >
          Edit
        </Button>
        <Button
          type="inline-button"
          appearance="errorInline"
          onClick={() => setDeleteApplicantModal({ isOpen: true, applicant })}
        >
          Delete
        </Button>
      </ButtonsWrapper>
      {/* Edit applicant modal */}
      {editApplicantModal.isOpen &&
        get(editApplicantModal, "applicant.slug") === get(applicant, "slug") && (
          <Modal
            onClose={() => setEditApplicantModal({ isOpen: false, applicant: null })}
            type={get(applicant, "type")}
            name="update_applicant"
            title="Edit applicant"
          >
            <ApplicantForm type={get(applicant, "type")} applicant={applicant} isEdit />
          </Modal>
        )}
      {/* Delete applicant modal */}
      {deleteApplicantModal.isOpen &&
        get(deleteApplicantModal, "applicant.slug") === get(applicant, "slug") && (
          <ConfirmationModal
            confirmIcon="delete"
            confirmText="Yes"
            confirmAppearance="error"
            cancelAppearance="errorGhost"
            onClose={() => setDeleteApplicantModal({ isOpen: false, applicant: null })}
            onConfirm={() => deleteApplicant(applicant)}
            isLoadingConfirm={deleteApplicantLoading}
          >
            <P>Are you sure you want to remove the current applicant from the applicant list?</P>
          </ConfirmationModal>
        )}
    </>
  )
}

RowActions.propTypes = {
  applicant: PropTypes.object.isRequired
}

export default RowActions
