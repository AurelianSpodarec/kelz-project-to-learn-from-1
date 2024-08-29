import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"
import { P } from "@4cplatform/elements/Typography"
import { Icon } from "@4cplatform/elements/Atoms"

// Helpers
import { PoliciesContext } from "../../policies.context"

// Components
import { ExclusionHeaderActionsWrapper, IconWrapper } from "./policyExclusions.styles"
import { ConfirmationModal } from "../../../../Molecules"

const PolicyExclusionsHeaderActions = ({ exclusion, onClick }) => {
  const {
    onExclusionSelect,
    onDeleteExclusion,
    deleteModal,
    setDeleteModal,
    updateExclusionLoading,
    deleteExclusionLoading,
    selectedExclusion
  } = React.useContext(PoliciesContext)
  const exclusionId = get(exclusion, "id")
  const clickedExclusion = get(selectedExclusion, "id")

  return (
    <ExclusionHeaderActionsWrapper>
      {clickedExclusion === exclusionId ? (
        <IconWrapper
          role="button"
          data-testid="edit_confirm-icon"
          onClick={onClick}
          isSelected={clickedExclusion === exclusionId}
          isDisabled={updateExclusionLoading || deleteExclusionLoading}
        >
          <Icon icon="check" colour={colours.white} size="3rem" margin="0 1rem" />
        </IconWrapper>
      ) : (
        <IconWrapper
          role="button"
          data-testid="edit-icon"
          onClick={() => {
            onExclusionSelect(exclusion)
          }}
          isSelected={clickedExclusion === exclusionId}
          isDisabled={updateExclusionLoading || deleteExclusionLoading}
        >
          <Icon icon="playlist-edit" colour={colours.white} size="3rem" margin="0 1rem" />
        </IconWrapper>
      )}
      {clickedExclusion === exclusionId ? (
        <IconWrapper
          role="button"
          onClick={() => {
            onExclusionSelect(null)
          }}
          isSelected={clickedExclusion === exclusionId}
          isDisabled={updateExclusionLoading || deleteExclusionLoading}
          deleteModal
          data-testid="cancel-icon"
        >
          <Icon icon="close" colour={colours.white} size="3rem" margin="0 1rem" />
        </IconWrapper>
      ) : (
        <IconWrapper
          role="button"
          onClick={() => {
            setDeleteModal(true)
          }}
          isSelected={clickedExclusion === exclusionId}
          isDisabled={updateExclusionLoading || deleteExclusionLoading}
          deleteModal
          data-testid="delete-icon"
        >
          <Icon icon="trash-can" colour={colours.white} size="3rem" margin="0 1rem" />
        </IconWrapper>
      )}
      {deleteModal && (
        <ConfirmationModal
          name="delete_exclusion_modal"
          confirmIcon="delete"
          confirmText="Delete exclusion"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => {
            setDeleteModal(false)
          }}
          onConfirm={() => {
            setDeleteModal(false)
            onDeleteExclusion(exclusion.id)
          }}
          isLoadingConfirm={deleteExclusionLoading}
        >
          <P>Are you sure you want to delete this exclusion? This action cannot be undone.</P>
        </ConfirmationModal>
      )}
    </ExclusionHeaderActionsWrapper>
  )
}

PolicyExclusionsHeaderActions.propTypes = {
  exclusion: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

export default PolicyExclusionsHeaderActions
