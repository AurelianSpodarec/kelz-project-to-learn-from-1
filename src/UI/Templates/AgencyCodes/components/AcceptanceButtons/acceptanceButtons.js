import React, { useContext } from "react"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { AuthWrapper } from "@4cplatform/elements/Auth"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import { ButtonsWrapper } from "./acceptanceButtons.styles"
import ActivateAgencyCode from "./acceptanceButtons.activate"
import DeclineAgencyCode from "./acceptanceButtons.decline"
import SuspendAgencyCode from "./acceptanceButtons.suspend"
import DeleteAgencyCode from "./acceptanceButtons.delete"

const AcceptanceButtons = () => {
  const {
    viewData,
    viewLoading,
    activateModal,
    setActivateModal,
    declineModal,
    setDeclineModal,
    suspendModal,
    setSuspendModal,
    deleteModal,
    setDeleteModal
  } = useContext(AgencyCodesContext)
  const status = get(viewData, "status", false)
  return (
    <ButtonsWrapper>
      {(status === "PENDING" || status === "SUSPENDED") && (
        <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "PROVIDER_ADMIN"]}>
          <Button
            appearance="success"
            onClick={() => setActivateModal(true)}
            trailingIcon="check"
            name="activate_agency_code"
            isLoading={viewLoading}
          >
            Activate
          </Button>
          {activateModal && <ActivateAgencyCode />}
        </AuthWrapper>
      )}
      {status === "PENDING" && (
        <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "PROVIDER_ADMIN"]}>
          <Button
            appearance="error"
            trailingIcon="close"
            onClick={() => setDeclineModal(true)}
            name="decline_agency_code"
            isLoading={viewLoading}
          >
            Decline
          </Button>
          {declineModal && <DeclineAgencyCode />}
        </AuthWrapper>
      )}
      {(status === "ACTIVE" || status === "ACCEPTED") && (
        <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "PROVIDER_ADMIN"]}>
          <Button
            appearance="warning"
            onClick={() => setSuspendModal(true)}
            trailingIcon="hand-right"
            name="suspend_agency_code"
            isLoading={viewLoading}
          >
            Suspend
          </Button>
          {suspendModal && <SuspendAgencyCode />}
        </AuthWrapper>
      )}
      {(status === "ACTIVE" || status === "ACCEPTED" || status === "SUSPENDED") && (
        <AuthWrapper roles={["SYS_ADMIN"]}>
          <Button
            appearance="error"
            trailingIcon="trash-can"
            onClick={() => setDeleteModal(true)}
            name="delete_agency_code"
            isLoading={viewLoading}
          >
            Delete
          </Button>
          {deleteModal && <DeleteAgencyCode />}
        </AuthWrapper>
      )}
    </ButtonsWrapper>
  )
}

export default AcceptanceButtons
