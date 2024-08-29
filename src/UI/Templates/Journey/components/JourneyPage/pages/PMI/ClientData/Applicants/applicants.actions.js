import React from "react"
import { get } from "lodash"
import { Button, Modal } from "@4cplatform/elements/Molecules"

// Helpers
import { ApplicantsContext } from "./applicants.context"

// Components
import { ActionsWrapper } from "./applicants.styles"
import ApplicantForm from "./applicants.applicant.form"

const Actions = () => {
  const { addModal, setAddModal } = React.useContext(ApplicantsContext)

  return (
    <>
      <ActionsWrapper>
        <Button
          trailingIcon="account-plus"
          margin="0 1rem 0 0"
          onClick={() => setAddModal({ type: "partner", isOpen: true })}
        >
          Add partner
        </Button>
        <Button
          trailingIcon="account-plus"
          margin="0"
          onClick={() => setAddModal({ type: "dependant", isOpen: true })}
        >
          Add dependant
        </Button>
      </ActionsWrapper>
      {/* Add applicant */}
      {addModal.isOpen && (
        <Modal
          name="add-partner"
          onClose={() => setAddModal({ type: null, isOpen: false })}
          title={`Add ${get(addModal, "type", "applicant")}`}
        >
          <ApplicantForm type={get(addModal, "type")} />
        </Modal>
      )}
    </>
  )
}

export default Actions
