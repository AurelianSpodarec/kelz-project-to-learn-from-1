import React from "react"

// Components
import { AgencyCodeRequestAdmin, AgencyCodeRequestsPanel } from "../../../../UI/Templates"
import OrganisationAgencyCodeRequestsProvider from "./context/codeRequests.provider"

const OrganisationAgencyCodeRequests = () => (
  <OrganisationAgencyCodeRequestsProvider>
    <AgencyCodeRequestAdmin />
    <AgencyCodeRequestsPanel />
  </OrganisationAgencyCodeRequestsProvider>
)

export default OrganisationAgencyCodeRequests
