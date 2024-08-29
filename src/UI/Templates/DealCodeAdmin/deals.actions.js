import React from "react"
import { AuthWrapper } from "@4cplatform/elements/Auth"

// Helpers
import { DealCodesContext } from "./deals.context"

// Components
import { TableActionsWrapper, TableActionsButton } from "./deals.styles"
import { Search } from "../../Molecules"

const Actions = () => {
  const { setSearch } = React.useContext(DealCodesContext)
  return (
    <TableActionsWrapper data-testid="deal_codes-actions-wrapper">
      <Search
        name="search_deal_codes"
        handleChange={val => setSearch(val)}
        onCancel={() => setSearch("")}
        margin="0"
      />
      <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN"]}>
        <TableActionsButton
          trailingIcon="plus"
          name="add_deal_code"
          type="Link"
          to="/deal-codes/add"
          margin="0 0 0 2rem"
        >
          Add code
        </TableActionsButton>
      </AuthWrapper>
    </TableActionsWrapper>
  )
}

export default Actions
