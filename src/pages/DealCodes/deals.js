import React from "react"
import { Container } from "@4cplatform/elements/Atoms"
import { Helmet } from "react-helmet-async"
import { H1 } from "@4cplatform/elements/Typography"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import DealCodesProvider from "./context/deals.provider"
import { DealCodeAdmin, DealCodesPanel } from "../../UI/Templates"

// Helpers
import { DASHBOARD } from "../../config/pages"

const DealCodes = () => (
  <>
    <Helmet>
      <title>Deal codes</title>
    </Helmet>
    <DealCodesProvider>
      <Container width="80%">
        <Breadcrumbs
          trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "Deal codes" }]}
          margin="4.5rem 0 1rem 0"
        />
        <H1 margin="0 0 5rem">Deal codes</H1>
        <DealCodeAdmin />
      </Container>
      <DealCodesPanel />
    </DealCodesProvider>
  </>
)

export default DealCodes
