import React from "react"
import { Modal, Skeleton, Button } from "@4cplatform/elements/Molecules"

// Helpers
import { PoliciesContext } from "../../policies.context"

// Components
import PolicyExclusionsHeader from "./policyExclusions.header"
import PolicyExclusionsBody from "./policyExclusions.header.applicants"
import PolicyExclusionsFooter from "./policyExclusions.footer"
import { LoadingWrapper } from "./policyExclusions.styles"

const PolicyExclusions = () => {
  const {
    exclusionsModal,
    setExclusionsModal,
    updateExclusionLoading,
    deleteExclusionLoading,
    addExclusionLoading,
    exclusionsLoading,
    onExclusionSelect
  } = React.useContext(PoliciesContext)

  const isLoading =
    updateExclusionLoading || deleteExclusionLoading || addExclusionLoading || exclusionsLoading

  return (
    <>
      <Button
        appearance="whiteGhost"
        trailingIcon="account-alert"
        margin="2rem 0"
        onClick={() => {
          setExclusionsModal(true)
        }}
        isDisabled={isLoading}
        name="edit_policy_exclusions"
      >
        Manage exclusions
      </Button>
      {exclusionsModal && (
        <Modal
          title="Policy exclusions"
          onClose={() => {
            onExclusionSelect(null)
            setExclusionsModal(false)
          }}
          width="50%"
          hasPadding={false}
          margin="0"
          headerPadding="2rem"
        >
          {isLoading ? <Skeleton count={3} wrapper={LoadingWrapper} /> : <PolicyExclusionsHeader />}
          {isLoading ? <Skeleton count={2} wrapper={LoadingWrapper} /> : <PolicyExclusionsBody />}
          {isLoading ? <Skeleton count={1} wrapper={LoadingWrapper} /> : <PolicyExclusionsFooter />}
        </Modal>
      )}
    </>
  )
}

export default PolicyExclusions
