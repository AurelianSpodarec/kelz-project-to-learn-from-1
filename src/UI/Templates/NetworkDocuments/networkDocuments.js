import React from "react"
import { get, upperFirst } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { NetworkDocumentsContext } from "./networkDocuments.context"
import { PageContext } from "../../Organisms"
import { getOrganisationAccess } from "./networkDocuments.helpers"

// Components
import Actions from "./networkDocuments.actions"

const NetworkDocuments = () => {
  const {
    data,
    selectedDocument,
    onDocumentSelect,
    setPerPage,
    pagination,
    setPage,
    onSort,
    sorting,
    queryLoading
  } = React.useContext(NetworkDocumentsContext)
  const {
    setPanelStatus,
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)

  return (
    <>
      <Actions />
      <Table
        data={data}
        name="network_documents"
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
            label: "Organisation access",
            dataKey: "shared_with_count",
            minWidth: "150px",
            render: row => getOrganisationAccess(get(row, "data"))
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
          row.id !== selectedDocument?.id && onDocumentSelect(row)
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

export default NetworkDocuments
