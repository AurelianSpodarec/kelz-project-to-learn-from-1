import React, { useEffect, useContext } from "react"
import { useLocation } from "react-router-dom"
import { Checkbox, Select } from "@4cplatform/elements/Forms"
import { useTranslations } from "@4cplatform/elements/Translations"
import { AuthContext } from "@4cplatform/elements/Auth"

// Helpers
import { PoliciesContext } from "./policies.context"

// Components
import { Search } from "../../Molecules"
import { TableActionsWrapper, TableActionsLeft, TableActionsRight } from "./policies.styles"

const Actions = () => {
  const {
    setSearch,
    search,
    showSimulated,
    setShowSimulated,
    hasShowSimulated,
    hasStatusFilter,
    status,
    setStatus,
    resetStatus,
    filter,
    setFilter
  } = React.useContext(PoliciesContext)
  const t = useTranslations()
  const { search: lSearch } = useLocation()
  const { canAccess } = useContext(AuthContext)

  const statuses = [
    "ACCEPTED",
    "ACCEPTED_UNDERWRITING",
    "ACCEPTED_UNDERWRITING_WITH_EXCLUSIONS",
    "AWAITING_ACCEPTANCE",
    "AWAITING_TERMS",
    "DECLINED",
    "DECLINED_UNDERWRITING",
    "FAILED_ONBOARDING",
    "ONBOARDED"
  ]

  useEffect(() => {
    resetStatus?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lSearch])

  return (
    <TableActionsWrapper
      data-testid="policies-actions-wrapper"
      hasLeftActions={hasShowSimulated || hasStatusFilter}
    >
      <TableActionsLeft>
        {hasShowSimulated && (
          <Checkbox
            label="Show simulated policies"
            margin="0 1rem 0 0"
            name="showSimulated"
            value={showSimulated}
            onChange={setShowSimulated}
            data-testid="policy-admin-show-simulated"
          />
        )}
        {hasStatusFilter && canAccess(["PROVIDER_ADMIN"]) && (
          <Select
            name="filter_status"
            onChange={val => setStatus(val)}
            margin="0 1rem"
            value={Array.isArray(status) ? status[0] : ""}
            label="Filter status by"
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
          <option value="client_name">Client name</option>
          <option value="organisation_name">Organisation name</option>
          <option value="sales_agent_name">Sales agent name</option>
          <option value="provider_name">Provider name</option>
        </Select>
        <Search
          name="search_policies"
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
