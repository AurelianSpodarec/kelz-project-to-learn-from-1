import React from "react"
import { Container } from "@4cplatform/elements/Atoms"

// Components
import OrganisationManageProvider from "./context/manage.provider"
import OrganisationManageTabs from "./manage.tabs"

const OrganisationManage = () => (
  <OrganisationManageProvider>
    <Container width="80%">
      <OrganisationManageTabs />
    </Container>
  </OrganisationManageProvider>
)

export default OrganisationManage
