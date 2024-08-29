import React from "react"

// Helpers
import { SharedAgencyCodesContext } from "./sharedAgencyCodes.context"

// Components
import { Search } from "../../../Molecules"
import { TableActionsWrapper, TableActionsRight } from "./sharedAgencyCodes.styles"

const Actions = () => {
  const { setSearch, search } = React.useContext(SharedAgencyCodesContext)
  return (
    <TableActionsWrapper data-testid="agency_codes-actions-wrapper">
      <TableActionsRight>
        <Search
          name="search_shared_agency_codes"
          handleChange={val => setSearch(val)}
          onCancel={() => setSearch("")}
          margin="0"
          defaultValue={search}
        />
      </TableActionsRight>
    </TableActionsWrapper>
  )
}

export default Actions
