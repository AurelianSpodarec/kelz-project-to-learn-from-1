import React from "react"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { getName } from "../../Helpers"
import { NetworkApplicationsContext } from "./networkApplications.context"

// Components
import Actions from "./networkApplications.actions"
import RowActions from "./networkApplications.rowActions"

const NetworkApplications = () => {
  const { data, queryLoading, pagination, setPage, onSort, sorting, setPerPage } = React.useContext(
    NetworkApplicationsContext
  )

  return (
    <>
      <Actions />
      <Table
        data={data}
        isLoading={queryLoading}
        name="network_applications"
        columns={[
          {
            label: "Contact name",
            dataKey: "contact_last_name",
            minWidth: "180px",
            sortable: true,
            render: row => {
              const name = getName({ data: get(row, "data.user") })
              return name
            }
          },
          {
            label: "Organisation name",
            dataKey: "organisation.name",
            minWidth: "180px",
            sortable: true,
            render: row => get(row, "data.organisation.name")
          },
          {
            label: "Application date",
            dataKey: "created_at",
            minWidth: "180px",
            sortable: true,
            render: row => {
              const created = get(row, "data.created_at", "")
              return created ? moment(created, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm") : "-"
            }
          },
          {
            label: "",
            dataKey: "row_actions",
            minWidth: "200px",
            // eslint-disable-next-line react/display-name
            render: row => <RowActions data={get(row, "data")} />
          }
        ]}
        pagination={pagination}
        changePage={e => setPage(e)}
        changePerPage={setPerPage}
        hasPerPage
        onSort={newSorting => onSort(newSorting)}
        perPageOptions={{ max: 20, interval: 5 }}
        sorting={sorting}
      />
    </>
  )
}

export default NetworkApplications
