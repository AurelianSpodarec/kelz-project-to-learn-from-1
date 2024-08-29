import React from "react"

// Components
import NetworkApplicationsProvider from "./context/applications.provider"
import { NetworkApplications } from "../../../../UI/Templates"

const Applications = () => (
  <NetworkApplicationsProvider>
    <NetworkApplications />
  </NetworkApplicationsProvider>
)

export default Applications
