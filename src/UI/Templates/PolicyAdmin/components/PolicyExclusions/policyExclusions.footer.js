import React from "react"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { PoliciesContext } from "../../policies.context"

// Components
import { ButtonsWrapper } from "./policyExclusions.styles"

const PolicyExclusionsHeaderActions = () => {
  const {
    setExclusionsModal,
    updateLoading,
    deleteLoading,
    addExclusionLoading,
    policyExclusionsLoading
  } = React.useContext(PoliciesContext)
  return (
    <ButtonsWrapper>
      <Button
        appearance="error"
        trailingIcon="cancel"
        onClick={() => setExclusionsModal(false)}
        name="add_exclusion_cancel"
        isLoading={updateLoading || deleteLoading || addExclusionLoading || policyExclusionsLoading}
      >
        Close
      </Button>
    </ButtonsWrapper>
  )
}

export default PolicyExclusionsHeaderActions
