import React, { useState, useContext } from "react"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { colours } from "@4cplatform/elements/Helpers"
import { H3, P } from "@4cplatform/elements/Typography"
import { AuthWrapper } from "@4cplatform/elements/Auth"

// Helpers
import { OrganisationsContext } from "./organisations.context"

// Components
import { PanelBody } from "../../Molecules/FlyOutPanel"
import { IconWithText } from "../../Atoms"
import { ConfirmationModal } from "../../Molecules"
import OrganisationsPanelHeader from "./organisations.panel.header"
import { StatusWrapper } from "./organisations.styles"
import { ActivateOrganisation } from "../../Organisms"

const OrganisationView = () => {
  const { selectedOrganisation, selectLoading, onDeleteOrganisation, deleteLoading, onPatch } =
    useContext(OrganisationsContext)
  const [isOpen, setOpen] = useState(false)
  const isDeleted = get(selectedOrganisation, "deleted_at", null) !== null
  const isApproved = get(selectedOrganisation, "approved", false)
  const isActive = get(selectedOrganisation, "active", false)
  return (
    <>
      <OrganisationsPanelHeader selectedOrganisation={selectedOrganisation} isDeleted={isDeleted} />
      <PanelBody isDeleted={isDeleted}>
        {/* Status Information */}
        <StatusWrapper>
          <H3 appearance="light" margin="0 0 1rem" isLoading={selectLoading}>
            Approval status
          </H3>
          <IconWithText
            content={isApproved ? "Approved" : "Not approved"}
            icon={isApproved ? "check" : "close"}
            iconColour={isApproved ? colours.green : colours.red}
            appearance="light"
            margin="0 0 1rem"
            isLoading={selectLoading}
          />
          <IconWithText
            content={isActive ? "Active" : "Not active"}
            icon={isActive ? "check" : "close"}
            iconColour={isActive ? colours.green : colours.red}
            appearance="light"
            margin="0"
            isLoading={selectLoading}
          />
        </StatusWrapper>
        {/* Activate Button */}
        {!isDeleted && !isActive && (
          <ActivateOrganisation
            onActivate={organisation => onPatch(organisation)}
            selectedOrganisation={selectedOrganisation}
          />
        )}
        {!isDeleted && (
          <AuthWrapper roles={["SYS_ADMIN"]}>
            <Button
              appearance="error"
              trailingIcon="delete"
              onClick={() => setOpen(true)}
              isDisabled={isDeleted || selectLoading}
              name="delete_organisation"
            >
              Delete organisation
            </Button>
          </AuthWrapper>
        )}
        {isOpen && (
          <ConfirmationModal
            confirmIcon="delete"
            confirmText="Delete organisation"
            confirmAppearance="error"
            cancelAppearance="errorGhost"
            onClose={() => setOpen(false)}
            onConfirm={() => {
              onDeleteOrganisation(selectedOrganisation)
            }}
            isLoadingConfirm={deleteLoading}
          >
            <P>Are you sure you want to delete this organisation? This action cannot be undone.</P>
          </ConfirmationModal>
        )}
      </PanelBody>
    </>
  )
}

export default OrganisationView
