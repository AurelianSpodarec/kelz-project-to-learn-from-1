import React from "react"

// Components
import NetworkMembersProvider from "./context/members.provider"
import { NetworkOrganisations, NetworkOrganisationsPanel } from "../../../../UI/Templates"

const Members = () => (
  <NetworkMembersProvider>
    <NetworkOrganisations />
    <NetworkOrganisationsPanel />
  </NetworkMembersProvider>
)

export default Members
