import React from "react"
import { Container } from "@4cplatform/elements/Atoms"
import { Helmet } from "react-helmet-async"
import { H1 } from "@4cplatform/elements/Typography"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import LeadsProvider from "./context/leads.provider"
import LeadAdmin, { LeadsPanel } from "../../UI/Templates/LeadAdmin"

// Helpers
import { DASHBOARD } from "../../config/pages"

const Leads = () => (
  <>
    <Helmet>
      <title>Leads</title>
    </Helmet>
    <LeadsProvider>
      <Container>
        <Breadcrumbs
          trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "Leads" }]}
          margin="4.5rem 0 1rem 0"
        />
        <H1 margin="0 0 6rem">Leads</H1>
        <LeadAdmin />
      </Container>
      <LeadsPanel />
    </LeadsProvider>
  </>
)

export default Leads
