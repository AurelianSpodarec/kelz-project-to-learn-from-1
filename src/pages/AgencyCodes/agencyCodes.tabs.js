import React, { useContext } from "react"
import { AuthContext } from "@4cplatform/elements/Auth"

// Components
import { Tabs, Tab } from "../../UI/Organisms"
import AgencyCodes from "./pages/AgencyCodes"
import AgencyCodeRequests from "./pages/AgencyCodeRequests"

const AgencyCodesTabs = () => {
  const { canAccess } = useContext(AuthContext)

  return (
    <Tabs hasQueryControls type="table" name="agency_codes_type">
      <Tab header="Agency codes">
        <AgencyCodes />
      </Tab>
      <Tab header="Pending additions">
        <AgencyCodes isPending />
      </Tab>
      <Tab
        header="Pending requests"
        isPresent={canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "PROVIDER_ADMIN"])}
      >
        <AgencyCodeRequests />
      </Tab>
    </Tabs>
  )
}

export default AgencyCodesTabs
