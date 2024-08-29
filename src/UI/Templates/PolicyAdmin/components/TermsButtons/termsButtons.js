import React from "react"
import { isEmpty } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { PoliciesContext } from "../../policies.context"

// Components
import { ButtonsWrapper } from "../../policies.styles"
import DeclineUnderwriting from "./termsButtons.declineUnderwriting"

const TermsButtons = () => {
  const {
    exclusionsData,
    exclusionsLoading,
    onAcceptUnderwritingExclusions,
    onAcceptUnderwriting,
    declineUnderwritingModal,
    setDeclineUnderwritingModal,
    acceptUnderwritingLoading,
    acceptUnderwritingExclusionsLoading,
    declineUnderwritingLoading
  } = React.useContext(PoliciesContext)

  return (
    <ButtonsWrapper>
      <Button
        appearance="success"
        onClick={() =>
          !isEmpty(exclusionsData) ? onAcceptUnderwritingExclusions() : onAcceptUnderwriting()
        }
        isLoading={acceptUnderwritingLoading || acceptUnderwritingExclusionsLoading}
        isDisabled={exclusionsLoading || declineUnderwritingLoading}
        trailingIcon="check"
        name={
          !isEmpty(exclusionsData) ? "accept_underwriting_with_exclusions" : "accept_underwriting"
        }
        margin="1rem 0"
      >
        {!isEmpty(exclusionsData) ? "Accept with exclusions" : "Accept"}
      </Button>
      <Button
        appearance="error"
        trailingIcon="account-remove"
        onClick={() => setDeclineUnderwritingModal(true)}
        name="decline_underwriting"
        margin="1rem 0"
        isLoading={declineUnderwritingLoading}
        isDisabled={
          exclusionsLoading || acceptUnderwritingLoading || acceptUnderwritingExclusionsLoading
        }
      >
        Decline
      </Button>
      {declineUnderwritingModal && <DeclineUnderwriting />}
    </ButtonsWrapper>
  )
}

export default TermsButtons
