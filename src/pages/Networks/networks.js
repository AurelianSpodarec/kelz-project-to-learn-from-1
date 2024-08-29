import React from "react"
import { Container } from "@4cplatform/elements/Atoms"
import { Helmet } from "react-helmet-async"
import { H1 } from "@4cplatform/elements/Typography"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import NetworksProvider from "./context/networks.provider"
import { NetworkAdmin, NetworksPanel } from "../../UI/Templates"

// Helpers
import { DASHBOARD } from "../../config/pages"

const Networks = () => (
  <>
    <Helmet>
      <title>Networks</title>
    </Helmet>
    <NetworksProvider>
      <Container>
        <Breadcrumbs
          trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "Networks" }]}
          margin="4.5rem 0 1rem 0"
        />
        <H1 margin="0 0 6rem">Networks</H1>
        <NetworkAdmin />
      </Container>
      <NetworksPanel />
    </NetworksProvider>
  </>
)

export default Networks
