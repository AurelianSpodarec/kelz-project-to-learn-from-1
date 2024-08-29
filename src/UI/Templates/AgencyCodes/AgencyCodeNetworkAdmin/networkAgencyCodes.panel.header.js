import React from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import moment from "moment"
import { H2, H3, SmallText } from "@4cplatform/elements/Typography"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"
import { getIconDetails } from "../agencyCodes.helpers"

// Components
import { PanelHeader } from "../../../Molecules/FlyOutPanel"
import { IconWithText, LabelWithText } from "../../../Atoms"
import AcceptanceButtons from "../components/AcceptanceButtons"

const AgencyCodesPanelHeader = ({ context }) => {
  const { viewData, viewLoading, isSharedWith } = React.useContext(AgencyCodesContext)
  const t = useTranslations()

  const activated = get(viewData, "activated_at", "")
    ? moment(get(viewData, "activated_at", ""), "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
    : "-"
  const status = get(viewData, "status", "")
  const isShared = get(viewData, "shared_with_count", 0) > 0
  const statusIcon = getIconDetails(status, true)

  return (
    <PanelHeader>
      <H2 appearance="light" isLoading={viewLoading} margin="2rem 0 1rem">
        {get(viewData, "provider.name", "-")}
      </H2>
      <H3 appearance="light" isLoading={viewLoading} margin="0 0 2rem">
        {get(viewData, "product", "-")}
      </H3>
      <SmallText appearance="light" isLoading={viewLoading} margin="0 0 2rem">
        Activated: {activated}
      </SmallText>
      <IconWithText
        icon="pound"
        margin="0 0 1rem"
        appearance="light"
        content={get(viewData, "agency_code", "-")}
        isLoading={viewLoading}
      />
      <IconWithText
        icon="medical-bag"
        appearance="light"
        content={get(viewData, "product_type", "-")}
        isLoading={viewLoading}
      />
      <LabelWithText label="Status" appearance="light" isLoading={viewLoading}>
        {!isEmpty(statusIcon) && (
          <IconWithText appearance="light" content={t(status)} margin="0 0 1rem" {...statusIcon} />
        )}
        {isShared && (
          <IconWithText
            icon="account-multiple"
            appearance="light"
            content="Shared"
            isLoading={viewLoading}
          />
        )}
      </LabelWithText>
      {!isSharedWith && context === "open" && <AcceptanceButtons />}
    </PanelHeader>
  )
}

AgencyCodesPanelHeader.defaultProps = {
  context: "open"
}

AgencyCodesPanelHeader.propTypes = {
  context: PropTypes.oneOf(["open", "wide"])
}

export default AgencyCodesPanelHeader
