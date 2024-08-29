import React from "react"
import { get } from "lodash"
import { P } from "@4cplatform/elements/Typography"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { NetworkOrganisationsContext } from "./networkOrganisations.context"

// Components
import { PanelBody } from "../../Molecules/FlyOutPanel"
import { LabelWithText } from "../../Atoms"
import { ConfirmationModal } from "../../Molecules"
import NetworkOrganisationsPanelHeader from "./networkOrganisations.panel.header"

const NetworkOrganisationView = () => {
  const { selectedOrganisation, selectLoading, onRemoveOrganisation, removeLoading } =
    React.useContext(NetworkOrganisationsContext)
  const [remove, setRemove] = React.useState(false)

  return (
    <>
      <NetworkOrganisationsPanelHeader selectedOrganisation={selectedOrganisation} />
      <PanelBody>
        <LabelWithText
          label="Description:"
          isLoading={selectLoading}
          appearance="light"
          content={get(selectedOrganisation, "description", "-")}
        />
        <Button
          appearance="error"
          trailingIcon="delete"
          onClick={() => setRemove(true)}
          isDisabled={selectLoading}
          name="delete_network"
        >
          Remove organisation
        </Button>
      </PanelBody>
      {remove && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Remove organisation"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => {
            setRemove(false)
          }}
          onConfirm={() => {
            onRemoveOrganisation()
          }}
          isLoadingConfirm={removeLoading}
        >
          <P>Are you sure you want to remove this organisation from the network?</P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default NetworkOrganisationView
