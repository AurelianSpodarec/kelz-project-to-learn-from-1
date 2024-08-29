import React from "react"
import { AuthWrapper } from "@4cplatform/elements/Auth"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"

// Components
import { Search } from "../../../Molecules"
import { TableActionsWrapper } from "./organisationAgencyCodes.styles"
import AddRequestAgencyCode from "../components/AddRequestAgencyCode"

const Actions = () => {
  const { setSearch, search, type } = React.useContext(AgencyCodesContext)
  const isSharedWith =
    type === "shared_from_network" || type === "shared_with_users" || type === "assigned_to_users"
  return (
    <TableActionsWrapper
      hasAdd={!isSharedWith}
      data-testid="organisation_agency_codes-actions-wrapper"
    >
      <Search
        name="search_organisation_agency_codes"
        handleChange={val => setSearch(val)}
        onCancel={() => setSearch("")}
        margin="0"
        defaultValue={search}
      />
      <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"]}>
        {!isSharedWith && <AddRequestAgencyCode />}
      </AuthWrapper>
    </TableActionsWrapper>
  )
}

export default Actions
