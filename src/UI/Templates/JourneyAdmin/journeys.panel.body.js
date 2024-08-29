import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { JourneysContext } from "./journeys.context"
import { PageContext } from "../../Organisms"

// Components
import { PanelBody } from "../../Molecules/FlyOutPanel"

const JourneyView = () => {
  const { viewData, viewLoading } = useContext(JourneysContext)
  const { setPanelStatus } = React.useContext(PageContext)
  const history = useHistory()
  return (
    <PanelBody>
      <Button
        appearance="success"
        trailingIcon="chevron-right"
        onClick={() => {
          setPanelStatus("closed")
          history.push(get(viewData, "page.route"))
        }}
        isDisabled={viewLoading}
      >
        Resume Journey
      </Button>
    </PanelBody>
  )
}

export default JourneyView
