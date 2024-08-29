import React, { useContext } from "react"
import { AuthContext } from "@4cplatform/elements/Auth"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"

// Components
import { Tabs, Tab } from "../../../Organisms"
import { PanelBody } from "../../../Molecules/FlyOutPanel"
import CommissionRates from "../components/CommisionRates"
import DealCodeAssignment from "../components/DealCodeAssignment"

const AgencyCodesPanelBody = () => {
  const { viewLoading, assignedDealCodesLoading, isPending } = useContext(AgencyCodesContext)
  const isLoading = viewLoading || assignedDealCodesLoading
  const { canAccess } = useContext(AuthContext)

  return (
    <PanelBody>
      <Tabs
        hasQueryControls
        type="panel"
        name="agency_codes_panel"
        isLoading={isLoading}
        margin="0 0 1rem"
      >
        <Tab
          header="Commision"
          isPresent={canAccess([
            "SYS_ADMIN",
            "SUPPORT_ADMIN",
            "PROVIDER_ADMIN",
            "ORG_ADMIN",
            "NETWORK_ADMIN",
            "NETWORK_MEMBER_ADMIN"
          ])}
        >
          <CommissionRates isAgencyCodePending={isPending} />
        </Tab>

        <Tab
          header="Deal codes"
          isPresent={canAccess([
            "SYS_ADMIN",
            "SUPPORT_ADMIN",
            "NETWORK_ADMIN",
            "NETWORK_MEMBER_ADMIN"
          ])}
        >
          <DealCodeAssignment />
        </Tab>
      </Tabs>
    </PanelBody>
  )
}

export default AgencyCodesPanelBody
