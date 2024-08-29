import React from "react"

// Components
import { ProviderDetails } from "../../../../UI/Templates"
import ProviderDetailsProvider from "./context/details.provider"

// Helpers
import { ProviderManageContext } from "../../context/manage.context"

const Details = () => {
  const { providerLoading } = React.useContext(ProviderManageContext)

  return (
    <ProviderDetailsProvider>
      <ProviderDetails isLoading={providerLoading} />
    </ProviderDetailsProvider>
  )
}

export default Details
