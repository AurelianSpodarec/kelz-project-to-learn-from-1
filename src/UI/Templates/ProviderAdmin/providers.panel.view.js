import React from "react"
import { get, capitalize } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { P } from "@4cplatform/elements/Typography"
import { AuthWrapper } from "@4cplatform/elements/Auth"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { renderA } from "../../Helpers"
import { ProvidersContext } from "./providers.context"

// Components
import { ConfirmationModal } from "../../Molecules"
import { LabelWithText, IconWithText } from "../../Atoms"
import { PanelBody } from "../../Molecules/FlyOutPanel"
import ProvidersPanelHeader from "./providers.panel.header"
import { PanelBodyWrapper } from "./providers.styles"

const ProviderView = () => {
  const { viewData, selectedProvider, onDeleteProvider, deleteLoading, viewLoading } =
    React.useContext(ProvidersContext)
  const [open, setOpen] = React.useState(false)
  const isDeleted = !!get(viewData, "deleted_at", get(selectedProvider, "deleted_at", false))

  return (
    <>
      <ProvidersPanelHeader viewData={viewData} isOpen={open} isDeleted={isDeleted} />
      <PanelBody isDeleted={isDeleted}>
        <PanelBodyWrapper>
          {!isDeleted && (
            <LabelWithText
              isLoading={viewLoading}
              appearance="light"
              label="Activation status"
              margin="0 0 3rem"
            >
              <IconWithText
                appearance="light"
                icon="checkbox-marked-circle"
                iconSize="1.8rem"
                margin="1rem 0 0"
                iconColour={colours.green}
                content={capitalize(get(viewData, "status", "active"))}
                isLoading={viewLoading}
              />
            </LabelWithText>
          )}
          <LabelWithText
            appearance="light"
            label="Description"
            margin="0 0 3rem"
            content={get(viewData, "description", "-")}
            loadingLines={2}
            isLoading={viewLoading}
          />
          <LabelWithText
            appearance="light"
            label="Risk email"
            margin="0 0 3rem"
            isLoading={viewLoading}
          >
            {renderA("email", get(viewData, "risk_email", "-"), "light")}
          </LabelWithText>

          <LabelWithText
            appearance="light"
            label="Underwriting email"
            margin="0 0 3rem"
            isLoading={viewLoading}
          >
            {renderA("email", get(viewData, "underwriting_email", "-"), "light")}
          </LabelWithText>

          <LabelWithText
            appearance="light"
            label="Onboarding email"
            margin="0 0 3rem"
            isLoading={viewLoading}
          >
            {renderA("email", get(viewData, "onboarding_email", "-"), "light")}
          </LabelWithText>

          <LabelWithText
            appearance="light"
            label="Agency codes email"
            margin="0 0 3rem"
            isLoading={viewLoading}
          >
            {renderA("email", get(viewData, "agency_codes_email", "-"), "light")}
          </LabelWithText>
        </PanelBodyWrapper>
        {!isDeleted && (
          <AuthWrapper roles={["SYS_ADMIN"]}>
            <Button
              appearance="error"
              trailingIcon="trash-can"
              onClick={() => setOpen(true)}
              isDisabled={isDeleted}
              isLoading={viewLoading}
            >
              Delete provider
            </Button>
          </AuthWrapper>
        )}
      </PanelBody>
      {open && (
        <ConfirmationModal
          confirmIcon="trash-can"
          confirmText="Delete Provider"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setOpen(false)}
          onConfirm={() => {
            onDeleteProvider(viewData)
          }}
          isLoadingConfirm={deleteLoading}
        >
          <P>Are you sure you want to delete this provider? This action cannot be undone.</P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default ProviderView
