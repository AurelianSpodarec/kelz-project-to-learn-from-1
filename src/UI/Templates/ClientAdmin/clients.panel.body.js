import React, { useContext } from "react"
import { get } from "lodash"

// Helpers
import { ClientsContext } from "./clients.context"

// Components
import { PanelBody } from "../../Molecules/FlyOutPanel"
import { StartJourney } from "../../Organisms"
import { ButtonsWrapper } from "./clients.styles"
import ClientsPanelButtons from "./clients.panel.body.buttons"

const ClientsPanelBody = () => {
  const { startJourneyLoading, onStartJourney, viewData } = useContext(ClientsContext)
  const clientId = get(viewData, "id", null)

  return (
    <PanelBody>
      <ClientsPanelButtons />
      <ButtonsWrapper>
        <StartJourney
          clientId={clientId}
          onStartJourney={onStartJourney}
          isJourneyLoading={startJourneyLoading}
          isDataLoading={false}
          clientJourneys={get(viewData, "journeys_in_progress_count", 0)}
        />
      </ButtonsWrapper>
    </PanelBody>
  )
}

export default ClientsPanelBody
