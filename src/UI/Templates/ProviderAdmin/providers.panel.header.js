import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { get, toUpper } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { SmallText, H2 } from "@4cplatform/elements/Typography"

// Helpers
import { renderA } from "../../Helpers"
import { ProvidersContext } from "./providers.context"

// Components
import { PanelHeader } from "../../Molecules/FlyOutPanel"
import { IconWithText } from "../../Atoms"

const ProvidersPanelHeader = ({ viewData, isDeleted }) => {
  const { viewLoading } = React.useContext(ProvidersContext)
  return (
    <PanelHeader isDeleted={isDeleted} isLoading={viewLoading}>
      {/* Title/Subtitle */}
      <H2 margin="1rem 0" appearance="light" isLoading={viewLoading}>
        {get(viewData, "name")}
      </H2>
      <SmallText appearance="light" isLoading={viewLoading}>
        {`Key: ${get(viewData, "provider_key", "-")}`}
      </SmallText>
      <SmallText appearance="light" isLoading={viewLoading}>
        {`Abbr: ${toUpper(get(viewData, "abbreviation", "-"))}`}
      </SmallText>
      {isDeleted && (
        <SmallText appearance="light" isLoading={viewLoading}>
          {`Deleted at: ${moment(get(viewData, "deleted_at"), "YYYY-MM-DDTHH:mmZ").format(
            "MM/DD/YY HH:mm:ss"
          )}`}
        </SmallText>
      )}

      {/* Contact Info */}
      <IconWithText
        icon="pound"
        iconSize="2rem"
        appearance="light"
        margin="0 0 1rem"
        content={get(viewData, "id", "-")}
        isLoading={viewLoading}
      />
      <IconWithText
        icon="briefcase"
        iconSize="2rem"
        fontSize="1.6rem"
        appearance="light"
        margin="0 0 1rem"
        content={get(viewData, "registration_number", "-")}
        isLoading={viewLoading}
      />
      <IconWithText
        icon="email-outline"
        iconSize="2rem"
        appearance="light"
        margin="0 0 1rem"
        content={get(viewData, "primary_contact_email", "-")}
        isLoading={viewLoading}
      >
        {renderA("email", get(viewData, "primary_contact_email", "-"), "light")}
      </IconWithText>
      <IconWithText
        icon="language"
        iconSize="2rem"
        appearance="light"
        margin="0 0 1rem"
        isLoading={viewLoading}
      >
        {renderA("url", get(viewData, "website", "-"), "light")}
      </IconWithText>

      {/* Edit Button */}
      {!isDeleted && (
        <Button
          appearance="whiteGhost"
          trailingIcon="chevron-right"
          margin="2rem 0"
          type="Link"
          to={`/providers/${get(viewData, "slug", "")}`}
          name="manage_provider"
          isDisabled={viewLoading}
          isLoading={viewLoading}
        >
          Manage provider
        </Button>
      )}
    </PanelHeader>
  )
}

ProvidersPanelHeader.defaultProps = {
  viewData: null,
  isDeleted: false
}

ProvidersPanelHeader.propTypes = {
  viewData: PropTypes.object,
  isDeleted: PropTypes.bool
}

export default ProvidersPanelHeader
