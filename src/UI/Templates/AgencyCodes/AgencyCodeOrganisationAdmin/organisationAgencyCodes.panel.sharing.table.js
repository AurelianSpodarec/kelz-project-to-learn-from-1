import React from "react"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"
import { getName } from "../../../Helpers"

const UsersTable = () => {
  const {
    sharedUsers,
    sharedUsersPagination,
    setSharedUsersPage,
    sharedUsersLoading,
    setSharedUsersPerPage
  } = React.useContext(AgencyCodesContext)

  return (
    <Table
      data={sharedUsers}
      name="share_with"
      columns={[
        {
          label: "User",
          dataKey: "name",
          minWidth: "120px",
          render: row => getName({ data: get(row, "data") })
        },
        {
          label: "Shared At",
          dataKey: "shared_at",
          minWidth: "120px",
          render: row => {
            const shared = get(row, "data.shared_at", "")
            return moment(shared, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
          }
        }
      ]}
      hasActions={false}
      perPageOptions={{ max: 15, interval: 5 }}
      changePerPage={setSharedUsersPerPage}
      hasPerPage
      changePage={e => setSharedUsersPage(e)}
      pagination={sharedUsersPagination}
      appearance="light"
      isLoading={sharedUsersLoading}
    />
  )
}

export default UsersTable
