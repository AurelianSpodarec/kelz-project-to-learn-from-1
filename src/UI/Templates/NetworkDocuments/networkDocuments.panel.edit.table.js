/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { NetworkDocumentsContext } from "./networkDocuments.context"

// Components
import SelectOrg from "./networkDocuments.panel.edit.table.select"

const OrgsTable = ({ selected, setSelected, formik }) => {
  const {
    documentOrganisations,
    documentOrganisationsPagination,
    setDocumentOrganisationsPage,
    documentOrganisationsLoading,
    setDocumentOrganisationsPerPage
  } = React.useContext(NetworkDocumentsContext)
  const isSharedToAll = !!get(formik, "values.share_to_all", false)

  return (
    <Table
      data={documentOrganisations}
      name="share_with"
      columns={[
        {
          label: "Select",
          dataKey: "slug",
          minWidth: "80px",
          // eslint-disable-next-line react/display-name
          render: row => (
            <SelectOrg
              orgID={get(row, "data.id", {})}
              selected={selected}
              setSelected={setSelected}
              isDisabled={isSharedToAll}
            />
          )
        },
        { label: "Organisation", dataKey: "name", minWidth: "120px" },
        {
          label: "Joined At",
          dataKey: "joined_network_at",
          minWidth: "120px",
          render: row => {
            const joined = get(row, "data.joined_network_at", "")
            return moment(joined, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
          }
        }
      ]}
      hasActions={false}
      perPageOptions={{ max: 15, interval: 5 }}
      changePerPage={setDocumentOrganisationsPerPage}
      hasPerPage
      changePage={e => setDocumentOrganisationsPage(e)}
      pagination={documentOrganisationsPagination}
      appearance="light"
      markAsGrey={org => {
        const revoke = get(formik, "values.revoke", [])
        return revoke.includes(get(org, "id", null)) || isSharedToAll
      }}
      isLoading={documentOrganisationsLoading}
    />
  )
}

OrgsTable.defaultProps = {
  formik: {}
}

OrgsTable.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  formik: PropTypes.object
}

export default OrgsTable
