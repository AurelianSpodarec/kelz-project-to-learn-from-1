import React from "react"
import { get } from "lodash"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import { ConfirmationModal } from "../../../../Molecules"

const DeclineAgencyCode = () => {
  const { viewData, setDeclineModal, onDecline, declineLoading } =
    React.useContext(AgencyCodesContext)

  return (
    <>
      <ConfirmationModal
        title="Decline Agency Code"
        confirmText="Decline"
        confirmAppearance="error"
        confirmIcon="close"
        cancelIcon="close"
        cancelText="Cancel"
        cancelAppearance="errorInline"
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
          Are you sure you want to decline the <strong>{get(viewData, "agency_code")}</strong>{" "}
          Agency Code addition?
        </P>
      </ConfirmationModal>
    </>
  )
}

export default DeclineAgencyCode
