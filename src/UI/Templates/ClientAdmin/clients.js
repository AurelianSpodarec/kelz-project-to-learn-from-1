import React, { useContext } from "react"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"
import { AuthContext } from "@4cplatform/elements/Auth"

// Helpers
import { ClientsContext } from "./clients.context"
import { PageContext } from "../../Organisms"
import { getName } from "../../Helpers"

// Components
import Actions from "./clients.actions"

const ClientAdmin = () => {
  const { canAccess } = useContext(AuthContext)
  const {
    data,
    queryLoading,
    onClientSelect,
    onClientDeselect,
    pagination,
    setPage,
    setPerPage,
    onSort,
    sorting
  } = useContext(ClientsContext)
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
        name="clients"
        columns={[
          {
            label: "First name",
            dataKey: "first_name",
            minWidth: "180px",
            sortable: true
          },
          {
            label: "Last name",
            dataKey: "last_name",
            minWidth: "180px",
            sortable: true
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
            minWidth: "60px",
            render: row => {
              const created = get(row, "data.created_at", "")
              return moment(created, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
            },
            sortable: true
          }
        ].filter(x => !!x)}
        hasActions
        onClick={row => {
          onClientSelect(row)
          setPanelStatus("open")
        }}
        onClose={() => {
          onClientDeselect()
          if (panelStatus !== "closed") {
            setPanelStatus("closed")
          }
        }}
        isClosed={panelStatus === "closed"}
        pagination={pagination}
        changePage={setPage}
        changePerPage={setPerPage}
        hasPerPage
        perPageOptions={{ max: 50, interval: 5 }}
        sorting={sorting}
        onSort={onSort}
      />
    </>
  )
}

export default ClientAdmin
