import React from "react"
import { FlyOutPanel } from "../../../Molecules"

// Components
import ViewAgencyCode from "./agencyCodes.panel.view"

const AgencyCodesPanel = () => (
  <FlyOutPanel body={() => <ViewAgencyCode />} name="agency_codes_panel" />
)

export default AgencyCodesPanel
