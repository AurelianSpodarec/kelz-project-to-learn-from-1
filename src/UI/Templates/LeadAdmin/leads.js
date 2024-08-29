import React, { useContext } from "react"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"
import { colours } from "@4cplatform/elements/Helpers"
import { AuthContext } from "@4cplatform/elements/Auth"

// Helpers
import { LeadsContext } from "./leads.context"
import { PageContext } from "../../Organisms"
import { getName } from "../../Helpers"

// Components
import Actions from "./leads.actions"

const LeadAdmin = () => {
  const { canAccess } = useContext(AuthContext)
  const {
    data,
    pagination,
    queryLoading,
    onLeadSelect,
    onLeadDeselect,
    sorting,
    onSort,
    setPage,
    setPerPage,
    config
  } = useContext(LeadsContext)
  const {
    setPanelStatus,
    panelStatusControls: { panelStatus }
  } = useContext(PageContext)

  return (
    <>
      <Actions />
      <Table
        data={data}
        isLoading={queryLoading}
        name="leads"
        columns={[
          { label: "Type", dataKey: "type", minWidth: "80px", sortable: true },
          {
            label: "First Name",
            dataKey: "first_name",
            minWidth: "150px",
            sortable: true,
            fieldColour: get(colours, "blue", "blue")
          },
          {
            label: "Last Name",
            dataKey: "last_name",
            minWidth: "150px",
            sortable: true,
            fieldColour: get(colours, "blue", "blue")
          },
          {
            label: "Disposition",
            dataKey: "disposition",
            minWidth: "300px",
            sortable: true,
            render: row => {
              const val = get(row, "data.disposition.disposition", "-")
              const dispositions = get(config, "disposition", {})
              return dispositions[val]
            }
          },
          canAccess(["SYS_ADMIN", "SUPPORT_ADMIN"]) && {
            label: "Sales Organisation",
            dataKey: "organisation",
            minWidth: "150px",
            sortable: true,
            render: row => get(row, "data.organisation.name", "")
          },
          canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"]) && {
            label: "Sales Agent",
            dataKey: "sales_agent",
            minWidth: "150px",
            sortable: true,
            render: row => getName({ data: get(row, "data.sales_agent") })
          },
          {
            label: "Created",
            dataKey: "created_at",
            minWidth: "180px",
            sortable: true,
            render: row => {
              const created = get(row, "data.created_at", "")
              return created ? moment(created, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm") : "-"
            }
          }
        ].filter(x => !!x)}
        hasActions
        onClick={row => {
          onLeadSelect(row)
          setPanelStatus("open")
        }}
        onClose={() => {
          onLeadDeselect()
          if (panelStatus !== "closed") {
            setPanelStatus("closed")
          }
        }}
        isClosed={panelStatus === "closed"}
        pagination={pagination}
        changePage={e => setPage(e)}
        changePerPage={setPerPage}
        hasPerPage
        perPageOptions={{ max: 50, interval: 5 }}
        sorting={sorting}
        onSort={newSorting => onSort(newSorting)}
        markAsGrey={lead => !!get(lead, "deleted_at", null)}
      />
    </>
  )
}

export default LeadAdmin
