import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import ProviderView from "./providers.panel.view"

const ProvidersPanel = () => <FlyOutPanel body={() => <ProviderView />} name="providers_panel" />

export default ProvidersPanel
