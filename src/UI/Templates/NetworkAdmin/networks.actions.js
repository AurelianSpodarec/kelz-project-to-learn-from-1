import React from "react"
import { Checkbox } from "@4cplatform/elements/Forms"

// Helpers
import { NetworksContext } from "./networks.context"

// Components
import { TableActionsWrapper, TableActionsButton, TableActionsRight } from "./networks.styles"
import { Search } from "../../Molecules"

const Actions = () => {
  const { setSearch, showDeleted, setShowDeleted } = React.useContext(NetworksContext)
  return (
    <TableActionsWrapper data-testid="networks-actions-wrapper">
      <Checkbox
        label="Show deleted networks"
        margin="0"
        name="show_deleted_networks"
        value={showDeleted}
        onChange={setShowDeleted}
      />
      <TableActionsRight>
        <Search
          name="search_networks"
          handleChange={val => setSearch(val)}
          onCancel={() => setSearch("")}
          margin="0 2rem 0 0"
        />
        <TableActionsButton
          trailingIcon="account-plus"
          type="Link"
          to="/networks/add"
          name="add_network"
        >
          Add network
        </TableActionsButton>
      </TableActionsRight>
    </TableActionsWrapper>
  )
}

export default Actions
