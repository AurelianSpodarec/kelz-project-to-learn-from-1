import React from "react"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { PoliciesContext } from "../../policies.context"

// Components
import { ButtonsWrapper } from "../../policies.styles"
import DeclinePolicy from "./acceptanceButtons.declinePolicy"

const AcceptanceButtons = () => {
  const {
    policyAcceptLoading,
    policyDeclineLoading,
    reference,
    declinePolicyModal,
    setDeclinePolicyModal,
    onPolicyAccept
  } = React.useContext(PoliciesContext)
  return (
    <ButtonsWrapper>
      <Button
        appearance="success"
        onClick={() => onPolicyAccept({ policy_number: reference })}
        isLoading={policyAcceptLoading}
        isDisabled={!reference || policyDeclineLoading}
        trailingIcon="check"
        name="accept_policy"
        margin="1rem 0"
      >
        Accept
      </Button>
      <Button
        appearance="error"
        trailingIcon="account-remove"
        onClick={() => setDeclinePolicyModal(true)}
        name="decline_policy"
        margin="1rem 0"
        isLoading={policyDeclineLoading}
        isDisabled={policyAcceptLoading}
      >
        Decline
      </Button>
      {declinePolicyModal && <DeclinePolicy />}
    </ButtonsWrapper>
  )
}

export default AcceptanceButtons
