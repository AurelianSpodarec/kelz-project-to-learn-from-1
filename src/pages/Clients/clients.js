import React from "react"
import { Helmet } from "react-helmet-async"
import { H1 } from "@4cplatform/elements/Typography"
import { Container } from "@4cplatform/elements/Atoms"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import ClientsProvider from "./context/clients.provider"
import { ClientAdmin, ClientsPanel } from "../../UI/Templates"

// Helpers
import { DASHBOARD } from "../../config/pages"

const Clients = () => (
  <>
    <Helmet>
      <title>Clients</title>
    </Helmet>
    <ClientsProvider>
      <Container width="80%">
        <Breadcrumbs
          trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "Clients" }]}
          margin="5rem 0 0.5rem 0"
        />
        <H1 margin="0.5rem 0 6rem">Clients</H1>
        <ClientAdmin />
      </Container>
      <ClientsPanel />
    </ClientsProvider>
  </>
)

export default Clients
