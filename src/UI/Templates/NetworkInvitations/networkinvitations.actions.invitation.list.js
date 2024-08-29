import React from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"
import { v4 as uuid } from "uuid"

// Components
import { InvitesListWrapper } from "./networkInvitations.styles"
import { IconWithText } from "../../Atoms"

const InvitationsList = ({ invitations }) => {
  if (isEmpty(invitations)) return null
  return (
    <InvitesListWrapper>
      {invitations.map(invite => {
        const { email_address: email, organisation_id: orgID, label } = invite

        if (email)
          return (
            <IconWithText key={uuid()} icon="email" content={email} iconColour={colours.blue} />
          )
        if (orgID)
          return (
            <IconWithText key={uuid()} icon="domain" content={label} iconColour={colours.blue} />
          )
        return null
      })}
    </InvitesListWrapper>
  )
}

InvitationsList.defaultProps = {
  invitations: []
}

InvitationsList.propTypes = {
  invitations: PropTypes.array
}

export default InvitationsList
