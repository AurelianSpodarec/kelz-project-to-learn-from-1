import React from "react"

// Components
import NetworkDetails from "../../../../UI/Templates/NetworkDetails"
import NetworkDetailsProvider from "./context/details.provider"

// Helpers
import { NetworkManageContext } from "../../context/manage.context"

const Details = () => {
  const { networkLoading } = React.useContext(NetworkManageContext)
  return (
    <NetworkDetailsProvider>
      <NetworkDetails isLoading={networkLoading} />
    </NetworkDetailsProvider>
  )
}

export default Details
