import React from "react"
import moment from "moment"
import { get, isEmpty } from "lodash"
import { H2, SmallText } from "@4cplatform/elements/Typography"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { getName } from "../../Helpers"
import { JourneysContext } from "./journeys.context"
import { getIconDetails } from "./journeys.helpers"

// Components
import { IconWithText } from "../../Atoms"
import { PanelHeader } from "../../Molecules/FlyOutPanel"

const QuotesPanelHeader = () => {
  const { viewData, viewLoading } = React.useContext(JourneysContext)
  const t = useTranslations()

  const created = get(viewData, "journey.created_at", "")
    ? moment(get(viewData, "journey.created_at", ""), "YYYY-MM-DDTHH:mmZ").format(
        "DD/MM/YYYY HH:mm"
      )
    : "-"
  const updated = get(viewData, "journey.updated_at", "")
    ? moment(get(viewData, "journey.created_at", ""), "YYYY-MM-DDTHH:mmZ").format(
        "DD/MM/YYYY HH:mm"
      )
    : "-"

  const status = get(viewData, "journey.status", "")
  const iconDetails = getIconDetails(status)
  return (
    <PanelHeader>
      <H2 appearance="light" isLoading={viewLoading} margin="2rem 0 1rem">
        {getName({
          data: get(viewData, "journey.client"),
          hasMiddle: true,
          hasTitle: true
        })}
      </H2>
      <SmallText appearance="light" isLoading={viewLoading} margin="0 0 1rem">
        Created: {created}
      </SmallText>
      <SmallText appearance="light" isLoading={viewLoading} margin="0 0 1rem">
        Updated: {updated}
      </SmallText>
      {!isEmpty(iconDetails) && (
        <IconWithText appearance="light" content={t(status)} {...iconDetails} />
      )}
      <IconWithText
        icon="pound"
        appearance="light"
        content={get(viewData, "journey.reference", "-")}
        isLoading={viewLoading}
      />
      <IconWithText
        icon="briefcase"
        appearance="light"
        content={t(get(viewData, "journey.product_type", "-"))}
        isLoading={viewLoading}
      />
      <IconWithText
        icon="account-box-multiple-outline"
        appearance="light"
        isLoading={viewLoading}
        content={get(viewData, "journey.sales_agent.parent.name", "-")}
        margin="0"
      />
      <IconWithText
        margin="0 0 2rem 3rem"
        isLoading={viewLoading}
        appearance="light"
        icon="subdirectory-arrow-right"
        content={getName({
          data: get(viewData, "journey.sales_agent")
        })}
      />
      {/* TODO: Add Quote data when available */}
      {status !== "IN_PROGRESS" && (
        <>
          <IconWithText
            icon="cards-diamond"
            appearance="light"
            isLoading={viewLoading}
            margin="0"
            content={get(viewData, "data.journey.provider.name", "-")}
          />
          <IconWithText
            margin="0 0 0 3rem"
            appearance="light"
            isLoading={viewLoading}
            icon="subdirectory-arrow-right"
            content="£, £"
          />
        </>
      )}
    </PanelHeader>
  )
}

export default QuotesPanelHeader
