import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import { ConfirmationModal } from "../../../../Molecules"

const AcceptRequest = ({ formik }) => {
  const { selectedRequest, setAcceptModal, onAccept, acceptLoading } =
    React.useContext(AgencyCodesContext)

  return (
    <>
      <ConfirmationModal
        title="Accept request"
        confirmText="Accept"
        confirmAppearance="success"
        confirmIcon="check"
        cancelIcon="close"
        cancelText="Cancel"
        cancelAppearance="errorGhost"
        isLoadingConfirm={acceptLoading}
        onClose={() => {
          setAcceptModal(false)
        }}
        onConfirm={() => onAccept({ body: { ...get(formik, "values", {}) } })}
        onCancel={() => {
          setAcceptModal(false)
        }}
      >
        <P>
          Are you sure you want to accept <strong>{get(selectedRequest, "owner.name")}'s</strong>{" "}
          Agency Code request for <strong>{get(selectedRequest, "product")}</strong>?
        </P>
      </ConfirmationModal>
    </>
  )
}

AcceptRequest.propTypes = {
  formik: PropTypes.object.isRequired
}

export default AcceptRequest
