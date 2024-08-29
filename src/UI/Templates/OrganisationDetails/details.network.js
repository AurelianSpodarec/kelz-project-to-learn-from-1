import React from "react"

// Helpers
import { AuthWrapper } from "@4cplatform/elements/Auth"

// Components
import { OrganisationNetworkWrapper } from "./details.styles"
import MyNetwork from "./details.network.myNetwork"
import MyInvitations from "./details.network.invitations"
import MyApplications from "./details.network.applications"

const OrganisationNetwork = () => (
  <OrganisationNetworkWrapper>
    <MyNetwork />
    <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"]}>
      <MyInvitations />
      <MyApplications />
    </AuthWrapper>
  </OrganisationNetworkWrapper>
)

export default OrganisationNetwork
