import React from "react"
import moment from "moment"
import { get, isEmpty } from "lodash"
import { H4, P, SmallText } from "@4cplatform/elements/Typography"
import { Pagination, ComplianceNote } from "@4cplatform/elements/Molecules"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { OrganisationDetailsContext } from "./details.context"

// Components
import { SidebarSection, ButtonsWrapper, OrgNetworkButton } from "./details.styles"
import { ConfirmationModal } from "../../Molecules"

const MyInvitations = () => {
  const {
    data,
    invitations,
    applications,
    reject,
    setReject,
    accept,
    setAccept,
    onAcceptInvitation,
    onRejectInvitation,
    acceptLoading,
    rejectLoading,
    invitationsPagination,
    changeInvitationsPage
  } = React.useContext(OrganisationDetailsContext)
  const network = get(data, "network", {})
  const hasNetwork = !isEmpty(network)

  // If no invitations are present, do not display the component
  if (isEmpty(invitations) || hasNetwork) return null

  return (
    <>
      <H4>Network invites</H4>
      {invitations.map((invite, i) => (
        <React.Fragment key={invite.id}>
          <SidebarSection
            isLast={invitations.length - 1 === i}
            data-testid={`my_invitations-section_${i}`}
          >
            <P margin="0 0 0.5rem">{get(invite, "network.name", "-")}</P>
            <SmallText margin="0 0 0.5rem">
              Invited: {moment(get(invite, "created_at")).format("DD/MM/YYYY HH:mm")}
            </SmallText>
            <ButtonsWrapper>
              <OrgNetworkButton
                type="inline-button"
                leadingIcon="thumb-up"
                appearance="successInline"
                iconSize="1.5rem"
                hasIconFill={false}
                onClick={() => setAccept({ isOpen: true, invitation: invite })}
                name="accept"
              >
                Accept
              </OrgNetworkButton>
              <OrgNetworkButton
                type="inline-button"
                leadingIcon="thumb-down"
                appearance="errorInline"
                iconSize="1.5rem"
                hasIconFill={false}
                onClick={() => setReject({ isOpen: true, invitation: invite })}
                name="reject"
              >
                Reject
              </OrgNetworkButton>
            </ButtonsWrapper>
          </SidebarSection>
          {/* Accept invitation modal */}
          {accept.isOpen && get(accept, "invitation.id") === get(invite, "id") && (
            <ConfirmationModal
              confirmIcon="thumb-up"
              confirmText="Accept invitation"
              confirmAppearance="success"
              cancelAppearance="errorGhost"
              onClose={() => setAccept({ isOpen: false, invitation: null })}
              onConfirm={() => onAcceptInvitation(get(invite, "id"))}
              isLoadingConfirm={acceptLoading}
            >
              <P>Are you sure you want to accept this invitation to join the network?</P>
              {(invitations.length > 1 || applications?.length > 0) && (
                <ComplianceNote type="error">
                  <P style={{ marginBottom: 0, color: colours.red }}>
                    Accepting this invitation will mean all other pending invitations and any
                    pending application will be automatically cancelled/rejected.
                  </P>
                </ComplianceNote>
              )}
            </ConfirmationModal>
          )}
          {/* Reject invitation modal */}
          {reject.isOpen && get(reject, "invitation.id") === get(invite, "id") && (
            <ConfirmationModal
              confirmIcon="thumb-down"
              confirmText="Reject invitation"
              confirmAppearance="error"
              cancelAppearance="errorGhost"
              onClose={() => setReject({ isOpen: false, invitation: null })}
              onConfirm={() => onRejectInvitation(get(invite, "id"))}
              isLoadingConfirm={rejectLoading}
            >
              <P>Are you sure you want to reject this invitation to join the network?</P>
            </ConfirmationModal>
          )}
        </React.Fragment>
      ))}
      <Pagination
        {...invitationsPagination}
        name="my_invitations"
        changePage={e => changeInvitationsPage(e)}
        hasPerPage={false}
        hasPageButtons={false}
      />
    </>
  )
}

export default MyInvitations
