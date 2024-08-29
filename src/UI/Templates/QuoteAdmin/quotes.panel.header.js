import React from "react"
import { get } from "lodash"
import moment from "moment"
import { H2, SmallText } from "@4cplatform/elements/Typography"

// Helpers
import { getName } from "../../Helpers"
import { QuotesContext } from "./quotes.context"

// Components
import { IconWithText } from "../../Atoms"

// Components
import { PanelHeader } from "../../Molecules/FlyOutPanel"

const QuotesPanelHeader = () => {
  const { viewLoading, viewData } = React.useContext(QuotesContext)

  const created = get(viewData, "created_at", "")
    ? moment(get(viewData, "created_at", ""), "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
    : "-"
  const updated = get(viewData, "updated_at", "")
    ? moment(get(viewData, "created_at", ""), "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")
    : "-"

  return (
    <PanelHeader>
      <H2 appearance="light" isLoading={viewLoading} margin="1rem 0 1rem">
        {getName({ data: get(viewData, "client"), hasMiddle: true, hasTitle: true })}
      </H2>
      <SmallText appearance="light" isLoading={viewLoading} margin="0 0 1rem">
        Created: {created}
      </SmallText>
      <SmallText appearance="light" isLoading={viewLoading} margin="0 0 1rem">
        Updated: {updated}
      </SmallText>
      <IconWithText
        icon="pound"
        appearance="light"
        content={get(viewData, "reference", "-")}
        isLoading={viewLoading}
      />
      <IconWithText
        icon="account-box-multiple-outline"
        appearance="light"
        isLoading={viewLoading}
        margin="0"
        content={get(viewData, "sales_agent.parent.name")}
      />
      <IconWithText
        margin="0 0 2rem 3rem"
        isLoading={viewLoading}
        appearance="light"
        icon="subdirectory-arrow-right"
        content={getName({ data: get(viewData, "sales_agent") })}
      />
      <IconWithText
        margin="0"
        appearance="light"
        icon="cards-diamond"
        content={get(viewData, "provider.name")}
        isLoading={viewLoading}
      />
      <IconWithText
        margin="0 0 0 3rem"
        appearance="light"
        icon="subdirectory-arrow-right"
        content={`£${get(viewData, "monthly_premium", "")}, £${get(
          viewData,
          "annual_premium",
          ""
        )}`}
        isLoading={viewLoading}
      />
    </PanelHeader>
  )
}

export default QuotesPanelHeader
