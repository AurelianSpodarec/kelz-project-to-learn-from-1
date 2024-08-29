import React from "react"
import { get } from "lodash"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import { ConfirmationModal } from "../../../../Molecules"

const ActivateAgencyCode = () => {
  const { viewData, setActivateModal, onActivate, activateLoading } =
    React.useContext(AgencyCodesContext)

  return (
    <>
      <ConfirmationModal
        title="Activate Agency Code"
        confirmText="Activate"
        confirmAppearance="success"
        confirmIcon="check"
        cancelIcon="close"
        cancelText="Cancel"
        cancelAppearance="errorInline"
        isLoadingConfirm={activateLoading}
        onClose={() => {
          setActivateModal(false)
        }}
        onConfirm={onActivate}
        onCancel={() => {
          setActivateModal(false)
        }}
      >
        <P>
          Are you sure you want to activate the <strong>{get(viewData, "agency_code")}</strong>{" "}
          Agency Code addition?
        </P>
      </ConfirmationModal>
    </>
  )
}

export default ActivateAgencyCode
