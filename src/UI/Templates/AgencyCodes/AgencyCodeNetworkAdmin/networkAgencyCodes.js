import React from "react"
import { get } from "lodash"
import moment from "moment"
import { Icon } from "@4cplatform/elements/Atoms"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"
import { PageContext } from "../../../Organisms"
import { AgencyCodesContext } from "../agencyCodes.context"
import { getIconDetails, getOrganisationAccess } from "../agencyCodes.helpers"

// Components
import Actions from "./networkAgencyCodes.actions"

const NetworkAgencyCodes = () => {
  const {
    data,
    queryLoading,
    onAgencyCodeSelect,
    onAgencyCodeDeselect,
    pagination,
    setPage,
    setPerPage,
    onSort,
    sorting,
    isSharedWith
  } = React.useContext(AgencyCodesContext)
  const {
    setPanelStatus,
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)

  const sharedWithColumns = isSharedWith
    ? [
        {
          label: "Rate",
          dataKey: "primary_commission_rate",
          minWidth: "50px",
          render: row =>
            get(row, "data.primary_commission_rate")
              ? `${get(row, "data.primary_commission_rate")}%`
              : "0%",
          sortable: true
        },
        {
          label: "Shared With",
          dataKey: "shared_with_count",
          minWidth: "100px",
          sortable: true,
          render: row => getOrganisationAccess(get(row, "data"))
        }
      ]
    : []

  return (
    <>
      <Actions />
      <Table
        type="contained"
        data={data}
        isLoading={queryLoading}
        name="network_agency_codes"
        columns={[
          {
            label: "Type",
            dataKey: "product_type",
            minWidth: "70px",
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
            label: "Code",
            dataKey: "agency_code",
            minWidth: "180px",
            sortable: true
          },
          {
            label: "Status",
            dataKey: "status",
            minWidth: "50px",
            // eslint-disable-next-line react/display-name
            render: row => {
              const statusIcon = getIconDetails(get(row, "data.status", null))
              const isShared = get(row, "data.shared_with_count", 0) > 0
              return (
                <>
                  <Icon {...statusIcon} />
                  {isShared && <Icon icon="account-multiple" colour={colours.blue} />}
                </>
              )
            },
            sortable: true
          },
          ...sharedWithColumns,
          {
            label: !isSharedWith ? "Activated at" : "Shared at",
            dataKey: !isSharedWith ? "activated_at" : "shared_at",
            minWidth: "80px",
            render: row => {
              const date = get(row, !isSharedWith ? "data.activated_at" : "data.shared_at")
              return date ? moment(date, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm") : "-"
            }
          }
        ]}
        hasActions
        onClick={row => {
          onAgencyCodeSelect(row)
          setPanelStatus("open")
        }}
        onClose={() => {
          if (panelStatus !== "closed") {
            setPanelStatus("closed")
          }
          onAgencyCodeDeselect()
        }}
        isClosed={panelStatus === "closed"}
        pagination={pagination}
        changePage={e => setPage(e)}
        changePerPage={setPerPage}
        hasPerPage
        onSort={newSorting => onSort(newSorting)}
        sorting={sorting}
      />
    </>
  )
}

export default NetworkAgencyCodes
