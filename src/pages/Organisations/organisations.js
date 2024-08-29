import React from "react"
import { Container } from "@4cplatform/elements/Atoms"
import { Helmet } from "react-helmet-async"
import { H1 } from "@4cplatform/elements/Typography"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import OrganisationsProvider from "./context/organisations.provider"
import { OrganisationAdmin, OrganisationsPanel } from "../../UI/Templates"

// Helpers
import { DASHBOARD } from "../../config/pages"

const Organisations = () => (
  <>
    <Helmet>
      <title>Organisations</title>
    </Helmet>
    <OrganisationsProvider>
      <Container>
        <Breadcrumbs
          trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "Organisations" }]}
          margin="4.5rem 0 1rem 0"
        />
        <H1 margin="0 0 6rem">Organisations</H1>
        <OrganisationAdmin />
      </Container>
      <OrganisationsPanel />
    </OrganisationsProvider>
  </>
)

export default Organisations
