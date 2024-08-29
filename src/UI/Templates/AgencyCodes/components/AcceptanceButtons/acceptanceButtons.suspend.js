import React from "react"
import { get } from "lodash"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import { ConfirmationModal } from "../../../../Molecules"

const SuspendAgencyCode = () => {
  const { viewData, setSuspendModal, onSuspend, suspendLoading } =
    React.useContext(AgencyCodesContext)

  return (
    <>
      <ConfirmationModal
        title="Suspend Agency Code"
        confirmText="Suspend"
        confirmAppearance="warning"
        confirmIcon="hand-right"
        cancelIcon="close"
        cancelText="Cancel"
        cancelAppearance="errorInline"
        isLoadingConfirm={suspendLoading}
        onClose={() => {
          setSuspendModal(false)
        }}
        onConfirm={onSuspend}
        onCancel={() => {
          setSuspendModal(false)
        }}
      >
        <P>
          Are you sure you want to suspend the <strong>{get(viewData, "agency_code")}</strong>{" "}
          Agency Code ?
        </P>
      </ConfirmationModal>
    </>
  )
}

export default SuspendAgencyCode
