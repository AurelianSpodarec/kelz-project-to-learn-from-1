import React from "react"
import { FlyOutPanel } from "../../../Molecules"

// Components
import ViewAgencyCode from "./networkAgencyCodes.panel.view"
import ShareAgencyCode from "./networkAgencyCodes.panel.sharing"

const AgencyCodesPanel = () => (
  <FlyOutPanel
    body={() => <ViewAgencyCode />}
    wideBody={() => <ShareAgencyCode />}
    name="network_agency_codes_panel"
  />
)

export default AgencyCodesPanel
