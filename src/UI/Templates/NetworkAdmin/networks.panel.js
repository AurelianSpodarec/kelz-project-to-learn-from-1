import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import NetworkView from "./networks.panel.view"

const NetworksPanel = () => <FlyOutPanel body={() => <NetworkView />} name="networks_panel" />

export default NetworksPanel
