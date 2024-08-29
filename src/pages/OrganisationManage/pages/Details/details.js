import React from "react"

//  Components
import OrganisationDetails from "../../../../UI/Templates/OrganisationDetails"
import OrganisationDetailsProvider from "./context/details.provider"

// Helpers
import { OrganisationManageContext } from "../../context/manage.context"

const Details = () => {
  const { organisationLoading } = React.useContext(OrganisationManageContext)
  return (
    <OrganisationDetailsProvider>
      <OrganisationDetails isLoading={organisationLoading} />
    </OrganisationDetailsProvider>
  )
}

export default Details
