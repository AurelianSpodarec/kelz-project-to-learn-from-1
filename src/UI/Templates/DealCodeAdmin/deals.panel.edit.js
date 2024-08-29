import React from "react"

// Helpers
import { DealCodesContext } from "./deals.context"
import { PageContext } from "../../Organisms"

// Components
import { PanelBody } from "../../Molecules/FlyOutPanel"
import DealCodesPanelHeader from "./deals.panel.header"
import EditDealCodeForm from "./deals.panel.edit.form"

const EditDealCode = () => {
  const { selectedDealCode } = React.useContext(DealCodesContext)
  const {
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)
  return (
    <>
      <DealCodesPanelHeader selectedDealCode={selectedDealCode} context="wide" />
      {!!selectedDealCode && panelStatus !== "closed" && (
        <PanelBody>
          <EditDealCodeForm selectedDealCode={selectedDealCode} />
        </PanelBody>
      )}
    </>
  )
}

export default EditDealCode
