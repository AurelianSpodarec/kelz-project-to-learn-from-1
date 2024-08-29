import React, { useContext } from "react"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"
import { useTranslations } from "@4cplatform/elements/Translations"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { ClientsContext } from "../../clients.context"
import { PageContext } from "../../../../Organisms"

// Components
import Actions from "./actions"
import { IconWithText } from "../../../../Atoms"
import { PanelBody } from "../../../../Molecules/FlyOutPanel"
import ClientsPanelHeader from "../../clients.panel.header"
import ClientsPanelButtons from "../../clients.panel.body.buttons"
import RowActions from "./rowActions"

const ClientsQuotesTab = () => {
  const {
    clientQuotes,
    getQuotesLoading,
    quotesSorting,
    quotesPage: page,
    quotesPerPage: perPage,
    quotesTotal: total,
    updateQuotesPageValue
  } = useContext(ClientsContext)
  const {
    panelStatusControls: { panelStatus }
  } = useContext(PageContext)
  const t = useTranslations()
  const incompleteQuotes = clientQuotes.filter(quote => quote.status !== "COMPLETE")
  const pagination = { total, page, perPage }

  return (
    <PanelBody>
      <ClientsPanelHeader isWidePanel />
      <ClientsPanelButtons margin="3rem 0 1rem" />
      <Actions />
      <Table
        appearance="light"
        data={incompleteQuotes}
        isLoading={getQuotesLoading}
        name="quotes"
        columns={[
          {
            label: "Reference",
            dataKey: "reference",
            minWidth: "150px",
            sortable: true,
            render: row => t(get(row.data, "reference"))
          },
          {
            label: "Agent",
            dataKey: "sales_agent_name",
            minWidth: "150px",
            sortable: true,
            render: row => t(get(row.data, "sales_agent_name"))
          },
          {
            label: "Created",
            dataKey: "created_at",
            minWidth: "150px",
            sortable: true,
            render: row => {
              const created = get(row.data, "created_at", "")
              return moment(created, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
            }
          },
          {
            label: "Type",
            dataKey: "simulation_mode",
            minWidth: "150px",
            render: row => {
              const simulated = t(get(row, "simulation_mode"))
              const typeData = (
                <IconWithText
                  content={simulated ? "Simulated" : "Real"}
                  icon={simulated ? "cube-outline" : "check"}
                  iconColour={simulated ? colours.red : colours.green}
                  margin="0"
                  loadingWidth="8rem"
                  isLoading={getQuotesLoading}
                />
              )
              return typeData
            }
          },
          {
            label: "",
            dataKey: "id",
            minWidth: "200px",
            // eslint-disable-next-line react/display-name
            render: row => <RowActions selectedQuote={get(row, "data")} />
          }
        ]}
        isClosed={panelStatus === "closed"}
        pagination={pagination}
        changePage={value => updateQuotesPageValue("quotesPage", value)}
        changePerPage={value => updateQuotesPageValue("quotesPerPage", value)}
        hasPerPage
        perPageOptions={{ max: 50, interval: 5 }}
        sorting={quotesSorting}
        onSort={value => updateQuotesPageValue("quotesSorting", value)}
      />
    </PanelBody>
  )
}

export default ClientsQuotesTab
