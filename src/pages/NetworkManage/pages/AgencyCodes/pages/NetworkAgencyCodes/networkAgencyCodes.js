import React from "react"
import PropTypes from "prop-types"

// Components
import NetworkAgencyCodesProvider from "./context/networkAgencyCodes.provider"
import { AgencyCodeNetworkAdmin, NetworkAgencyCodesPanel } from "../../../../../../UI/Templates"

const NetworkAgencyCodes = ({ isSharedWith }) => (
  <NetworkAgencyCodesProvider isSharedWith={isSharedWith}>
    <AgencyCodeNetworkAdmin />
    <NetworkAgencyCodesPanel />
  </NetworkAgencyCodesProvider>
)

NetworkAgencyCodes.propTypes = {
  isSharedWith: PropTypes.bool
}

export default NetworkAgencyCodes
