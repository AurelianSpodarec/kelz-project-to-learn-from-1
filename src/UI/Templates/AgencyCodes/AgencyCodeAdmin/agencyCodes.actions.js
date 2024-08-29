import React from "react"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"

// Components
import { Search } from "../../../Molecules"
import { TableActionsWrapper } from "./agencyCodes.styles"

const Actions = () => {
  const { setSearch, search } = React.useContext(AgencyCodesContext)
  return (
    <TableActionsWrapper data-testid="agency_codes-actions-wrapper">
      <Search
        name="search_agency_codes"
        handleChange={val => setSearch(val)}
        onCancel={() => setSearch("")}
        margin="0"
        defaultValue={search}
      />
    </TableActionsWrapper>
  )
}

export default Actions
