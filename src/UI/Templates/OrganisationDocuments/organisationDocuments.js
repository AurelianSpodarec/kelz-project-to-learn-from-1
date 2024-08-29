import React from "react"
import { get, upperFirst } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { OrganisationDocumentsContext } from "./organisationDocuments.context"
import { PageContext } from "../../Organisms"

const OrganisationDocuments = () => {
  const { data, onDocumentSelect, setPerPage, pagination, setPage, onSort, sorting, queryLoading } =
    React.useContext(OrganisationDocumentsContext)
  const {
    setPanelStatus,
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)

  return (
    <>
      <Table
        data={data}
        name="organisation_documents"
        isLoading={queryLoading}
        columns={[
          { label: "Document name", dataKey: "name", minWidth: "150px", sortable: true },
          {
            label: "Current version",
            dataKey: "current_active_version.version_number",
            minWidth: "80px"
          },
          {
            label: "Display point",
            dataKey: "display_point",
            minWidth: "150px",
            sortable: true,
            render: row => upperFirst(get(row, "data.display_point", "-"))
          },
          {
            label: "Created",
            dataKey: "created_at",
            minWidth: "180px",
            sortable: true,
            render: row => {
              const created = get(row, "data.created_at", "")
              return moment(created, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
            }
          }
        ]}
        hasActions
        onClick={row => {
          onDocumentSelect(row)
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
      />
    </>
  )
}

export default OrganisationDocuments
