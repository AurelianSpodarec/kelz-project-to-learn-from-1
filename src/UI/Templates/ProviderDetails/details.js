import React from "react"

// Helpers
import { ProviderDetailsContext } from "./details.context"

// Components
import { DetailsWrapper, Wrapper } from "./details.styles"
import ViewDetails from "./details.view"
import EditDetails from "./details.edit"
import ProviderLogo from "./details.logo"

const ProviderDetails = () => {
  const { isEdit } = React.useContext(ProviderDetailsContext)
  return (
    <Wrapper>
      <DetailsWrapper>
        {!isEdit && <ViewDetails />}
        {isEdit && <EditDetails />}
      </DetailsWrapper>
      <ProviderLogo data-testid="provider-logo" isEdit />
    </Wrapper>
  )
}

export default ProviderDetails
