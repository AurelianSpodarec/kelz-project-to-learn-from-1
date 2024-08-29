import React from "react"
import PropTypes from "prop-types"
import { get, capitalize } from "lodash"
import moment from "moment"
import { Icon } from "@4cplatform/elements/Atoms"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"
import { PageContext } from "../../../Organisms"
import { AgencyCodesContext } from "../agencyCodes.context"
import { getIconDetails } from "../agencyCodes.helpers"

// Components
import Actions from "./agencyCodes.actions"

const AgencyCodes = ({ hasActions }) => {
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
    isPending
  } = React.useContext(AgencyCodesContext)
  const {
    setPanelStatus,
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)
  const statusColumn = !isPending
    ? [
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
        name="agency_codes"
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
          ...statusColumn,
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
            render: row => capitalize(get(row, "data.owner.type")),
            sortable: true
          },
          {
            label: !isPending ? "Activated at" : "Applied at",
            dataKey: !isPending ? "activated_at" : "created_at",
            minWidth: "80px",
            render: row => {
              const date = get(row, !isPending ? "data.activated_at" : "data.created_at")
              return date ? moment(date, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm") : "-"
            },
            sortable: true
          }
        ]}
        hasActions={hasActions}
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

AgencyCodes.defaultProps = {
  hasActions: true
}

AgencyCodes.propTypes = {
  hasActions: PropTypes.bool
}
export default AgencyCodes
