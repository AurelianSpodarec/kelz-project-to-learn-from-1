import React from "react"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"

const OrgsTable = () => {
  const {
    sharedOrganisations,
    sharedOrganisationsPagination,
    setSharedOrganisationsPage,
    sharedOrganisationsLoading,
    setSharedOrganisationsPerPage
  } = React.useContext(AgencyCodesContext)

  return (
    <Table
      data={sharedOrganisations}
      name="share_with"
      columns={[
        { label: "Organisation", dataKey: "name", minWidth: "120px" },
        {
          label: "Shared At",
          dataKey: "shared_at",
          minWidth: "120px",
          render: row => {
            const shared = get(row, "data.shared_at", "")
            return moment(shared, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
          }
        }
      ]}
      hasActions={false}
      perPageOptions={{ max: 15, interval: 5 }}
      changePerPage={setSharedOrganisationsPerPage}
      hasPerPage
      changePage={e => setSharedOrganisationsPage(e)}
      pagination={sharedOrganisationsPagination}
      appearance="light"
      isLoading={sharedOrganisationsLoading}
    />
  )
}

export default OrgsTable
