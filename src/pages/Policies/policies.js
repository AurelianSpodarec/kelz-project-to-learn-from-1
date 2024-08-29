import React from "react"
import { useLocation } from "react-router-dom"
import queryString from "query-string"
import { get, toLower } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { Helmet } from "react-helmet-async"
import { H1 } from "@4cplatform/elements/Typography"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { DASHBOARD } from "../../config/pages"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import PoliciesProvider from "./context/policies.provider"
import { PolicyAdmin, PoliciesPanel } from "../../UI/Templates"

const Policies = () => {
  const location = useLocation()
  const qs = queryString.parse(location.search)
  const t = useTranslations()

  const status = toLower(t(get(qs, "status")))

  return (
    <>
      <Helmet>
        <title>Policies {status}</title>
      </Helmet>
      <PoliciesProvider>
        <Container width="80%">
          <Breadcrumbs
            trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: `Policies ${status}` }]}
            margin="5rem 0 0.5rem 0"
          />
          <H1 margin="0.5rem 0 6rem">{`Policies ${status}`}</H1>
          <PolicyAdmin />
        </Container>
        <PoliciesPanel />
      </PoliciesProvider>
    </>
  )
}

export default Policies
