import React from "react"

// Helpers
import { ClientsContext } from "./clients.context"

// Components
import { Search } from "../../Molecules"
import { TableActionsWrapper, TableActionsRight } from "./clients.styles"

const Actions = () => {
  const { setSearch } = React.useContext(ClientsContext)
  return (
    <TableActionsWrapper data-testid="clients-actions-wrapper">
      <TableActionsRight>
        <Search
          name="search_clients"
          handleChange={val => setSearch(val)}
          onCancel={() => setSearch("")}
          margin="0"
        />
      </TableActionsRight>
    </TableActionsWrapper>
  )
}

export default Actions
