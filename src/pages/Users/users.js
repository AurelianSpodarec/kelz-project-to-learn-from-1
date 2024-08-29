import React from "react"
import { H1 } from "@4cplatform/elements/Typography"
import { Container } from "@4cplatform/elements/Atoms"
import { Helmet } from "react-helmet-async"

// Helpers
import { DASHBOARD } from "../../config/pages"

// Components
import UsersProvider from "./context/users.provider"
import { UserAdmin, UsersPanel } from "../../UI/Templates"
import { Breadcrumbs } from "../../UI/Molecules"

const Users = () => (
  <>
    <Helmet>
      <title>Users</title>
    </Helmet>
    <UsersProvider>
      <Container>
        <Breadcrumbs trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "Users" }]} />
        <H1 margin="4rem 0">Users</H1>
        <UserAdmin context="user-admin" />
      </Container>
      <UsersPanel />
    </UsersProvider>
  </>
)

export default Users
