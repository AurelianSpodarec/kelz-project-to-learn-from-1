/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import Button from "@4cplatform/elements/Molecules/Button"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { getSimulationModeContent } from "./users.helpers"
import { UsersContext } from "./users.context"

// Components
import ConfirmationModal from "../../Molecules/ConfirmationModal"
import { SimulationModeWrapper } from "./users.styles"

const SimulationMode = ({ isInSimulationMode }) => {
  const { selectLoading, toggleSimulation, toggleSimulationLoading } =
    React.useContext(UsersContext)
  const content = getSimulationModeContent(isInSimulationMode)
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <ComplianceNote type={isInSimulationMode ? "alert" : "info"}>
        <SimulationModeWrapper>{content}</SimulationModeWrapper>
        <Button
          isLoading={toggleSimulationLoading}
          appearance={isInSimulationMode ? "errorGhost" : "primaryGhost"}
          trailingIcon={isInSimulationMode ? "cube-off-outline" : "cube-outline"}
          onClick={() => setOpen(true)}
          isDisabled={selectLoading}
          name="simulation_mode"
        >
          {isInSimulationMode ? "Turn off" : "Turn on"}
        </Button>
      </ComplianceNote>
      {open && (
        <ConfirmationModal
          onConfirm={toggleSimulation}
          onClose={() => setOpen(false)}
          confirmAppearance="success"
          cancelAppearance="errorGhost"
        >
          <P>{`This action will ${
            isInSimulationMode ? "turn off" : "turn on"
          } Simulation Mode for this user.`}</P>
        </ConfirmationModal>
      )}
    </>
  )
}

SimulationMode.defaultProps = {
  isInSimulationMode: false
}

SimulationMode.propTypes = {
  isInSimulationMode: PropTypes.bool
}

export default SimulationMode
