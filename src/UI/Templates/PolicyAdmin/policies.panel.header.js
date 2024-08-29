import React from "react"
import { get, isEmpty } from "lodash"
import moment from "moment"
import { Input } from "@4cplatform/elements/Forms"
import { H2, SmallText } from "@4cplatform/elements/Typography"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { getName } from "../../Helpers"
import { PoliciesContext } from "./policies.context"
import { getIconDetails } from "./policies.helpers"

// Components
import { PanelHeader } from "../../Molecules/FlyOutPanel"
import { IconWithText, LabelWithText } from "../../Atoms"
import PolicyExclusions from "./components/PolicyExclusions"

const PoliciesPanelHeader = () => {
  const { viewData, viewLoading, reference, setReference } = React.useContext(PoliciesContext)
  const t = useTranslations()

  const created = get(viewData, "created_at", "")
    ? moment(get(viewData, "journey.created_at", ""), "YYYY-MM-DDTHH:mmZ").format(
        "DD/MM/YYYY HH:mm"
      )
    : "-"
  const updated = get(viewData, "updated_at", "")
    ? moment(get(viewData, "journey.created_at", ""), "YYYY-MM-DDTHH:mmZ").format(
        "DD/MM/YYYY HH:mm"
      )
    : "-"

  const status = get(viewData, "status", "")
  const statusIcon = getIconDetails(status)

  const address = get(viewData, "address", get(viewData, "client.address", {}))

  return (
    <PanelHeader>
      <H2 appearance="light" isLoading={viewLoading} margin="2rem 0 1rem">
        {getName({
          data: get(viewData, "client"),
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
      {!isEmpty(statusIcon) && (
        <IconWithText appearance="light" content={t(status)} {...statusIcon} />
      )}
      <IconWithText
        icon="pound"
        appearance="light"
        content={get(viewData, "reference", "-")}
        isLoading={viewLoading}
      />
      <IconWithText
        icon="briefcase"
        appearance="light"
        content={t(get(viewData, "product_name", "-"))}
        isLoading={viewLoading}
      />
      <IconWithText
        icon="account-box-multiple-outline"
        appearance="light"
        isLoading={viewLoading}
        content={get(viewData, "sales_agent.parent.name", "-")}
        margin="0"
      />
      <IconWithText
        margin="0 0 2rem 3rem"
        isLoading={viewLoading}
        appearance="light"
        icon="subdirectory-arrow-right"
        content={getName({
          data: get(viewData, "sales_agent")
        })}
      />
      <IconWithText
        icon="cards-diamond"
        appearance="light"
        isLoading={viewLoading}
        margin="0"
        content={get(viewData, "provider.name", "-")}
      />
      <IconWithText
        margin="0 0 2rem 3rem"
        appearance="light"
        isLoading={viewLoading}
        icon="subdirectory-arrow-right"
        content={`£${get(viewData, "monthly_premium", "")}, £${get(
          viewData,
          "annual_premium",
          ""
        )}`}
      />
      <LabelWithText label="Address" appearance="light" isLoading={viewLoading}>
        {!isEmpty(address) ? (
          <>
            {Object.keys(address).map(key => (
              <SmallText appearance="light" isLoading={viewLoading} margin="0" key={key}>
                {get(address, key)}
              </SmallText>
            ))}
          </>
        ) : (
          "-"
        )}
      </LabelWithText>
      {get(viewData, "status", false) === "AWAITING_TERMS" && <PolicyExclusions />}
      {get(viewData, "status", false) === "AWAITING_ACCEPTANCE" && (
        <Input
          appearance="light"
          name="policy_number"
          label="Add a policy number"
          margin="0 0 2rem"
          placeholder="Input policy number"
          value={reference}
          onChange={val => setReference(val)}
        />
      )}
    </PanelHeader>
  )
}

export default PoliciesPanelHeader
