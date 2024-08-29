import React from "react"
import { FlyOutPanel } from "../../../Molecules"

// Components
import ViewAgencyCode from "./organisationAgencyCodes.panel.view"
import ShareAgencyCode from "./organisationAgencyCodes.panel.sharing"

const AgencyCodesPanel = () => (
  <FlyOutPanel
    body={() => <ViewAgencyCode />}
    wideBody={() => <ShareAgencyCode />}
    name="organisation_agency_codes_panel"
  />
)

export default AgencyCodesPanel
