import React from "react"
import PropTypes from "prop-types"

// Components
import OrganisationAgencyCodesProvider from "./context/organisationAgencyCodes.provider"
import {
  AgencyCodeOrganisationAdmin,
  OrganisationAgencyCodesPanel
} from "../../../../../../UI/Templates"

const OrganisationAgencyCodes = ({ type }) => (
  <OrganisationAgencyCodesProvider type={type}>
    <AgencyCodeOrganisationAdmin />
    <OrganisationAgencyCodesPanel />
  </OrganisationAgencyCodesProvider>
)

OrganisationAgencyCodes.defaultProps = {
  type: "default"
}

OrganisationAgencyCodes.propTypes = {
  type: PropTypes.oneOf([
    "default",
    "shared_from_network",
    "shared_with_users",
    "assigned_to_users"
  ])
}

export default OrganisationAgencyCodes
