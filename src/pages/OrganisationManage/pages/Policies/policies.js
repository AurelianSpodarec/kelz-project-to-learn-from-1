import React from "react"
import PropTypes from "prop-types"

// Components
import OrganisationPoliciesProvider from "./context/policies.provider"
import PolicyAdmin, { PoliciesPanel } from "../../../../UI/Templates/PolicyAdmin"

const Policies = ({ isSimulated }) => (
  <OrganisationPoliciesProvider isSimulated={isSimulated}>
    <PolicyAdmin />
    <PoliciesPanel />
  </OrganisationPoliciesProvider>
)

Policies.defaultProps = {
  isSimulated: false
}

Policies.propTypes = {
  isSimulated: PropTypes.bool
}

export default Policies
