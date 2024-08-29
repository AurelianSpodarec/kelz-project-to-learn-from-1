import React, { useContext } from "react"
import PropTypes from "prop-types"
import { H4 } from "@4cplatform/elements/Typography"
import { AuthWrapper } from "@4cplatform/elements/Auth"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import CommissionRate from "./commissionRates.rate"

const CommisionRates = ({ isAgencyCodePending }) => {
  const { viewLoading } = useContext(AgencyCodesContext)
  return (
    <>
      <H4 appearance="light" isLoading={viewLoading} margin="1rem 0 2rem">
        Commision rates
      </H4>
      <CommissionRate type="primary" isLoading={viewLoading} />
      {!isAgencyCodePending && (
        <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "NETWORK_ADMIN"]}>
          <CommissionRate type="secondary" isLoading={viewLoading} />
        </AuthWrapper>
      )}
    </>
  )
}

CommisionRates.defaultProps = {
  isAgencyCodePending: false
}

CommisionRates.propTypes = {
  isAgencyCodePending: PropTypes.bool
}

export default CommisionRates
