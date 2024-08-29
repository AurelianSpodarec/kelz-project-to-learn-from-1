import React, { useContext } from "react"
import { Checkbox } from "@4cplatform/elements/Forms"

// Helpers
import { ProvidersContext } from "./providers.context"

// Components
import { TableActionsWrapper, TableActionsRight, TableActionsButton } from "./providers.styles"
import { Search } from "../../Molecules"

const Actions = () => {
  const { setSearch, showDeleted, setShowDeleted } = useContext(ProvidersContext)
  return (
    <TableActionsWrapper data-testid="providers-actions-wrapper">
      <Checkbox
        label="Show deleted providers"
        margin="0"
        name="show_deleted_providers"
        value={showDeleted}
        onChange={setShowDeleted}
        data-testid="show-deleted-providers"
      />
      <TableActionsRight>
        <Search
          name="search_providers"
          handleChange={val => setSearch(val)}
          onCancel={() => setSearch("")}
          margin="0 2rem 0 0"
        />
        <TableActionsButton
          trailingIcon="account-plus"
          data-testid="add-provider"
          type="Link"
          to="/providers/add"
          name="add_provider"
        >
          Add provider
        </TableActionsButton>
      </TableActionsRight>
    </TableActionsWrapper>
  )
}

export default Actions
