import React, { useContext } from "react"
import { AuthContext } from "@4cplatform/elements/Auth"
import { Checkbox } from "@4cplatform/elements/Forms"

// Helpers
import { LeadsContext } from "./leads.context"

// Components
import { TableActionsWrapper, TableActionsRight, TableActionsButton } from "./leads.styles"
import { Search } from "../../Molecules"

const Actions = () => {
  const { setSearch, showDeleted, setShowDeleted, hasShowDeleted } = useContext(LeadsContext)
  const { canAccess } = useContext(AuthContext)

  const hasAddButton = canAccess(["ORG_ADMIN", "SALES_ADVISER"])

  return (
    <TableActionsWrapper hasShowDeleted={hasShowDeleted} data-testid="leads-actions-wrapper">
      {hasShowDeleted && (
        <Checkbox
          label="Show deleted leads"
          margin="0"
          name="show_deleted"
          value={showDeleted}
          onChange={setShowDeleted}
        />
      )}
      <TableActionsRight>
        <Search
          name="search_leads"
          handleChange={val => setSearch(val)}
          onCancel={() => setSearch("")}
          margin={hasAddButton ? "0 2rem 0 0" : "0"}
        />

        {hasAddButton && (
          <TableActionsButton
            trailingIcon="account-plus"
            name="add_lead"
            type="Link"
            to="/leads/add"
          >
            Add lead
          </TableActionsButton>
        )}
      </TableActionsRight>
    </TableActionsWrapper>
  )
}

export default Actions
