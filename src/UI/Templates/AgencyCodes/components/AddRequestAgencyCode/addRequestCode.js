import React, { useContext } from "react"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import { TableActionsButton } from "./addRequestCode.styles"
import AddRequestModal from "./addRequestCode.modal"

const AddRequestAgencyCode = () => {
  const { addRequestModal, setAddRequestModal } = useContext(AgencyCodesContext)
  return (
    <>
      <TableActionsButton
        onClick={() => setAddRequestModal(true)}
        trailingIcon="account-plus"
        name="add_request_agency_code"
      >
        Add / Request code
      </TableActionsButton>
      {addRequestModal && <AddRequestModal />}
    </>
  )
}

export default AddRequestAgencyCode
