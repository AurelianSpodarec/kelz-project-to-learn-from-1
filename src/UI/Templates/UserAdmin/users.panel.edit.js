import React from "react"

// Helpers
import { UsersContext } from "./users.context"
import { PageContext } from "../../Organisms"

// Components
import { PanelBody } from "../../Molecules/FlyOutPanel"
import UsersPanelHeader from "./users.panel.header"
import EditUserForm from "./users.panel.edit.form"

const EditUser = () => {
  const { selectedUser } = React.useContext(UsersContext)
  const {
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)
  return (
    <>
      <UsersPanelHeader selectedUser={selectedUser} context="wide" />
      {!!selectedUser && panelStatus !== "closed" && (
        <PanelBody>
          <EditUserForm selectedUser={selectedUser} />
        </PanelBody>
      )}
    </>
  )
}

export default EditUser
