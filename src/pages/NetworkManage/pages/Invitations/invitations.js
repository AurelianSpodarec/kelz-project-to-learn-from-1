import React from "react"

// Components
import NetworkInvitations from "../../../../UI/Templates/NetworkInvitations"
import NetworkInvitationsProvider from "./context/invitations.provider"

const Invitations = () => (
  <NetworkInvitationsProvider>
    <NetworkInvitations />
  </NetworkInvitationsProvider>
)

export default Invitations
