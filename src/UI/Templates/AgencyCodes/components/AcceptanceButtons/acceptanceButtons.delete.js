import React from "react"
import { get } from "lodash"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import { ConfirmationModal } from "../../../../Molecules"

const DeleteAgencyCode = () => {
  const { viewData, setDeleteModal, onDelete, deleteLoading } = React.useContext(AgencyCodesContext)

  return (
    <>
      <ConfirmationModal
        title="Delete Agency Code"
        confirmText="Delete"
        confirmAppearance="error"
        confirmIcon="trash-can"
        cancelIcon="close"
        cancelText="Cancel"
        cancelAppearance="errorInline"
        isLoadingConfirm={deleteLoading}
        onClose={() => {
          setDeleteModal(false)
        }}
        onConfirm={onDelete}
        onCancel={() => {
          setDeleteModal(false)
        }}
      >
        <P>
          Are you sure you want to delete the <strong>{get(viewData, "agency_code")}</strong> Agency
          Code ?
        </P>
      </ConfirmationModal>
    </>
  )
}

export default DeleteAgencyCode
