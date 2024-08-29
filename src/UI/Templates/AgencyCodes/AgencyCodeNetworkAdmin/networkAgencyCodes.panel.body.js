import React from "react"
import { Button } from "@4cplatform/elements/Molecules"
import { H3, SmallText } from "@4cplatform/elements/Typography"
import { isEmpty } from "lodash"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"
import { formatOrganisationsAsEvents } from "../agencyCodes.helpers"

// Components
import { Tabs, Tab, PageContext, Timeline } from "../../../Organisms"
import { PanelBody } from "../../../Molecules/FlyOutPanel"
import CommissionRates from "../components/CommisionRates"
import DealCodeAssignment from "../components/DealCodeAssignment"

const AgencyCodesPanelBody = () => {
  const { viewLoading, isSharedWith, sharedOrganisations } = React.useContext(AgencyCodesContext)
  const { setPanelStatus } = React.useContext(PageContext)

  return (
    <PanelBody>
      <Tabs
        hasQueryControls
        type="panel"
        name="agency_codes_panel"
        isLoading={viewLoading}
        margin="0 0 1rem"
      >
        <Tab header="Comission">
          <CommissionRates />
        </Tab>
        <Tab header="Deal codes">
          <DealCodeAssignment />
        </Tab>
        <Tab header="Sharing" isPresent={!isSharedWith}>
          <H3 appearance="light" margin="2rem 0">
            Shared with
          </H3>
          {isEmpty(sharedOrganisations) && (
            <SmallText appearance="light">This agency code has not been shared.</SmallText>
          )}
          <Timeline events={formatOrganisationsAsEvents({ organisations: sharedOrganisations })} />
          <Button
            appearance="whiteGhost"
            trailingIcon="share-variant-outline"
            onClick={() => setPanelStatus("wide")}
            name="share"
          >
            Share
          </Button>
        </Tab>
      </Tabs>
    </PanelBody>
  )
}

export default AgencyCodesPanelBody
