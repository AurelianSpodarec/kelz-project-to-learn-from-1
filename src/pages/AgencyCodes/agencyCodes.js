import React from "react"
import { Helmet } from "react-helmet-async"
import { H1 } from "@4cplatform/elements/Typography"
import { Container } from "@4cplatform/elements/Atoms"

// Helpers
import { DASHBOARD } from "../../config/pages"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import AgencyCodeTabs from "./agencyCodes.tabs"

const AgencyCodes = () => (
  <>
    <Helmet>
      <title>Agency codes</title>
    </Helmet>
    <Container width="80%">
      <Breadcrumbs
        trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "Agency codes" }]}
        margin="5rem 0 0.5rem 0"
      />
      <H1 margin="0.5rem 0 6rem">Agency codes</H1>
      <AgencyCodeTabs />
    </Container>
  </>
)

export default AgencyCodes
