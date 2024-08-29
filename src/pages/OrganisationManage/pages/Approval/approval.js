import React from "react"

// Components
import OrganisationOnboardingProvider from "./context/approval.provider"
import { OrganisationOnboarding } from "../../../../UI/Templates"

const Approval = () => (
  <OrganisationOnboardingProvider>
    <OrganisationOnboarding />
  </OrganisationOnboardingProvider>
)

export default Approval
