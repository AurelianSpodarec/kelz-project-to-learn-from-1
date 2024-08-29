import React from "react"

// Helpers
import { OrganisationDetailsContext } from "./details.context"

// Components
import { DetailsWrapper, Wrapper, Sidebar } from "./details.styles"
import ViewDetails from "./details.view"
import EditDetails from "./details.edit"
import OrganisationLogo from "./details.logo"
import OrganisationNetwork from "./details.network"

const OrganisationDetails = () => {
  const { isEdit } = React.useContext(OrganisationDetailsContext)

  return (
    <Wrapper>
      <DetailsWrapper>
        {!isEdit && <ViewDetails />}
        {isEdit && <EditDetails />}
      </DetailsWrapper>
      <Sidebar>
        <OrganisationLogo />
        {!isEdit && <OrganisationNetwork />}
      </Sidebar>
    </Wrapper>
  )
}

export default OrganisationDetails
