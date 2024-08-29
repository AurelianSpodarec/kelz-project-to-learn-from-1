import React from "react"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"
import { QuotesContext } from "./quotes.context"
import { PageContext } from "../../Organisms"
import { getName } from "../../Helpers"

// Components
import Actions from "./quotes.actions"

const QuoteAdmin = () => {
  const {
    data,
    queryLoading,
    onQuoteSelect,
    onQuoteDeselect,
    pagination,
    setPage,
    setPerPage,
    onSort,
    sorting
  } = React.useContext(QuotesContext)

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
        name="quotes"
        columns={[
          {
            label: "Quote ref",
            dataKey: "reference",
            minWidth: "60px",
            sortable: true
          },
          {
            label: "Client",
            dataKey: "client.first_name",
            minWidth: "60px",
            fieldColour: get(colours, "blue", "blue"),
            sortable: true,
            render: row =>
              getName({
                data: get(row, "data.client")
              })
          },
          [
            {
              label: "Organisation",
              dataKey: "organisation.name",
              minWidth: "60px",
              sortable: true
            },
            {
              label: "Sales agent",
              dataKey: "sales_agent.firts_name",
              minWidth: "60px",
              sortable: true,
              render: row => getName({ data: get(row, "data.sales_agent") })
            }
          ],
          {
            label: "Product",
            dataKey: "product_name",
            minWidth: "60px",
            sortable: true
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
          },
          {
            label: "Updated",
            dataKey: "updated_at",
            minWidth: "60px",
            render: row => {
              const updated = get(row, "data.updated_at", "")
              return updated ? moment(updated, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm") : "-"
            },
            sortable: true
          }
        ]}
        hasActions
        onClick={row => {
          onQuoteSelect(row)
          setPanelStatus("open")
        }}
        onClose={() => {
          onQuoteDeselect()
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
        perPageOptions={{ max: 50, interval: 5 }}
        sorting={sorting}
      />
    </>
  )
}

export default QuoteAdmin
