/* eslint-disable react/display-name */
import React from "react"
import moment from "moment"
import { get } from "lodash"
import { Table } from "@4cplatform/elements/Organisms"
import { Icon } from "@4cplatform/elements/Atoms"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { OrganisationsContext } from "./organisations.context"
import { PageContext } from "../../Organisms"
import { getName } from "../../Helpers"

// Compoonents
import Actions from "./organisations.actions"

const OrganisationAdmin = () => {
  const {
    data,
    pagination,
    queryLoading,
    onOrganisationSelect,
    onOrganisationDeselect,
    sorting,
    onSort,
    setPage,
    setPerPage
  } = React.useContext(OrganisationsContext)

  const {
    setPanelStatus,
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)

  return (
    <>
      <Actions />
      <Table
        data={data}
        isLoading={queryLoading}
        name="organisations"
        columns={[
          {
            label: "ID",
            dataKey: "id",
            minWidth: "50px",
            flexBasis: 8,
            sortable: true
          },
          {
            label: "Company Name",
            dataKey: "name",
            minWidth: "200px",
            fieldColour: colours.blue,
            sortable: true
          },
          [
            {
              label: "Contact Name",
              dataKey: "contact_last_name",
              minWidth: "180px",
              render: row => getName({ data: get(row, "data"), isContact: true }),
              sortable: true
            },
            {
              label: "Contact Email",
              dataKey: "contact_email_address",
              minWidth: "180px",
              sortable: true
            }
          ],
          {
            label: "Approved",
            dataKey: "approved",
            minWidth: "80px",
            sortable: true,
            render: row => {
              const approved = get(row, "data.approved")
              return (
                <Icon
                  icon={approved ? "check" : "close"}
                  colour={approved ? colours.green : colours.red}
                />
              )
            }
          },
          {
            label: "Active",
            dataKey: "active",
            minWidth: "80px",
            sortable: true,
            render: row => {
              const active = get(row, "data.active")
              return (
                <Icon
                  icon={active ? "check" : "close"}
                  colour={active ? colours.green : colours.red}
                />
              )
            }
          },
          {
            label: "Last logged in",
            dataKey: "last_logged_in_at",
            minWidth: "150px",
            sortable: true,
            render: row => {
              const lastLoggedIn = get(row, "data.last_logged_in_at")
              return lastLoggedIn
                ? moment(lastLoggedIn, "YYYY-MM-DDTHH:mmZ").format("MM/DD/YY HH:mm:ss")
                : "-"
            }
          }
        ]}
        hasActions
        onClick={row => {
          onOrganisationSelect(row)
          setPanelStatus("open")
        }}
        onClose={() => {
          onOrganisationDeselect()
          if (panelStatus !== "closed") {
            setPanelStatus("closed")
          }
        }}
        isClosed={panelStatus === "closed"}
        pagination={pagination}
        changePage={e => setPage(e)}
        changePerPage={setPerPage}
        hasPerPage
        perPageOptions={{ max: 50, interval: 5 }}
        sorting={sorting}
        onSort={newSorting => onSort(newSorting)}
        markAsGrey={org => !!get(org, "deleted_at", null)}
      />
    </>
  )
}

export default OrganisationAdmin
