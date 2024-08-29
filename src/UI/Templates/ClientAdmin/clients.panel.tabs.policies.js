import React from "react"
import { get } from "lodash"
import { Table } from "@4cplatform/elements/Organisms"
import { useTranslations } from "@4cplatform/elements/Translations"
import moment from "moment"

// Helpers
import { ClientsContext } from "./clients.context"
import { PageContext } from "../../Organisms"
import { getName } from "../../Helpers"

// Components
import Actions from "./clients.panel.policies.actions"
import ClientsPanelHeader from "./clients.panel.header"
import { PanelBody } from "../../Molecules/FlyOutPanel"
import ClientsPanelButtons from "./clients.panel.body.buttons"
import RowActions from "./clients.panel.tabs.policies.rowActions"

const ClientsPoliciesTab = () => {
  const { pagination, setPage, setPerPage, onSort, sorting, clientPolicies, getPoliciesLoading } =
    React.useContext(ClientsContext)
  const {
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)
  const t = useTranslations()

  return (
    <PanelBody>
      <ClientsPanelHeader isEdit />
      <ClientsPanelButtons margin="3rem 0 1rem" />
      <Actions />
      <Table
        appearance="light"
        data={clientPolicies}
        isLoading={getPoliciesLoading}
        name="clients"
        columns={[
          [
            {
              label: "Reference",
              dataKey: "reference",
              minWidth: "160px",
              sortable: true,
              render: row => t(get(row.data, "reference"))
            },
            {
              label: "Agent",
              dataKey: "sales_agent",
              minWidth: "160px",
              sortable: true,
              render: row => {
                const name = getName({
                  data: get(row.data, "sales_agent")
                })
                return name
              }
            }
          ],
          [
            {
              label: "Provider",
              dataKey: "provider",
              minWidth: "160px",
              sortable: true,
              render: row => t(get(row.data, "sales_agent.parent.name"))
            },
            {
              label: "Product",
              dataKey: "product_name",
              minWidth: "160px",
              sortable: true,
              render: row => t(get(row.data, "product_name"))
            }
          ],
          {
            label: "Monthly",
            dataKey: "monthly",
            minWidth: "160px",
            sortable: true,
            render: row => t(get(row.data, "monthly_premium"))
          },
          [
            {
              label: "Created",
              dataKey: "created_at",
              minWidth: "160px",
              sortable: true,
              render: row => {
                const created = get(row.data, "created_at", "")
                return moment(created, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
              }
            },
            {
              label: "Onboarded",
              dataKey: "onboarded_at",
              minWidth: "160px",
              sortable: true
              // onboarded date does not get returned from BE
              // render: row => t(get(row.data, "status"))
            }
          ],
          {
            label: "",
            dataKey: "id",
            minWidth: "200px",
            // eslint-disable-next-line react/display-name
            render: row => <RowActions data={get(row, "data")} />
          }
        ]}
        isClosed={panelStatus === "closed"}
        pagination={pagination}
        changePage={e => setPage(e)}
        changePerPage={setPerPage}
        hasPerPage
        onSort={newSorting => onSort(newSorting)}
        perPageOptions={{ max: 50, interval: 5 }}
        sorting={sorting}
      />
    </PanelBody>
  )
}

export default ClientsPoliciesTab
