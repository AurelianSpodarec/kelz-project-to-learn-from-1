import React, { useContext } from "react"
import { get } from "lodash"

// Components
import { Tabs, Tab, PageContext } from "../../../../UI/Organisms"
import OrganisationAgencyCodes from "./pages/OrganisationAgencyCodes"
import OrganisationAgencyCodeRequests from "../AgencyCodeRequests"

const AgencyCodes = () => {
  const { selfServiceData: user } = useContext(PageContext)

  return (
    <Tabs hasQueryControls type="table" name="agency_codes_type">
      <Tab header="Agency codes">
        <OrganisationAgencyCodes type="default" />
      </Tab>
      <Tab header="Pending requests">
        <OrganisationAgencyCodeRequests />
      </Tab>
      <Tab
        header="Shared from network"
        isPresent={get(user, "parent.parent.type", "") === "NETWORK"}
      >
        <OrganisationAgencyCodes type="shared_from_network" />
      </Tab>
      <Tab header="Shared with users">
        <OrganisationAgencyCodes type="shared_with_users" />
      </Tab>
      <Tab header="Assigned to users">
        <OrganisationAgencyCodes type="assigned_to_users" />
      </Tab>
    </Tabs>
  )
}

export default AgencyCodes
