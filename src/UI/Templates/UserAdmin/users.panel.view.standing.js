import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { usePatch, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { UsersContext } from "./users.context"
import { getAccountStandingContent } from "./users.helpers"

// Components
import { ConfirmationModal } from "../../Molecules"

const ToggleStanding = ({ isLocked }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { selectedUser, onPatch, selectLoading } = React.useContext(UsersContext)
  const isDeleted = !!get(selectedUser, "deleted_at")
  const [open, setOpen] = React.useState(false)

  // Lock mutation
  const [lock, { loading: lockLoading, error: lockError }] = usePatch({
    endpoint: "/users/:user/lock",
    params: {
      user: get(selectedUser, "slug", "")
    },
    onCompleted: () => {
      // Display success message, refetch index query
      addAlert({
        message: "User has been successfully locked",
        type: "success",
        dismissible: true,
        timeout: 5
      })
      const user = { ...selectedUser, locked: true }
      onPatch(user)
    },
    onError: () => {
      addAlert({
        message: "There was an error locking the user",
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Unlock mutation
  const [unlock, { loading: unlockLoading, error: unlockError }] = usePatch({
    endpoint: "/users/:user/unlock",
    params: {
      user: get(selectedUser, "slug", "")
    },
    onCompleted: () => {
      // Display success message, refetch index query
      addAlert({
        message: "User has been successfully unlocked",
        type: "success",
        dismissible: true,
        timeout: 5
      })
      const user = { ...selectedUser, locked: false }
      onPatch(user)
    },
    onError: () => {
      addAlert({
        message: "There was an error unlocking the user",
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <>
      <Button
        appearance="warning"
        onClick={() => setOpen(true)}
        trailingIcon={isLocked ? "lock-open" : "lock"}
        isDisabled={isDeleted || selectLoading}
        name="lock_unlock"
      >
        {isLocked ? "Unlock" : "Lock"}
      </Button>
      {open && (
        <ConfirmationModal
          onConfirm={() => {
            if (isLocked) {
              unlock()
            } else {
              lock()
            }
          }}
          confirmIcon={isLocked ? "lock-open" : "lock"}
          confirmAppearance="warning"
          cancelAppearance="errorGhost"
          isLoadingConfirm={lockLoading || unlockLoading}
          onClose={() => setOpen(false)}
        >
          <P>{getAccountStandingContent(isLocked)}</P>
        </ConfirmationModal>
      )}
      {/* Error handling */}
      <ApiError error={lockError || unlockError} />
    </>
  )
}

ToggleStanding.defaultProps = {
  isLocked: false
}

ToggleStanding.propTypes = {
  isLocked: PropTypes.bool
}

export default ToggleStanding
