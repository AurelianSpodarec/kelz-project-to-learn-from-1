import React from "react"
import { AuthWrapper } from "@4cplatform/elements/Auth"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"

// Components
import { Search } from "../../../Molecules"
import { TableActionsWrapper } from "./networkAgencyCodes.styles"
import AddRequestAgencyCode from "../components/AddRequestAgencyCode"

const Actions = () => {
  const { setSearch, search, isSharedWith } = React.useContext(AgencyCodesContext)
  return (
    <TableActionsWrapper hasAdd={!isSharedWith} data-testid="network_agency_codes-actions-wrapper">
      <Search
        name="search_network_agency_codes"
        handleChange={val => setSearch(val)}
        onCancel={() => setSearch("")}
        margin="0"
        defaultValue={search}
      />
      <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "NETWORK_ADMIN", "NETWORK_MEMBER_ADMIN"]}>
        {!isSharedWith && <AddRequestAgencyCode />}
      </AuthWrapper>
    </TableActionsWrapper>
  )
}

export default Actions
