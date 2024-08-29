import React from "react"
import { Select } from "@4cplatform/elements/Forms"
import { useTranslations } from "@4cplatform/elements/Translations"
import queryString from "query-string"
import { useLocation } from "react-router-dom"
import { get } from "lodash"

// Helpers
import { JourneysContext } from "./journeys.context"

// Components
import { Search } from "../../Molecules"
import { TableActionsWrapper, TableActionsLeft, TableActionsRight } from "./journeys.styles"

const Actions = () => {
  const { setSearch, hasStatusFilter, setStatus, status, setFilter, filter } =
    React.useContext(JourneysContext)
  const { search } = useLocation()
  const qs = queryString.parse(search)
  const t = useTranslations()
  const statuses = ["IN_PROGRESS", "QUOTED", "COMPLETE"]

  const clientIdFilterParam = get(qs, "client_id", null)

  return (
    <TableActionsWrapper data-testid="journeys-actions-wrapper" hasLeftActions={hasStatusFilter}>
      <TableActionsLeft>
        {hasStatusFilter && (
          <Select
            name="filter_status"
            label="Filter status by"
            onChange={val => setStatus(val)}
            margin="0"
            value={status}
            labelWidth="auto"
            isHorizontal
          >
            {statuses.map(key => (
              <option key={key} value={key}>
                {t(key)}
              </option>
            ))}
          </Select>
        )}
      </TableActionsLeft>
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
          <option value="reference">Reference</option>
          {!clientIdFilterParam && <option value="client_name">Client name</option>}
          <option value="sales_agents_name">Sales agent name</option>
        </Select>
        <Search
          name="search_journeys"
          handleChange={val => setSearch(val)}
          onCancel={() => setSearch("")}
          margin="0"
        />
      </TableActionsRight>
    </TableActionsWrapper>
  )
}

export default Actions
