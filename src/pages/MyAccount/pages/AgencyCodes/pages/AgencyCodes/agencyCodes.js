import React from "react"
import PropTypes from "prop-types"

// Components
import { AgencyCodeAdmin } from "../../../../../../UI/Templates"

import AgencyCodesProvider from "./context/usersAgencyCodes.provider"

const AgencyCodes = ({ isPending }) => (
  <AgencyCodesProvider isPending={isPending}>
    <AgencyCodeAdmin hasActions={false} />
  </AgencyCodesProvider>
)

AgencyCodes.defaultProps = {
  isPending: false
}

AgencyCodes.propTypes = {
  isPending: PropTypes.bool
}
export default AgencyCodes
