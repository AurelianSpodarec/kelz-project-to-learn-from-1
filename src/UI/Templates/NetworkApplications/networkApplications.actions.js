import React from "react"

// Helpers
import { NetworkApplicationsContext } from "./networkApplications.context"

// Components
import { TableActionsWrapper } from "./networkApplications.styles"
import { Search } from "../../Molecules"

const Actions = () => {
  const { setSearch } = React.useContext(NetworkApplicationsContext)
  return (
    <TableActionsWrapper data-testid="network_applications-actions-wrapper">
      <Search
        name="search_network_applications"
        handleChange={val => setSearch(val)}
        onCancel={() => setSearch("")}
      />
    </TableActionsWrapper>
  )
}

export default Actions
