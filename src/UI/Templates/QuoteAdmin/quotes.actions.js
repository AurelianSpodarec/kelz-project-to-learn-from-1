import React from "react"
import { Select } from "@4cplatform/elements/Forms"

// Helpers
import { QuotesContext } from "./quotes.context"

// Components
import { Search } from "../../Molecules"
import { TableActionsWrapper, TableActionsRight } from "./quotes.styles"

const Actions = () => {
  const { setSearch, search, hasShowSimulated, hasStatusFilter, setFilter, filter } =
    React.useContext(QuotesContext)
  return (
    <TableActionsWrapper
      data-testid="quotes-actions-wrapper"
      hasLeftActions={hasShowSimulated || hasStatusFilter}
    >
      <TableActionsRight>
        <Select
          name="filter_search"
          onChange={val => setFilter(val)}
          margin="0 1rem 0 0"
          value={filter}
          label="Search by"
          labelWidth="auto"
          isHorizontal
        >
          <option value="client_name">Client name</option>
          <option value="organisation_name">Organisation name</option>
          <option value="sales_agent_name">Sales agent name</option>
        </Select>
        <Search
          name="search_quotes"
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
