import React from "react"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { JourneyContext } from "../../journey.context"

// Components
import { ConfirmationModal } from "../../../../Molecules"

const PrevModal = () => {
  const { setPreviousModal, onClickPrevious } = React.useContext(JourneyContext)
  return (
    <ConfirmationModal
      onConfirm={() => {
        onClickPrevious()
        setPreviousModal(false)
      }}
      onClose={() => setPreviousModal(false)}
      confirmAppearance="success"
      cancelAppearance="errorGhost"
    >
      <P>Unsaved content is present on this page. Are you sure you want to go back?</P>
    </ConfirmationModal>
  )
}

export default PrevModal
