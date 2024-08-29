import React from "react"
import { Checkbox } from "@4cplatform/elements/Forms"

// Helpers
import { OrganisationsContext } from "./organisations.context"

// Components
import { TableActionsWrapper, TableActionsRight } from "./organisations.styles"
import { Search } from "../../Molecules"

const Actions = () => {
  const { setSearch, showDeleted, setShowDeleted } = React.useContext(OrganisationsContext)
  return (
    <>
      <TableActionsWrapper data-testid="organisations-actions-wrapper">
        <Checkbox
          label="Show deleted organisations"
          margin="0"
          name="show_deleted"
          value={showDeleted}
          onChange={setShowDeleted}
        />
        <TableActionsRight>
          <Search
            name="search_organisations"
            handleChange={val => setSearch(val)}
            onCancel={() => setSearch("")}
            margin="0"
          />
        </TableActionsRight>
      </TableActionsWrapper>
    </>
  )
}

export default Actions
