import React from "react"
import PropTypes from "prop-types"

// Components
import PoliciesProvider from "./context/policies.provider"
import PolicyAdmin, { PoliciesPanel } from "../../../../UI/Templates/PolicyAdmin"

const Policies = ({ isSimulated }) => (
  <PoliciesProvider isSimulated={isSimulated}>
    <PolicyAdmin />
    <PoliciesPanel />
  </PoliciesProvider>
)

Policies.defaultProps = {
  isSimulated: false
}

Policies.propTypes = {
  isSimulated: PropTypes.bool
}

export default Policies
