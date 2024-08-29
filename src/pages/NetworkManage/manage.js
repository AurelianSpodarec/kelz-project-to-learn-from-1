import React from "react"
import { Container } from "@4cplatform/elements/Atoms"

// Components
import NetworkManageProvider from "./context/manage.provider"
import NetworkManageTabs from "./manage.tabs"

const NetworkManage = () => (
  <NetworkManageProvider>
    <Container width="80%">
      <NetworkManageTabs />
    </Container>
  </NetworkManageProvider>
)

export default NetworkManage
