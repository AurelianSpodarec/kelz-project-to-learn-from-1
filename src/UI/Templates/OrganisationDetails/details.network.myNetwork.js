import React from "react"
import { get, isEmpty } from "lodash"
import moment from "moment"
import { H4, P, SmallText } from "@4cplatform/elements/Typography"

// Helpers
import { AuthWrapper } from "@4cplatform/elements/Auth"
import { OrganisationDetailsContext } from "./details.context"

// Components
import { ConfirmationModal } from "../../Molecules"
import { OrgNetworkButton } from "./details.styles"
import JoinNetwork from "./details.network.myNetwork.join"

const MyNetwork = () => {
  const {
    data,
    isLoading,
    onLeaveNetwork,
    leave,
    setLeave,
    leaveLoading,
    join,
    setJoin,
    applications
  } = React.useContext(OrganisationDetailsContext)

  const network = get(data, "network", {})
  const hasNetwork = !isEmpty(network)
  const showJoinNetwork = !hasNetwork && (!applications || applications.length === 0)

  return (
    <>
      {/* Network Information */}
      {hasNetwork && (
        <>
          <H4>Network</H4>
          <P margin="0 0 0.5rem">{get(network, "name", "-")}</P>
          <SmallText margin="0">
            Joined: {moment(get(data, "joined_network_at", "-")).format("DD/MM/YYYY HH:mm")}
          </SmallText>
          <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"]}>
            <OrgNetworkButton
              type="inline-button"
              appearance="primaryInline"
              leadingIcon="arrow-top-left"
              iconSize="1.5rem"
              onClick={() => setLeave(true)}
              isLoading={isLoading}
            >
              Leave network
            </OrgNetworkButton>
          </AuthWrapper>
          {/* Leave Network modal */}
          {leave && (
            <ConfirmationModal
              confirmIcon="arrow-top-left"
              confirmText="Leave network"
              confirmAppearance="error"
              cancelAppearance="errorGhost"
              onClose={() => setLeave(false)}
              onConfirm={onLeaveNetwork}
              isLoadingConfirm={leaveLoading}
            >
              <P>Are you sure you want to leave the network? This action cannot be undone.</P>
            </ConfirmationModal>
          )}
        </>
      )}

      {/* Join Network */}
      {showJoinNetwork && (
        <>
          <H4>Network</H4>
          <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"]}>
            <OrgNetworkButton
              type="inline-button"
              appearance="primaryInline"
              leadingIcon="plus"
              iconSize="1.5rem"
              onClick={() => setJoin(true)}
              isLoading={isLoading}
            >
              Join Network
            </OrgNetworkButton>
            {/* Network application form */}
            {join && <JoinNetwork />}
          </AuthWrapper>
        </>
      )}
    </>
  )
}

export default MyNetwork
