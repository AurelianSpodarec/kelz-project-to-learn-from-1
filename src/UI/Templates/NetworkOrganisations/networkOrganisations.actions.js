import React from "react"

// Helpers
import { NetworkOrganisationsContext } from "./networkOrganisations.context"

// Components
import { TableActionsWrapper } from "./networkOrganisations.styles"
import { Search } from "../../Molecules"

const Actions = () => {
  const { setSearch } = React.useContext(NetworkOrganisationsContext)
  return (
    <TableActionsWrapper data-testid="network_organisations-actions-wrapper">
      <Search
        name="search_network_organisations"
        handleChange={val => setSearch(val)}
        onCancel={() => setSearch("")}
        margin="0"
      />
    </TableActionsWrapper>
  )
}

export default Actions
