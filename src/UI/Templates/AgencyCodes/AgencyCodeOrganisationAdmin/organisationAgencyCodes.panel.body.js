import React from "react"
import { isEmpty } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { H3, SmallText, P } from "@4cplatform/elements/Typography"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"
import { formatUsersAsEvents } from "../agencyCodes.helpers"

// Components
import { Tabs, Tab, Timeline, PageContext } from "../../../Organisms"
import { ConfirmationModal } from "../../../Molecules"
import { PanelBody } from "../../../Molecules/FlyOutPanel"
import CommissionRates from "../components/CommisionRates"
import DealCodeAssignment from "../components/DealCodeAssignment"

const AgencyCodesPanelBody = () => {
  const { viewLoading, sharedUsers, type, onRevokeShares, revokeModal, setRevoke, revokeLoading } =
    React.useContext(AgencyCodesContext)
  const { setPanelStatus } = React.useContext(PageContext)

  return (
    <>
      <PanelBody>
        <Tabs
          hasQueryControls
          type="panel"
          name="agency_codes_panel"
          isLoading={viewLoading}
          margin="0 0 1rem"
        >
          <Tab header="Commission" isPresent={type === "default" || type === "assigned_to_users"}>
            <CommissionRates />
          </Tab>
          <Tab header="Deal codes">
            <DealCodeAssignment />
          </Tab>
          <Tab header="Sharing" isPresent={type !== "assigned_to_users"}>
            <H3 appearance="light" margin="2rem 0">
              Shared with
            </H3>
            {isEmpty(sharedUsers) && (
              <SmallText appearance="light">
                This agency code has not been shared with any users.
              </SmallText>
            )}
            <Timeline events={formatUsersAsEvents({ users: sharedUsers })} />

            {/* User actions */}
            {!(type === "shared_with_users" || type === "assigned_to_users") && (
              <Button
                appearance="whiteGhost"
                trailingIcon="share-variant-outline"
                onClick={() => setPanelStatus("wide")}
                name="share"
                margin="0 0 2rem"
              >
                Share
              </Button>
            )}
            {type === "shared_with_users" && (
              <Button
                appearance="warning"
                trailingIcon="hand-right"
                onClick={() => setRevoke(true)}
                name="share"
              >
                Revoke sharing
              </Button>
            )}
          </Tab>
        </Tabs>
      </PanelBody>
      {/* Revoke shares modal */}
      {revokeModal && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Yes"
          confirmAppearance="success"
          cancelAppearance="errorGhost"
          isLoadingConfirm={revokeLoading}
          onClose={() => setRevoke(false)}
          onConfirm={onRevokeShares}
        >
          <P>
            Are you sure you want to revoke all shares for this agency code? This action cannot be
            undone.
          </P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default AgencyCodesPanelBody
