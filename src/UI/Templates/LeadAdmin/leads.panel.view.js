import React, { useContext } from "react"
import { get } from "lodash"

// Helpers
import { LeadsContext } from "./leads.context"

// Components
import LeadsPanelHeader from "./leads.panel.header"
import LeadNotes from "./leads.panel.view.notes"
import { ButtonsWrapper } from "./leads.styles"
import { PanelBody } from "../../Molecules/FlyOutPanel"
import { StartJourney, PageContext } from "../../Organisms"

const LeadView = () => {
  const { selfServiceData } = useContext(PageContext)
  const { selectedLead, onStartJourney, startJourneyLoading } = useContext(LeadsContext)
  const clientId = get(selectedLead, "client.id", null)
  const journeysInProgressCount = get(selectedLead, "client.journeys_in_progress_count", 0)
  const isLeadDeleted = !!get(selectedLead, "deleted_at")

  return (
    <>
      <LeadsPanelHeader selectedLead={selectedLead} context="open" />
      <PanelBody isDeleted={isLeadDeleted}>
        <ButtonsWrapper>
          {/* TODO: Journey timeline */}
          {/* TODO: Simulation mode modal  */}
          {get(selectedLead, "sales_agent.id") === get(selfServiceData, "id") && (
            <StartJourney
              clientId={clientId}
              onStartJourney={onStartJourney}
              isJourneyLoading={startJourneyLoading}
              isDataLoading={startJourneyLoading}
              clientJourneys={journeysInProgressCount}
            />
          )}
          {!isLeadDeleted && <LeadNotes />}
        </ButtonsWrapper>
      </PanelBody>
    </>
  )
}

export default LeadView
