import React from "react"
import { Checkbox, Select } from "@4cplatform/elements/Forms"

// Helpers
import { ClientsContext } from "./clients.context"

// Components
import { Search } from "../../Molecules"
import { TableActionsWrapper, TableActionsLeft, TableActionsRight } from "./clients.styles"

const Actions = () => {
  const { setSearch, search, setFilter, filter, showSimulated, setShowSimulated } =
    React.useContext(ClientsContext)
  return (
    <TableActionsWrapper data-testid="clients-policies-actions-wrapper" hasLeftActions>
      <TableActionsLeft>
        <Checkbox
          label="Show simulated policies"
          margin="0"
          name="show_simulated_policies"
          appearance="light"
          value={showSimulated}
          onChange={setShowSimulated}
          data-testid="show_simulated_policies"
        />
      </TableActionsLeft>

      <TableActionsRight>
        <Select
          name="filter_search"
          onChange={val => setFilter(val)}
          margin="0 1rem 0 0"
          value={filter}
        >
          <option value="reference">Reference</option>
          <option value="sales_agent">Agent</option>
          <option value="provider">Provider</option>
          <option value="product_name">Product</option>
          <option value="monthly">Monthly</option>
          <option value="created_at">Created</option>
          <option value="onboarded_at">Onboarded</option>
        </Select>
        <Search
          name="search_client_policies"
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
