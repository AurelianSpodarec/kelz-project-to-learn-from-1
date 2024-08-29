import React from "react"
import { get, capitalize } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { PageContext } from "../../../Organisms"
import { AgencyCodesContext } from "../agencyCodes.context"

// Components

const AgencyCodeRequests = () => {
  const {
    data,
    queryLoading,
    onRequestSelect,
    onRequestDeselect,
    pagination,
    setPage,
    setPerPage,
    onSort,
    sorting
  } = React.useContext(AgencyCodesContext)
  const {
    setPanelStatus,
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)

  return (
    <Table
      type="contained"
      data={data}
      isLoading={queryLoading}
      name="agency_codes_requests"
      columns={[
        {
          label: "Type",
          dataKey: "product_type",
          minWidth: "70px",
          sortable: true
        },
        [
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
          }
        ],
        {
          label: "Code",
          dataKey: "agency_code",
          minWidth: "180px",
          sortable: true
        },
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
          label: "Owner",
          dataKey: "owner.type",
          minWidth: "150px",
          render: row => capitalize(get(row, "data.owner.name")),
          sortable: true
        },
        {
          label: "Applied at",
          dataKey: "created_at",
          minWidth: "80px",
          render: row => {
            const date = get(row, "data.created_at")
            return date ? moment(date, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm") : "-"
          },
          sortable: true
        }
      ]}
      hasActions
      onClick={row => {
        onRequestSelect(row)
        setPanelStatus("open")
      }}
      onClose={() => {
        if (panelStatus !== "closed") {
          setPanelStatus("closed")
        }
        onRequestDeselect()
      }}
      isClosed={panelStatus === "closed"}
      pagination={pagination}
      changePage={e => setPage(e)}
      changePerPage={setPerPage}
      hasPerPage
      onSort={newSorting => onSort(newSorting)}
      sorting={sorting}
    />
  )
}

export default AgencyCodeRequests
