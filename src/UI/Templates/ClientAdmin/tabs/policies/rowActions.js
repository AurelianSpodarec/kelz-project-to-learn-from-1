import React from "react"
import PropTypes from "prop-types"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { ClientsContext } from "../../clients.context"

// Components
import PolicySummary from "./policy.summary"

const RowActions = ({ data }) => {
  const { policySummaryModal, setPolicySummaryModal } = React.useContext(ClientsContext)

  return (
    <>
      <Button
        type="inline-button"
        leadingIcon="arrow-right"
        iconSize="1.5rem"
        onClick={() => setPolicySummaryModal(true)}
        name="view-policy"
      >
        View
      </Button>
      {policySummaryModal && <PolicySummary data={data} />}
    </>
  )
}

RowActions.defaultProps = {
  data: {}
}

RowActions.propTypes = {
  data: PropTypes.object
}

export default RowActions
