import React from "react"
import PropTypes from "prop-types"

// Components
import NetworkPoliciesProvider from "./context/policies.provider"
import PolicyAdmin, { PoliciesPanel } from "../../../../UI/Templates/PolicyAdmin"

const Policies = ({ isSimulated }) => (
  <NetworkPoliciesProvider isSimulated={isSimulated}>
    <PolicyAdmin />
    <PoliciesPanel />
  </NetworkPoliciesProvider>
)

Policies.defaultProps = {
  isSimulated: false
}

Policies.propTypes = {
  isSimulated: PropTypes.bool
}

export default Policies
