import React from "react"
import { get } from "lodash"

// Helpers
import { DealCodesContext } from "./deals.context"

// Components
import DealCodesPanelHeader from "./deals.panel.header"
import { PanelBody } from "../../Molecules/FlyOutPanel"
import { LabelWithText } from "../../Atoms"

const DealCodesView = () => {
  const { selectedDealCode, selectLoading } = React.useContext(DealCodesContext)
  const description = get(selectedDealCode, "description")
  return (
    <>
      <DealCodesPanelHeader selectedDealCode={selectedDealCode} context="open" />
      <PanelBody>
        <LabelWithText
          label="Description"
          content={description}
          appearance="light"
          isLoading={selectLoading}
        />
      </PanelBody>
    </>
  )
}

export default DealCodesView
