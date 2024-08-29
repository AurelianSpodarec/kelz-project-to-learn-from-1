import React from "react"
import { get } from "lodash"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { Button } from "@4cplatform/elements/Molecules"
import { P } from "@4cplatform/elements/Typography"
import { useDelete } from "@4cplatform/elements/Api"

// Helpers
import { UsersContext } from "./users.context"

// Components
import { ConfirmationModal } from "../../Molecules"

const DeleteUser = () => {
  const { selectedUser, onPatch: onDelete, selectLoading } = React.useContext(UsersContext)
  const isDeleted = !!get(selectedUser, "deleted_at")
  const { addAlert } = React.useContext(AlertsContext)
  const [open, setOpen] = React.useState(false)

  // Delete user mutation
  const [deleteUser, { loading }] = useDelete({
    endpoint: "/users/:user",
    params: {
      user: get(selectedUser, "slug", "")
    },
    onCompleted: () => {
      // Display success message, refetch index query
      addAlert({
        message: "User has been successfully deleted",
        type: "success",
        dismissible: true,
        timeout: 5
      })
      onDelete()
    }
  })

  return (
    <>
      <Button
        appearance="error"
        trailingIcon="delete"
        margin="0 3rem 0 0"
        onClick={() => setOpen(true)}
        isDisabled={isDeleted || selectLoading}
        name="delect_user"
      >
        Delete
      </Button>
      {open && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Delete User"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setOpen(false)}
          onConfirm={() => {
            deleteUser()
          }}
          isLoadingConfirm={loading}
        >
          <P>Are you sure you want to delete this user? This action cannot be undone.</P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default DeleteUser
