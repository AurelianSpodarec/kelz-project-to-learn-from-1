import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import DealCodesView from "./deals.panel.view"
import DealCodesEdit from "./deals.panel.edit"

const DealCodesPanel = () => (
  <FlyOutPanel
    body={() => <DealCodesView />}
    wideBody={() => <DealCodesEdit />}
    name="deal_codes_panel"
  />
)

export default DealCodesPanel
