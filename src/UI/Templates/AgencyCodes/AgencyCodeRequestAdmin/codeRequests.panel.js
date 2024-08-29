import React from "react"
import { FlyOutPanel } from "../../../Molecules"

// Components
import ViewAgencyCodeRequest from "./codeRequests.panel.view"

const AgencyCodeRequestsPanel = () => (
  <FlyOutPanel body={() => <ViewAgencyCodeRequest />} name="agency_codes_requests_panel" />
)

export default AgencyCodeRequestsPanel
