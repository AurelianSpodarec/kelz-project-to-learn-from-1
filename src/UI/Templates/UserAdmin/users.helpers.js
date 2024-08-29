import React from "react"
import { P, H3 } from "@4cplatform/elements/Typography"
import { string, object } from "yup"

// Schema for the EditUser form
export const editUserModel = object().shape({
  title: string().required("MISSING_REQUIRED_FIELD").nullable(),
  first_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  middle_names: string().nullable(),
  last_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  email: string().email().required("MISSING_REQUIRED_FIELD").nullable()
})

// Populate the SimulationMode compliance box with content
export const getSimulationModeContent = isInSimulationMode => {
  if (isInSimulationMode) {
    return (
      <>
        <H3 margin="0 0 1rem">Simulation mode on</H3>
        <P margin="0 0 1rem">
          This user is in simulation mode and any policies they create will not be onboarded as live
          policies.
        </P>
      </>
    )
  }
  return (
    <>
      <H3 margin="0 0 1rem">Simulation mode off</H3>
      <P margin="0 0 1rem">
        This user is in live mode and any policies they create will be onboarded as live policies
      </P>
    </>
  )
}

// Populate the account standing ConfirmationModal component with text content
export const getAccountStandingContent = isLocked => {
  if (!isLocked) {
    return "Are you sure you want to lock this user? Once locked, this user account will be unable to authenticate. Any active sessions attached to this user will be destroyed. This action will be logged."
  }
  return "Are you sure you want to unlock this user? Once unlocked, this user account will be unable to authenticate and create active sessions. This action will be logged."
}
