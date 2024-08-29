import React from "react"
import { get, isEmpty } from "lodash"
import { H4, SmallText } from "@4cplatform/elements/Typography"
import { Skeleton } from "@4cplatform/elements/Molecules"

// Components
import { Wrapper } from "./assignment.styles"
import Card from "./assignment.card"
import AssignDealCode from "./assignment.add"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

const DealCodeAssignment = () => {
  const { assignedDealCodes, assignedDealCodesLoading } = React.useContext(AgencyCodesContext)

  return (
    <Wrapper>
      <H4 appearance="light" isLoading={assignedDealCodesLoading} margin="1rem 0 2rem">
        Assigned deal codes
      </H4>
      {/* Loading state */}
      {assignedDealCodesLoading && (
        <Skeleton appearance="light" lineHeight="7rem" borderRadius="0.5rem" />
      )}
      {/* Deal codes */}
      {isEmpty(assignedDealCodes) && !assignedDealCodesLoading && (
        <SmallText appearance="light" isLoading={assignedDealCodesLoading}>
          No deal codes have been assigned
        </SmallText>
      )}
      {Array.isArray(assignedDealCodes) &&
        assignedDealCodes.map((code, i) => (
          <Card key={`${get(code, "deal_code")}-${i}`} code={code} index={i} />
        ))}
      <AssignDealCode />
    </Wrapper>
  )
}

export default DealCodeAssignment
