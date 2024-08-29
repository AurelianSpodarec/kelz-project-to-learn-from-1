import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import ViewUser from "./users.panel.view"
import EditUser from "./users.panel.edit"

const UsersPanel = () => (
  <FlyOutPanel body={() => <ViewUser />} wideBody={() => <EditUser />} name="users_panel" />
)

export default UsersPanel
