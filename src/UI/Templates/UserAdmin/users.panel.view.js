import React, { useContext } from "react"
import { get, find } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"
import { H4 } from "@4cplatform/elements/Typography"
import { Button } from "@4cplatform/elements/Molecules"
import { useTranslations } from "@4cplatform/elements/Translations"
import { AuthWrapper } from "@4cplatform/elements/Auth"

// Helpers
import { UsersContext } from "./users.context"
import { getTwoFactorAuthIcon } from "../../Helpers"

// Components
import { IconWithText } from "../../Atoms"
import { PanelBody } from "../../Molecules/FlyOutPanel"
import { PanelActionsWrapper, PanelActionButton } from "./users.styles"
import UsersPanelHeader from "./users.panel.header"
import SimulationMode from "./users.panel.view.simulation"
import ToggleStanding from "./users.panel.view.standing"
import DeleteUser from "./users.panel.view.delete"

const UserView = () => {
  const {
    selectedUser,
    viewLoading,
    resetTwoFactorAuthForAUser,
    twoFactorResetLoading,
    resendConfirmation,
    resendConfirmationLoading,
    resetPasswordRequest,
    resetPasswordRequestLoading
  } = useContext(UsersContext)
  const t = useTranslations()

  const twoFactorAuth = get(selectedUser, "two_factor_auth", "TWO_FA_NONE")
  const isLocked = get(selectedUser, "locked", false)
  const isActive = get(selectedUser, "active", false)
  const isDeleted = !!get(selectedUser, "deleted_at", get(selectedUser, "deleted_at", false))

  return (
    <>
      {/* User Information */}
      <UsersPanelHeader selectedUser={selectedUser} context="open" isDeleted={isDeleted} />

      <PanelBody isDeleted={isDeleted}>
        {/* Reset password */}
        <H4 margin="0 0 1rem" appearance="light" isLoading={viewLoading}>
          <b>Reset password</b>
        </H4>
        <PanelActionsWrapper>
          <Button
            type="submit"
            appearance="whiteGhost"
            trailingIcon="lock-reset"
            name="send_password_reset_email"
            onClick={() => resetPasswordRequest()}
            isDisabled={resetPasswordRequestLoading}
          >
            Send password reset
          </Button>
        </PanelActionsWrapper>

        {/* 2FA Actions */}
        <H4 margin="0 0 1rem" appearance="light" isLoading={viewLoading}>
          <b>Two-factor authentication</b>
        </H4>
        <PanelActionsWrapper>
          <IconWithText
            appearance="light"
            content={t(twoFactorAuth)}
            fontSize="1.4rem"
            margin="0"
            isLoading={viewLoading}
            loadingWidth="15rem"
            {...getTwoFactorAuthIcon(twoFactorAuth)}
          />
          {twoFactorAuth !== "TWO_FA_NONE" && !viewLoading && (
            <PanelActionButton
              appearance="whiteGhost"
              trailingIcon="lock-reset"
              isLoading={twoFactorResetLoading}
              isDisabled={viewLoading}
              onClick={resetTwoFactorAuthForAUser}
            >
              Reset
            </PanelActionButton>
          )}
        </PanelActionsWrapper>

        {/* Account Standing */}
        <H4 margin="0 0 1rem" appearance="light" isLoading={viewLoading}>
          <b>Account standing</b>
        </H4>
        <PanelActionsWrapper>
          <IconWithText
            icon={isLocked ? "lock" : "lock-open"}
            appearance="light"
            content={isLocked ? "Locked" : "Unlocked"}
            fontSize="1.4rem"
            margin="0"
            isLoading={viewLoading}
            loadingWidth="15rem"
          />
        </PanelActionsWrapper>

        {/* Account Status */}
        <H4 margin="0 0 1rem" appearance="light" isLoading={viewLoading}>
          <b>Account status</b>
        </H4>
        <PanelActionsWrapper>
          <IconWithText
            icon={isActive ? "checkbox-marked-circle-outline" : "circle-off-outline"}
            appearance="light"
            content={isActive ? "Active" : "Inactive"}
            fontSize="1.4rem"
            margin="0"
            iconColour={isActive ? colours.green : colours.orange}
            isLoading={viewLoading}
            loadingWidth="15rem"
          />
          {!viewLoading && !isActive && (
            <PanelActionButton
              appearance="whiteGhost"
              trailingIcon="send"
              isLoading={resendConfirmationLoading}
              isDisabled={viewLoading}
              name="resend_confirmation"
              onClick={resendConfirmation}
            >
              Resend activation
            </PanelActionButton>
          )}
        </PanelActionsWrapper>

        {/* Simulation Mode */}
        {get(selectedUser, "parent.type", null) === "ORGANISATION" && (
          <SimulationMode
            isInSimulationMode={get(
              find(get(selectedUser, "settings", []), ["key", "SIMULATION_MODE"]),
              "data.value",
              false
            )}
          />
        )}

        {/* Delete/ToggleStanding Actions */}
        <AuthWrapper roles={["SYS_ADMIN", "ORG_ADMIN", "NETWORK_ADMIN", "PROVIDER_ADMIN"]}>
          <DeleteUser />
        </AuthWrapper>
        <ToggleStanding isLocked={get(selectedUser, "locked", false)} />
      </PanelBody>
    </>
  )
}

export default UserView
