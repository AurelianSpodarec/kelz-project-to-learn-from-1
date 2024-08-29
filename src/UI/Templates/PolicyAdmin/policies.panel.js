import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import ViewPolicy from "./policies.panel.view"

const PoliciesPanel = () => <FlyOutPanel body={() => <ViewPolicy />} name="policies_panel" />

export default PoliciesPanel
