import React from "react"

// Helpers
import { NetworkDetailsContext } from "./details.context"

// Component
import { DetailsWrapper, Wrapper } from "./details.styles"
import ViewDetails from "./details.view"
import EditDetails from "./details.edit"
import NetworkLogo from "./details.logo"

const NetworkDetails = () => {
  const { isEdit } = React.useContext(NetworkDetailsContext)

  return (
    <Wrapper>
      <DetailsWrapper>
        {!isEdit && <ViewDetails />}
        {isEdit && <EditDetails />}
      </DetailsWrapper>
      <NetworkLogo />
    </Wrapper>
  )
}

export default NetworkDetails
