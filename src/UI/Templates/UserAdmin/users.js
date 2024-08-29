import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { Table } from "@4cplatform/elements/Organisms"
import { colours } from "@4cplatform/elements/Helpers"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { UsersContext } from "./users.context"
import { PageContext } from "../../Organisms"

// Components
import Actions from "./users.actions"

const UserAdmin = ({ context }) => {
  const t = useTranslations()
  const { data, onUserSelect, setPerPage, pagination, setPage, onSort, sorting, queryLoading } =
    React.useContext(UsersContext)

  const {
    setPanelStatus,
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)

  // If the context is manage-team, organisation is implied - do not add to table
  let parent = []
  if (context === "user-admin") {
    parent = [
      [
        { label: "Organisation name", dataKey: "parent.name", minWidth: "200px", sortable: true },
        {
          label: "Organisation type",
          dataKey: "parent.type",
          minWidth: "200px",
          render: row => t(get(row, "data.parent.type", "-"))
        }
      ]
    ]
  }

  return (
    <>
      <Actions />
      <Table
        data={data}
        isLoading={queryLoading}
        name="users"
        columns={[
          [
            {
              label: "First Name",
              dataKey: "first_name",
              minWidth: "180px",
              fieldColour: get(colours, "blue", "blue"),
              sortable: true
            },
            {
              label: "Middle Names",
              dataKey: "middle_names",
              minWidth: "180px",
              render: row => {
                const {
                  data: { middle_names: middleNames }
                } = row
                if (middleNames) return middleNames
                return "-"
              }
            }
          ],
          {
            label: "Last Name",
            dataKey: "last_name",
            minWidth: "180px",
            fieldColour: get(colours, "blue", "blue"),
            sortable: true
          },
          {
            label: "Email Address",
            dataKey: "email",
            minWidth: "200px",
            sortable: true,
            charLimit: 24
          },
          {
            label: "Role",
            dataKey: "role",
            minWidth: "180px",
            render: row => t(get(row, "data.role.name", "-"))
          },
          ...parent
        ]}
        hasActions
        onClick={row => {
          onUserSelect(row)
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
        perPageOptions={{ max: 50, interval: 5 }}
        sorting={sorting}
        markAsGrey={user => !!get(user, "deleted_at", null)}
      />
    </>
  )
}

UserAdmin.defaultProps = {
  context: "user-admin"
}

UserAdmin.propTypes = {
  context: PropTypes.oneOf(["user-admin", "manage-team"])
}

export default UserAdmin
