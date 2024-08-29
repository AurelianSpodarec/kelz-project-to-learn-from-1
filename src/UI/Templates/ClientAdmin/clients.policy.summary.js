import React from "react"
import { get } from "lodash"
import PropTypes from "prop-types"
import { Modal, ComplianceNote } from "@4cplatform/elements/Molecules"
import { H3, P, SmallText } from "@4cplatform/elements/Typography"

// Helpers
import { ClientsContext } from "./clients.context"
import { getIconDetails } from "./clients.helpers"
import { getName } from "../../Helpers"

// Components
import { PolicySummaryUserDetails, AddressWrapper, BodyButtonsWrapper } from "./clients.styles"
import PolicySummaryButtons from "./clients.policy.summary.buttons"

const PolicySummary = ({ data }) => {
  const { viewData, setpolicySummaryModal } = React.useContext(ClientsContext)
  const statusType = getIconDetails(data.status)

  return (
    <Modal onClose={() => setpolicySummaryModal(false)} hasPadding={false} title="Policy details">
      <ComplianceNote type={statusType.icon || "alert"} margin="2rem">
        <P margin="2rem">{data.status}</P>
        <SmallText>
          {`The organisation has confirmed this policy is ${data.status}. More data will be added in future ticket`}
        </SmallText>
      </ComplianceNote>
      <PolicySummaryUserDetails>
        <H3 margin="2rem 0 1rem">{data.reference?.toUpperCase()}</H3>
        <P margin="0">{getName({ data: viewData })}</P>
        <P margin="0">{get(viewData, "email_address")}</P>

        <H3 margin="2rem 0 1rem">Address</H3>
        <AddressWrapper>
          {get(viewData, "address.line_one") && (
            <P margin="0">{get(viewData, "address.line_one")}</P>
          )}
          {get(viewData, "address.line_two") && (
            <P margin="0">{get(viewData, "address.line_two")}</P>
          )}
          {get(viewData, "address.city") && <P margin="0">{get(viewData, "address.city")}</P>}
          {get(viewData, "address.county") && <P margin="0">{get(viewData, "address.county")}</P>}
          {get(viewData, "address.postcode") && (
            <P margin="0">{get(viewData, "address.postcode")}</P>
          )}
        </AddressWrapper>
      </PolicySummaryUserDetails>

      <BodyButtonsWrapper>
        <PolicySummaryButtons />
      </BodyButtonsWrapper>
    </Modal>
  )
}

PolicySummary.defaultProps = {
  data: {}
}

PolicySummary.propTypes = {
  data: PropTypes.object
}

export default PolicySummary
