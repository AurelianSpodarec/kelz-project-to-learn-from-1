import React from "react"

// Helpers
import { NetworkInvitationsContext } from "./networkInvitations.context"

// Components
import { TableActionsWrapper, TableActionsButton } from "./networkInvitations.styles"
import { Search } from "../../Molecules"
import InviteOrganisation from "./networkInvitations.actions.invitation"

const Actions = () => {
  const { setSearch, addOpen, setAddOpen } = React.useContext(NetworkInvitationsContext)
  return (
    <>
      <TableActionsWrapper data-testid="network_invitations-actions-wrapper">
        <Search
          name="search_network_invitations"
          handleChange={val => setSearch(val)}
          onCancel={() => setSearch("")}
          margin="0 2rem 0 0"
          placeholder="Search invitations"
        />
        <TableActionsButton
          trailingIcon="account-plus"
          name="invite_organisation"
          onClick={() => setAddOpen(true)}
        >
          Invite organisation
        </TableActionsButton>
      </TableActionsWrapper>
      {addOpen && <InviteOrganisation onClose={() => setAddOpen(false)} />}
    </>
  )
}

export default Actions
