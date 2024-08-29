import React, { useContext } from "react"
import { Checkbox, Select } from "@4cplatform/elements/Forms"

// Helpers
import { ClientsContext } from "../../clients.context"

// Components
import { Search } from "../../../../Molecules"
import { TableActionsWrapper, TableActionsLeft, TableActionsRight } from "../../clients.styles"

const Actions = () => {
  const { quotesFilter, quotesSearch, quotesShowSimulated, updateQuotesPageValue } =
    useContext(ClientsContext)

  return (
    <TableActionsWrapper data-testid="clients-quotes-actions-wrapper" hasLeftActions>
      <TableActionsLeft>
        <Checkbox
          label="Show simulated quotes"
          margin="0"
          name="simulation_mode"
          appearance="light"
          value={quotesShowSimulated}
          onChange={value => updateQuotesPageValue("quotesShowSimulated", value)}
          data-testid="simulation_mode"
        />
      </TableActionsLeft>
      <TableActionsRight>
        <Select
          name="filter_search-quotes"
          onChange={value => updateQuotesPageValue("quotesFilter", value)}
          margin="0 1rem 0 0"
          value={quotesFilter}
        >
          <option value="reference">Reference</option>
          <option value="sales_agent_name">Agent</option>
          <option value="created_at">Created</option>
          <option value="type">Type</option>
        </Select>
        <Search
          name="search_client-quotes"
          handleChange={value => {
            if (quotesSearch.length > 0 && (value.length < 3 || value === quotesSearch)) {
              updateQuotesPageValue("quotesSearch", "")
            } else if (value.length >= 3) {
              updateQuotesPageValue("quotesSearch", value)
            }
          }}
          onCancel={() => updateQuotesPageValue("quotesSearch", "")}
          margin="0"
          defaultValue={quotesSearch}
        />
      </TableActionsRight>
    </TableActionsWrapper>
  )
}

export default Actions
