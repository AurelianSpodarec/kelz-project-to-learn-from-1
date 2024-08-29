import React from "react"

// Components
import { Wrapper } from "./organisationOnboarding.styles"
import Approval from "./organisationOnboarding.approval"
import DueDiligence from "./organisationOnboarding.dueDiligence"

const OrganisationOnboarding = () => (
  <Wrapper>
    <Approval />
    <DueDiligence />
  </Wrapper>
)

export default OrganisationOnboarding
