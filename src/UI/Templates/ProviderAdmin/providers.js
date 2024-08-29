import React, { useContext } from "react"
import { get, toUpper } from "lodash"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { ProvidersContext } from "./providers.context"
import { PageContext } from "../../Organisms"

// Components
import Actions from "./providers.actions"

const ProviderAdmin = () => {
  const {
    data,
    onProviderSelect,
    onProviderDeselect,
    setPerPage,
    pagination,
    setPage,
    onSort,
    sorting,
    queryLoading
  } = useContext(ProvidersContext)
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
        name="providers"
        columns={[
          { label: "ID", dataKey: "id", minWidth: "80px", sortable: true },
          { label: "Provider name", dataKey: "name", minWidth: "180px", sortable: true },
          {
            label: "Abbreviation",
            dataKey: "abbreviation",
            minWidth: "100px",
            sortable: true,
            render: row => toUpper(get(row, "data.abbreviation"))
          },
          {
            label: "Registration number",
            dataKey: "registration_number",
            minWidth: "180px",
            sortable: true
          }
        ]}
        hasActions
        onClick={row => {
          onProviderSelect(row)
          setPanelStatus("open")
        }}
        onClose={() => {
          if (panelStatus !== "closed") {
            setPanelStatus("closed")
          }
          onProviderDeselect()
        }}
        isClosed={panelStatus === "closed"}
        pagination={pagination}
        changePage={e => setPage(e)}
        changePerPage={setPerPage}
        hasPerPage
        onSort={newSorting => onSort(newSorting)}
        perPageOptions={{ max: 20, interval: 5 }}
        sorting={sorting}
        markAsGrey={provider => !!get(provider, "deleted_at", null)}
      />
    </>
  )
}

export default ProviderAdmin
