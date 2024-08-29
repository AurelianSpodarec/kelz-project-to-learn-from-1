import React from "react"
import PropTypes from "prop-types"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { ClientsContext } from "../../clients.context"

// Components
import QuoteSummary from "./quote.summary"

const RowActions = ({ selectedQuote }) => {
  const { quoteSummaryModal, setQuoteSummaryModal } = React.useContext(ClientsContext)

  return (
    <>
      <Button
        type="inline-button"
        leadingIcon="arrow-right"
        iconSize="1.5rem"
        onClick={() => setQuoteSummaryModal(true)}
        name="view-quote"
      >
        View
      </Button>
      {quoteSummaryModal && <QuoteSummary selectedQuote={selectedQuote} />}
    </>
  )
}

RowActions.defaultProps = {
  selectedQuote: {}
}

RowActions.propTypes = {
  selectedQuote: PropTypes.object
}

export default RowActions
