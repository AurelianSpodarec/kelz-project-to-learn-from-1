import React from "react"
import { Container } from "@4cplatform/elements/Atoms"
import { Helmet } from "react-helmet-async"
import { H1 } from "@4cplatform/elements/Typography"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import ApiStatusProvider from "./context/status.provider"
import { ApiStatusAdmin } from "../../UI/Templates"

// Helpers
import { DASHBOARD } from "../../config/pages"

const ApiStatus = () => (
  <>
    <Helmet>
      <title>Quote API Status</title>
    </Helmet>
    <ApiStatusProvider>
      <Container width="80%">
        <Breadcrumbs
          trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "Quote API Status" }]}
          margin="4.5rem 0 1rem 0"
        />
        <H1 margin="0 0 6rem">Quote API Status</H1>
        <ApiStatusAdmin />
      </Container>
    </ApiStatusProvider>
  </>
)

export default ApiStatus
