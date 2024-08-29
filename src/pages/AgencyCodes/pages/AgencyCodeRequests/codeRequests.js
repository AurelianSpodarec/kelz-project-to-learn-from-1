import React from "react"

// Components
import AgencyCodeRequestsProvider from "./context/codeRequests.provider"
import { AgencyCodeRequestAdmin, AgencyCodeRequestsPanel } from "../../../../UI/Templates"

const AgencyCodeRequests = () => (
  <AgencyCodeRequestsProvider>
    <AgencyCodeRequestAdmin />
    <AgencyCodeRequestsPanel />
  </AgencyCodeRequestsProvider>
)

export default AgencyCodeRequests
