import React from "react"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { NetworkOrganisationsContext } from "./networkOrganisations.context"
import { PageContext } from "../../Organisms"
import { getName } from "../../Helpers"

// Components
import Actions from "./networkOrganisations.actions"

const NetworkOrganisations = () => {
  const {
    data,
    pagination,
    queryLoading,
    onOrganisationSelect,
    sorting,
    onSort,
    setPage,
    setPerPage
  } = React.useContext(NetworkOrganisationsContext)

  const {
    setPanelStatus,
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)

  return (
    <>
      <Actions />
      <Table
        data={data}
        isLoading={queryLoading}
        name="network_organisations"
        columns={[
          { label: "ID", dataKey: "id", minWidth: "80px", sortable: true },
          { label: "Company name", dataKey: "name", minWidth: "100px", sortable: true },
          {
            label: "Contact name",
            dataKey: "contact_first_name",
            minWidth: "100px",
            sortable: true,
            render: row => {
              const rowData = get(row, "data", {})

              return getName({ data: rowData, isContact: true })
            }
          },
          {
            label: "Contact email",
            dataKey: "contact_email_address",
            minWidth: "100px",
            sortable: true
          },
          {
            label: "Last logged in",
            dataKey: "last_logged_in_at",
            minWidth: "100px",
            sortable: true,
            render: row => {
              const lastLoggedIn = get(row, "data.last_logged_in_at", "")
              return lastLoggedIn
                ? moment(lastLoggedIn, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
                : "-"
            }
          }
        ]}
        hasActions
        onClick={row => {
          onOrganisationSelect(row)
          setPanelStatus("open")
        }}
        isClosed={panelStatus === "closed"}
        pagination={pagination}
        changePage={e => setPage(e)}
        changePerPage={setPerPage}
        hasPerPage
        perPageOptions={{ max: 50, interval: 5 }}
        sorting={sorting}
        onSort={newSorting => onSort(newSorting)}
      />
    </>
  )
}

export default NetworkOrganisations
