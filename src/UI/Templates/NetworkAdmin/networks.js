import React from "react"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { getName } from "../../Helpers"
import { NetworksContext } from "./networks.context"
import { PageContext } from "../../Organisms"

// Components
import Actions from "./networks.actions"

const NetworkAdmin = () => {
  const { data, onNetworkSelect, setPerPage, pagination, setPage, onSort, sorting, queryLoading } =
    React.useContext(NetworksContext)
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
        name="networks"
        columns={[
          {
            label: "ID",
            dataKey: "id",
            minWidth: "80px",
            sortable: true
          },
          {
            label: "Network name",
            dataKey: "name",
            minWidth: "180px",
            sortable: true
          },
          {
            label: "Contact name",
            dataKey: "contact_last_name",
            minWidth: "180px",
            sortable: true,
            render: row => {
              const name = getName({ data: get(row, "data"), isContact: true })
              return name
            }
          },
          {
            label: "Contact email",
            dataKey: "contact_email_address",
            minWidth: "180px",
            sortable: true
          },
          {
            label: "Last logged in",
            dataKey: "last_logged_in_at",
            minWidth: "180px",
            render: row => {
              const lastLoggedIn = get(row, "data.last_logged_in_at", "")
              return lastLoggedIn
                ? moment(lastLoggedIn, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
                : "-"
            },
            sortable: true
          }
        ]}
        hasActions
        onClick={row => {
          onNetworkSelect(row)
          setPanelStatus("open")
        }}
        onClose={() => {
          if (panelStatus !== "closed") {
            setPanelStatus("closed")
          }
        }}
        isClosed={panelStatus === "closed"}
        pagination={pagination}
        changePage={e => setPage(e)}
        changePerPage={setPerPage}
        hasPerPage
        onSort={newSorting => onSort(newSorting)}
        perPageOptions={{ max: 20, interval: 5 }}
        sorting={sorting}
        markAsGrey={network => !!get(network, "deleted_at", null)}
      />
    </>
  )
}

export default NetworkAdmin
