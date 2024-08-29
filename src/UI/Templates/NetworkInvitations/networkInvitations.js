import React from "react"
import moment from "moment"
import { get, isEmpty } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { Table } from "@4cplatform/elements/Organisms"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { NetworkInvitationsContext } from "./networkInvitations.context"

// Components
import { CancelWrapper } from "./networkInvitations.styles"
import { ConfirmationModal } from "../../Molecules"
import Actions from "./networkInvitations.actions"

const NetworkInvitations = () => {
  const {
    data,
    setPerPage,
    pagination,
    setPage,
    onSort,
    sorting,
    queryLoading,
    onDeleteInvitation,
    deleteLoading,
    cancel,
    setCancel
  } = React.useContext(NetworkInvitationsContext)

  return (
    <>
      <Actions />
      <Table
        data={data}
        isLoading={queryLoading}
        name="network_invitations"
        columns={[
          {
            label: "Email address",
            dataKey: "email_address",
            sortable: true,
            minWidth: "100px",
            render: row => {
              const email = get(row, "data.email_address")
              if (!email) return "N/A"
              return email
            }
          },
          {
            label: "Organisation status",
            dataKey: "organisation_status",
            sortable: true,
            minWidth: "100px",
            render: row => {
              const org = get(row, "data.organisation", {})
              return isEmpty(org) ? "Not present" : "Present"
            }
          },
          {
            label: "Organisation name",
            dataKey: "organisation.name",
            sortable: true,
            minWidth: "100px"
          },
          {
            label: "Invite sent",
            dataKey: "created_at",
            sortable: true,
            minWidth: "100px",
            render: row => {
              const created = get(row, "data.created_at", "")
              return moment(created, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
            }
          },
          {
            label: "",
            dataKey: "id",
            minWidth: "100px",
            // eslint-disable-next-line react/display-name
            render: row => (
              <CancelWrapper>
                <Button
                  type="inline-button"
                  appearance="errorInline"
                  leadingIcon="close"
                  name={`cancel_invitation_${get(row, "data.organisation.slug")}`}
                  onClick={() => setCancel({ isOpen: true, invitation: get(row, "data", {}) })}
                >
                  Cancel
                </Button>
              </CancelWrapper>
            )
          }
        ]}
        pagination={pagination}
        changePage={setPage}
        changePerPage={setPerPage}
        hasPerPage
        onSort={newSorting => onSort(newSorting)}
        perPageOptions={{ max: 20, interval: 5 }}
        sorting={sorting}
      />

      {/* Cancel Invitation */}
      {cancel.isOpen && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Cancel invitation"
          onClose={() => setCancel({ isOpen: false, invitation: null })}
          onConfirm={() => {
            onDeleteInvitation(cancel.invitation)
          }}
          isLoadingConfirm={deleteLoading}
        >
          <P>Are you sure you want to cancel this invitation?</P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default NetworkInvitations
