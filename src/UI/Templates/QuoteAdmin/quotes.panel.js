import React from "react"
import { FlyOutPanel } from "../../Molecules"

// Components
import QuoteView from "./quotes.panel.view"

const QuotesPanel = () => <FlyOutPanel body={() => <QuoteView />} name="quotes_panel" />

export default QuotesPanel
