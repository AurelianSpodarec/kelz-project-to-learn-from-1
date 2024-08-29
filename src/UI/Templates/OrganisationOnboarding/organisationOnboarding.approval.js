import React, { useContext } from "react"
import moment from "moment"
import { get, isEmpty } from "lodash"
import { H2, H3, P } from "@4cplatform/elements/Typography"
import { Checkbox } from "@4cplatform/elements/Forms"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { OrganisationOnboardingContext } from "./organisationOnboarding.context"

// Components
import {
  SideWrapper,
  StatusWrapper,
  BypassWrapper,
  ActivateOrganisationWrapper
} from "./organisationOnboarding.styles"
import { IconWithText } from "../../Atoms"
import { ConfirmationModal } from "../../Molecules"
import { ActivateOrganisation } from "../../Organisms"

const Approval = () => {
  const {
    organisation,
    organisationLoading,
    data,
    loading,
    bypassModal,
    setBypassModal,
    bypassLoading,
    onBypass,
    dueDiligenceLastUpdated,
    onUpdateOrganisation
  } = useContext(OrganisationOnboardingContext)
  const isLoading = organisationLoading || loading || bypassLoading

  const isApproved = get(organisation, "approved", false)
  const isActive = get(organisation, "active", false)
  const isDeleted = get(organisation, "deleted_at", null) !== null

  const dueDiligenceCompleted = get(organisation, "completed_due_diligence_at", false)
  const dueDiligenceStarted = !isEmpty(data.filter(item => !!item.complete))
  const bypassDueDiligence = get(organisation, "bypass_due_diligence", false)

  return (
    <SideWrapper>
      {/* Organisaion status */}
      <H2 margin="0 0 3rem" isLoading={isLoading}>
        Status
      </H2>
      <StatusWrapper>
        <IconWithText
          content={isApproved ? "Approved" : "Not approved"}
          icon={isApproved ? "check-circle" : "close-circle"}
          iconColour={isApproved ? colours.green : colours.red}
          margin="0 2rem 0 1rem"
          loadingWidth="8rem"
          isLoading={isLoading}
        />
        <IconWithText
          content={isActive ? "Active" : "Not active"}
          icon={isActive ? "check-circle" : "close-circle"}
          iconColour={isActive ? colours.green : colours.red}
          margin="0"
          loadingWidth="8rem"
          isLoading={isLoading}
        />
      </StatusWrapper>
      {/* Activate organisation button */}
      {!isLoading && !isDeleted && !isActive && (
        <ActivateOrganisationWrapper>
          <ActivateOrganisation
            selectedOrganisation={organisation}
            onActivate={org => onUpdateOrganisation(org)}
          />
        </ActivateOrganisationWrapper>
      )}
      {/* Due diligence status */}
      <H3 isLoading={isLoading}>Due Diligence</H3>
      <P margin="0 0 1rem 1rem" isLoading={isLoading} loadingLines={1}>
        {!dueDiligenceStarted && !dueDiligenceCompleted && "Not started"}
        {dueDiligenceStarted && !dueDiligenceCompleted && "Incomplete"}
        {dueDiligenceCompleted &&
          `${bypassDueDiligence ? "Bypassed" : "Completed"}: ${moment(
            dueDiligenceCompleted,
            "YYYY-MM-DDTHH:mmZ"
          ).format("DD/MM/YYYY HH:mm")}`}
      </P>
      {dueDiligenceStarted && !dueDiligenceCompleted && (
        <P margin="0 0 1rem 1rem" isLoading={isLoading} loadingLines={1}>
          {`Updated at: ${dueDiligenceLastUpdated}`}
        </P>
      )}
      {/* Bypass due diligence */}
      <BypassWrapper>
        <Checkbox
          name="bypass_due_diligence"
          margin="0 0 0 1rem"
          labelWidth="23rem"
          label="Bypass Due Diligence"
          value={!!bypassDueDiligence}
          isLoading={isLoading}
          isDisabled={isLoading || isApproved || !!bypassDueDiligence || dueDiligenceCompleted}
          onChange={() => setBypassModal(true)}
        />
      </BypassWrapper>
      {bypassModal && (
        <ConfirmationModal
          title="Bypass Due Diligence"
          confirmIcon="check"
          confirmText="Yes"
          confirmAppearance="success"
          cancelText="No"
          isLoadingConfirm={bypassLoading}
          cancelAppearance="errorGhost"
          onClose={() => setBypassModal(false)}
          onConfirm={() => onBypass()}
        >
          <P>Are you sure you want to bypass the organisation's due diligence ?</P>
        </ConfirmationModal>
      )}
    </SideWrapper>
  )
}

export default Approval
