import React from "react"

// Components
import ProviderUsersProvider from "./context/users.provider"
import { UserAdmin, UsersPanel } from "../../../../UI/Templates"

const Users = () => (
  <ProviderUsersProvider>
    <UserAdmin context="manage-team" />
    <UsersPanel />
  </ProviderUsersProvider>
)

export default Users
