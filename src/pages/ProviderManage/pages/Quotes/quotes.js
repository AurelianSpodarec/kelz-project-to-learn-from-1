import React from "react"
import PropTypes from "prop-types"

// Components
import QuotesProvider from "./context/quotes.provider"
import QuoteAdmin, { QuotesPanel } from "../../../../UI/Templates/QuoteAdmin"

const Quotes = ({ isSimulated }) => (
  <QuotesProvider isSimulated={isSimulated}>
    <QuoteAdmin />
    <QuotesPanel />
  </QuotesProvider>
)

Quotes.defaultProps = {
  isSimulated: false
}

Quotes.propTypes = {
  isSimulated: PropTypes.bool
}

export default Quotes
