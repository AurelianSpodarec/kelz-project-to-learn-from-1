import React from "react"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"
import { Icon } from "@4cplatform/elements/Atoms"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"
import { SharedAgencyCodesContext } from "./sharedAgencyCodes.context"
import { getIconDetails } from "../agencyCodes.helpers"

// Components
import Actions from "./sharedAgencyCodes.actions"

const MyAccountSharedAgencyCodes = () => {
  const {
    data,
    sharedAgencyCodesLoading,
    pagination,
    setPage,
    setPerPage,
    onSort,
    sorting,
    isPending
  } = React.useContext(SharedAgencyCodesContext)
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
        data={data}
        isLoading={sharedAgencyCodesLoading}
        columns={[
          {
            label: "Type",
            dataKey: "product_type",
            minWidth: "60px",
            sortable: true
          },
          {
            label: "Provider",
            dataKey: "provider.provider_key",
            minWidth: "60px",
            sortable: true
          },
          {
            label: "Product",
            dataKey: "product",
            minWidth: "60px",
            sortable: true
          },
          {
            label: "Agency code",
            dataKey: "agency_code",
            minWidth: "60px",
            sortable: true
          },
          ...statusColumn,
          {
            label: "Activated",
            dataKey: "activated_at",
            minWidth: "60px",
            render: row => {
              const activated = get(row, "data.activated_at", "")
              return moment(activated, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
            },
            sortable: true
          }
        ]}
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

export default MyAccountSharedAgencyCodes
