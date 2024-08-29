import React from "react"
import { Container } from "@4cplatform/elements/Atoms"

// Components
import ProviderManageProvider from "./context/manage.provider"
import ProviderManageTabs from "./manage.tabs"

const ProviderManage = () => (
  <ProviderManageProvider>
    <Container width="80%">
      <ProviderManageTabs />
    </Container>
  </ProviderManageProvider>
)

export default ProviderManage
