import React, { useContext } from "react"
import { Button } from "@4cplatform/elements/Molecules"
import { P } from "@4cplatform/elements/Typography"

// Components
import { ConfirmationModal } from "../../Molecules"

// Helpers
import { LeadsContext } from "./leads.context"

const DeleteLead = () => {
  const { selectedLead, deleteOpen, setDeleteOpen, deleteLoading, onDeleteLead } =
    useContext(LeadsContext)
  return (
    <>
      {!selectedLead.has_active_journeys && (
        <Button
          appearance="error"
          trailingIcon="delete"
          margin="0 2rem 0 0"
          onClick={() => setDeleteOpen(true)}
          name="delete_lead"
        >
          Delete Lead
        </Button>
      )}
      {deleteOpen && (
        <ConfirmationModal
          conformIcon="delete"
          confirmText="Delete"
          confirmAppearance="error"
          isLoadingConfirm={deleteLoading}
          cancelAppearance="errorGhost"
          onClose={() => setDeleteOpen(false)}
          onConfirm={onDeleteLead}
        >
          <P>Are you sure you want to delete this Lead?</P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default DeleteLead
