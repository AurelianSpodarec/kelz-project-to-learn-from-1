import React from "react"

// Components
import QuotesProvider from "./context/quotes.provider"
import QuoteAdmin, { QuotesPanel } from "../../../../UI/Templates/QuoteAdmin"

const Quotes = () => (
  <QuotesProvider>
    <QuoteAdmin />
    <QuotesPanel />
  </QuotesProvider>
)

export default Quotes
