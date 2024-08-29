import React from "react"
import { get } from "lodash"
import moment from "moment"
import { H2, H3, SmallText } from "@4cplatform/elements/Typography"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"

// Components
import { PanelHeader } from "../../../Molecules/FlyOutPanel"
import { IconWithText, LabelWithText } from "../../../Atoms"

const AgencyCodeRequestsPanelHeader = () => {
  const { selectedRequest, queryLoading } = React.useContext(AgencyCodesContext)

  const created = get(selectedRequest, "created_at", "")
    ? moment(get(selectedRequest, "created_at", ""), "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
    : "-"

  return (
    <PanelHeader>
      <H2 appearance="light" isLoading={queryLoading} margin="2rem 0 1rem">
        {get(selectedRequest, "provider.name", "-")}
      </H2>
      <H3 appearance="light" isLoading={queryLoading} margin="0">
        {get(selectedRequest, "product", "-")}
      </H3>
      <SmallText appearance="light" isLoading={queryLoading} margin="0 0 2rem">
        Requested: {created}
      </SmallText>
      <IconWithText
        icon="medical-bag"
        appearance="light"
        content={get(selectedRequest, "product_type", "-")}
        isLoading={queryLoading}
      />
      <LabelWithText label="Owner" appearance="light" isLoading={queryLoading} margin="0 0 3rem">
        <IconWithText
          isLoading={queryLoading}
          appearance="light"
          icon="subdirectory-arrow-right"
          content={get(selectedRequest, "owner.name", "-")}
        />
      </LabelWithText>
    </PanelHeader>
  )
}

export default AgencyCodeRequestsPanelHeader
