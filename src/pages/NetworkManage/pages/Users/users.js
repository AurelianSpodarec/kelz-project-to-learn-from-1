import React from "react"

// Components
import NetworkUsersProvider from "./context/users.provider"
import { UserAdmin, UsersPanel } from "../../../../UI/Templates"

const Users = () => (
  <NetworkUsersProvider>
    <UserAdmin context="manage-team" />
    <UsersPanel />
  </NetworkUsersProvider>
)

export default Users
