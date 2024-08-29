/* eslint-disable react/display-name */
import React from "react"
import { get } from "lodash"
import moment from "moment"
import { Icon } from "@4cplatform/elements/Atoms"
import { colours } from "@4cplatform/elements/Helpers"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { DealCodesContext } from "./deals.context"
import { PageContext } from "../../Organisms"

// Components
import Actions from "./deals.actions"

const DealCodeAdmin = () => {
  const { data, pagination, queryLoading, onDealCodeSelect, sorting, onSort, setPage, setPerPage } =
    React.useContext(DealCodesContext)

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
        name="deal_codes"
        columns={[
          {
            label: "Type",
            dataKey: "product_type",
            minWidth: "80px",
            sortable: true
          },
          {
            label: "Provider",
            dataKey: "provider.name",
            minWidth: "180px",
            sortable: true
          },
          {
            label: "Product",
            dataKey: "product",
            minWidth: "180px",
            sortable: true
          },
          {
            label: "Name",
            dataKey: "name",
            minWidth: "100px",
            sortable: true
          },
          {
            label: "Code",
            dataKey: "deal_code",
            minWidth: "100px",
            sortable: true
          },
          {
            label: "Start date",
            dataKey: "start_date",
            minWidth: "100px",
            sortable: true,
            render: row => {
              const starts = get(row, "data.start_date", "")
              return starts ? moment(starts, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm") : "-"
            }
          },
          {
            label: "End date",
            dataKey: "end_date",
            minWidth: "100px",
            sortable: true,
            render: row => {
              const ends = get(row, "data.end_date", "")
              return ends ? moment(ends, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm") : "-"
            }
          },
          {
            label: "Status",
            dataKey: "active",
            minWidth: "80px",
            sortable: true,
            render: row => {
              const active = get(row, "data.active")
              return (
                <Icon
                  icon={active ? "check-circle" : "close-circle"}
                  colour={active ? colours.green : colours.red}
                />
              )
            }
          }
        ]}
        hasActions
        onClick={row => {
          onDealCodeSelect(row)
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
        perPageOptions={{ max: 50, interval: 5 }}
        sorting={sorting}
        onSort={newSorting => onSort(newSorting)}
      />
    </>
  )
}

export default DealCodeAdmin
