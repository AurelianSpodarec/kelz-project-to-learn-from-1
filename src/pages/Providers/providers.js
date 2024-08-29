import React from "react"
import { Helmet } from "react-helmet-async"
import { H1 } from "@4cplatform/elements/Typography"
import { Container } from "@4cplatform/elements/Atoms"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import ProvidersProvider from "./context/providers.provider"
import { ProviderAdmin, ProvidersPanel } from "../../UI/Templates"

// Helpers
import { DASHBOARD } from "../../config/pages"

const Providers = () => (
  <>
    <Helmet>
      <title>Providers</title>
    </Helmet>
    <ProvidersProvider>
      <Container width="80%">
        <Breadcrumbs
          trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "Providers" }]}
          margin="5rem 0 0.5rem 0"
        />
        <H1 margin="0.5rem 0 6rem">Providers</H1>
        <ProviderAdmin />
      </Container>
      <ProvidersPanel />
    </ProvidersProvider>
  </>
)

export default Providers
