import React from "react"
import PropTypes from "prop-types"

// Components
import AgencyCodesProvider from "./context/agencyCodes.provider"
import { AgencyCodeAdmin, AgencyCodesPanel } from "../../../../UI/Templates"

const AgencyCodes = ({ isPending }) => (
  <AgencyCodesProvider isPending={isPending}>
    <AgencyCodeAdmin />
    <AgencyCodesPanel />
  </AgencyCodesProvider>
)

AgencyCodes.defaultProps = {
  isPending: false
}

AgencyCodes.propTypes = {
  isPending: PropTypes.bool
}

export default AgencyCodes
