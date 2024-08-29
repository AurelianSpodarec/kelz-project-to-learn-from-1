import React from "react"
import PropTypes from "prop-types"
import { get, upperFirst } from "lodash"
import moment from "moment"
import { H2, SmallText, P } from "@4cplatform/elements/Typography"
import { Button } from "@4cplatform/elements/Molecules"

// Components
import { IconWithText } from "../../Atoms"
import { ConfirmationModal } from "../../Molecules"
import { PageContext } from "../../Organisms"
import { PanelHeader } from "../../Molecules/FlyOutPanel"
import { PanelButtonsWrapper } from "./networkDocuments.styles"

// Helpers
import { NetworkDocumentsContext } from "./networkDocuments.context"
import { getOrganisationAccess } from "./networkDocuments.helpers"

const NetworkDocumentPanelHeader = ({ context }) => {
  const { selectedDocument, selectLoading, revokeOpen, setRevoke, onRevoke, revokeLoading } =
    React.useContext(NetworkDocumentsContext)
  const { setPanelStatus } = React.useContext(PageContext)
  const name = get(selectedDocument, "name", "")
  const created = moment(get(selectedDocument, "created_at", ""), "YYYY-MM-DDTHH:mmZ").format(
    "DD/MM/YYYY HH:mm"
  )
  const updated = moment(get(selectedDocument, "updated_at", ""), "YYYY-MM-DDTHH:mmZ").format(
    "DD/MM/YYYY HH:mm"
  )

  return (
    <PanelHeader>
      {/* Title/Subtitle */}
      <H2 margin="1rem 0" appearance="light" isLoading={selectLoading}>
        {name}
      </H2>
      <SmallText appearance="light" isLoading={selectLoading} margin="0 0 0.5rem">
        Created at: {created}
      </SmallText>
      <SmallText appearance="light" isLoading={selectLoading}>
        Updated at: {updated}
      </SmallText>

      {/* Document Info */}
      <IconWithText
        icon="source-commit"
        appearance="light"
        content={`v${get(selectedDocument, "current_active_version.version_number")}`}
        margin="0 0 1rem"
        isLoading={selectLoading}
      />
      <IconWithText
        icon="map-marker-path"
        appearance="light"
        margin="0 0 0.5rem"
        isLoading={selectLoading}
        content="Display Point"
      />
      <IconWithText
        icon="subdirectory-arrow-right"
        appearance="light"
        content={upperFirst(get(selectedDocument, "display_point"))}
        margin="0 0 1rem 2rem"
        isLoading={selectLoading}
      />
      <IconWithText
        icon="share-variant-outline"
        appearance="light"
        margin="0 0 0.5rem"
        isLoading={selectLoading}
        content="Shared With"
      />
      <IconWithText
        icon="subdirectory-arrow-right"
        appearance="light"
        content={getOrganisationAccess(selectedDocument)}
        margin="0 0 4rem 2rem"
        isLoading={selectLoading}
      />

      {/* Panel Buttons */}
      {context === "open" && (
        <PanelButtonsWrapper>
          <Button
            appearance="whiteGhost"
            margin="0 2rem 0 0"
            trailingIcon="file-cog-outline"
            isDisabled={selectLoading}
            name="edit_document"
            onClick={() => setPanelStatus("wide")}
          >
            Edit
          </Button>
          <Button
            appearance="whiteGhost"
            margin="0"
            trailingIcon="file-remove-outline"
            isDisabled={selectLoading}
            name="revoke_document"
            onClick={() => setRevoke(true)}
          >
            Revoke
          </Button>
        </PanelButtonsWrapper>
      )}
      {revokeOpen && (
        <ConfirmationModal
          confirmIcon="file-remove-outline"
          confirmText="Revoke"
          confirmAppearance="primary"
          cancelAppearance="errorGhost"
          onClose={() => setRevoke(false)}
          onConfirm={() => onRevoke(selectedDocument)}
          isLoadingConfirm={revokeLoading}
        >
          <P>Are you sure you want to revoke this document?</P>
        </ConfirmationModal>
      )}
    </PanelHeader>
  )
}

NetworkDocumentPanelHeader.defaultProps = {
  context: "open"
}

NetworkDocumentPanelHeader.propTypes = {
  context: PropTypes.oneOf(["wide", "open"])
}

export default NetworkDocumentPanelHeader
