import React from "react"
import { get } from "lodash"
import moment from "moment"
import { Icon } from "@4cplatform/elements/Atoms"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"
import { getAdditionalColumns } from "./organisationAgencyCodes.helpers"
import { PageContext } from "../../../Organisms"
import { AgencyCodesContext } from "../agencyCodes.context"
import { getIconDetails } from "../agencyCodes.helpers"

// Components
import Actions from "./organisationAgencyCodes.actions"

const OrganisationAgencyCodes = () => {
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
    type
  } = React.useContext(AgencyCodesContext)
  const {
    setPanelStatus,
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)

  return (
    <>
      <Actions />
      <Table
        type="contained"
        data={data}
        isLoading={queryLoading}
        name="organisation_agency_codes"
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
            label: "Agency code",
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
          ...getAdditionalColumns(type),
          {
            label:
              type === "shared_from_network" || type === "shared_with_users"
                ? "Shared date"
                : "Activation date",
            dataKey:
              type === "shared_from_network" || type === "shared_with_users"
                ? "shared_at"
                : "activated_at",
            minWidth: "80px",
            render: row => {
              const date = get(
                row,
                type === "shared_from_network" || type === "shared_with_users"
                  ? "data.shared_at"
                  : "data.activated_at"
              )
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

export default OrganisationAgencyCodes
