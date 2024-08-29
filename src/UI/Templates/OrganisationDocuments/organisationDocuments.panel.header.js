import React from "react"
import PropTypes from "prop-types"
import { get, upperFirst } from "lodash"
import moment from "moment"
import { H2, SmallText } from "@4cplatform/elements/Typography"

// Components
import { IconWithText } from "../../Atoms"
import { PanelHeader } from "../../Molecules/FlyOutPanel"

// Helpers
import { OrganisationDocumentsContext } from "./organisationDocuments.context"
import { getOrganisationAccess } from "./organisationDocuments.helpers"

const OrganisationDocumentPanelHeader = ({ selectedDocument }) => {
  const { selectLoading } = React.useContext(OrganisationDocumentsContext)
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
    </PanelHeader>
  )
}

OrganisationDocumentPanelHeader.defaultProps = {
  selectedDocument: null
}

OrganisationDocumentPanelHeader.propTypes = {
  selectedDocument: PropTypes.object
}

export default OrganisationDocumentPanelHeader
