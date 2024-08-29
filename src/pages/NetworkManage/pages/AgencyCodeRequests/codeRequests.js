import React from "react"

// Components
import { AgencyCodeRequestAdmin, AgencyCodeRequestsPanel } from "../../../../UI/Templates"
import NetworkAgencyCodeRequestsProvider from "./context/codeRequests.provider"

const NetworkAgencyCodeRequests = () => (
  <NetworkAgencyCodeRequestsProvider>
    <AgencyCodeRequestAdmin />
    <AgencyCodeRequestsPanel />
  </NetworkAgencyCodeRequestsProvider>
)

export default NetworkAgencyCodeRequests
