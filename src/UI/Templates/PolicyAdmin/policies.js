import React from "react"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"
import { PoliciesContext } from "./policies.context"
import { PageContext } from "../../Organisms"
import { getName } from "../../Helpers"

// Components
import Actions from "./policies.actions"

const PolicyAdmin = () => {
  const {
    data,
    queryLoading,
    onPolicySelect,
    onPolicyDeselect,
    pagination,
    setPage,
    setPerPage,
    onSort,
    sorting
  } = React.useContext(PoliciesContext)

  const {
    setPanelStatus,
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)
  const t = useTranslations()

  return (
    <>
      <Actions />
      <Table
        data={data}
        isLoading={queryLoading}
        name="policies"
        columns={[
          {
            label: "Policy ref",
            dataKey: "reference",
            minWidth: "60px",
            sortable: true
          },
          [
            {
              label: "Client name",
              dataKey: "client.first_name",
              minWidth: "60px",
              fieldColour: get(colours, "blue", "blue"),
              sortable: true,
              render: row =>
                getName({
                  data: get(row, "data.client"),
                  hasMiddle: true
                })
            },
            {
              label: "Underwriting status",
              dataKey: "status",
              minWidth: "60px",
              sortable: true,
              render: row => t(get(row.data, "status"))
            }
          ],
          [
            {
              label: "Organisation",
              dataKey: "organisation.name",
              minWidth: "60px",
              sortable: true
            },
            {
              label: "Sales Agent",
              dataKey: "sales_agent",
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
          [
            {
              label: "Annual",
              dataKey: "annual_premium",
              minWidth: "60px",
              render: row => {
                const premium = get(row, "data.annual_premium", "")
                return premium ? `£${premium}` : "-"
              },
              sortable: true
            },
            {
              label: "Months of Cover",
              dataKey: "months_of_cover",
              minWidth: "80px",
              sortable: true
            }
          ],
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
        ]}
        hasActions
        onClick={row => {
          onPolicySelect(row)
          setPanelStatus("open")
        }}
        onClose={() => {
          setPanelStatus("closed")
          onPolicyDeselect()
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

export default PolicyAdmin
