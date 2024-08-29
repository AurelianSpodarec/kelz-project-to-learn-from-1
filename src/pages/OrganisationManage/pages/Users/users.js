import React from "react"

// Components
import OrganisationUsersProvider from "./context/users.provider"
import { UserAdmin, UsersPanel } from "../../../../UI/Templates"

const Users = () => (
  <OrganisationUsersProvider>
    <UserAdmin context="manage-team" />
    <UsersPanel />
  </OrganisationUsersProvider>
)

export default Users
