import React from "react"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { P, SmallText } from "@4cplatform/elements/Typography"
import { AuthWrapper } from "@4cplatform/elements/Auth"

// Helpers
import { NetworksContext } from "./networks.context"

// Components
import { ConfirmationModal } from "../../Molecules"
import { PanelBody } from "../../Molecules/FlyOutPanel"
import NetworksPanelHeader from "./networks.panel.header"

const NetworkView = () => {
  const { selectedNetwork, onDeleteNetwork, deleteLoading, selectLoading } =
    React.useContext(NetworksContext)
  const [open, setOpen] = React.useState(false)
  const isDeleted = !!get(selectedNetwork, "deleted_at")

  return (
    <>
      <NetworksPanelHeader selectedNetwork={selectedNetwork} isDeleted={isDeleted} />
      <PanelBody isDeleted={isDeleted}>
        <SmallText appearance="light" isLoading={selectLoading} margin="0 0 1rem">
          <b>Description:</b>
        </SmallText>
        <P isLoading={selectLoading} appearance="light">
          {get(selectedNetwork, "description", "-")}
        </P>
        {!isDeleted && (
          <AuthWrapper roles={["SYS_ADMIN"]}>
            <Button
              appearance="error"
              trailingIcon="delete"
              onClick={() => setOpen(true)}
              isDisabled={isDeleted || selectLoading}
              name="delete_network"
            >
              Delete network
            </Button>
          </AuthWrapper>
        )}
      </PanelBody>
      {open && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Delete network"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setOpen(false)}
          onConfirm={() => {
            onDeleteNetwork(selectedNetwork)
          }}
          isLoadingConfirm={deleteLoading}
        >
          <P>Are you sure you want to delete this network? This action cannot be undone.</P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default NetworkView
