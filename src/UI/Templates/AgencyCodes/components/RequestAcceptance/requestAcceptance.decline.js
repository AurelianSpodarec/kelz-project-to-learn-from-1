import React, { useContext } from "react"
import { get } from "lodash"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import { ConfirmationModal } from "../../../../Molecules"

const DeclineRequest = () => {
  const { selectedRequest, setDeclineModal, onDecline, declineLoading } =
    useContext(AgencyCodesContext)

  return (
    <>
      <ConfirmationModal
        title="Decline Request"
        confirmText="Decline"
        confirmAppearance="error"
        confirmIcon="close"
        cancelIcon="close"
        cancelText="Cancel"
        cancelAppearance="errorGhost"
        isLoadingConfirm={declineLoading}
        onClose={() => {
          setDeclineModal(false)
        }}
        onConfirm={onDecline}
        onCancel={() => {
          setDeclineModal(false)
        }}
      >
        <P>
          Are you sure you want to decline <strong>{get(selectedRequest, "owner.name")}'s</strong>{" "}
          Agency Code request for <strong>{get(selectedRequest, "product")}</strong>?
        </P>
      </ConfirmationModal>
    </>
  )
}

export default DeclineRequest
