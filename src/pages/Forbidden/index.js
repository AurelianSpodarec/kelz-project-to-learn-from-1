import React from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { Container } from "@4cplatform/elements/Atoms"
import { H1, P } from "@4cplatform/elements/Typography"

// Helpers
import { DASHBOARD } from "../../config/pages"

const Forbidden = () => (
  <>
    <Helmet>
      <title>403 Forbidden</title>
    </Helmet>
    <Container>
      <H1>403 Forbidden</H1>
      <P>You are not allowed to access the requested page.</P>
      <Link to={DASHBOARD.path}>Back home</Link>
    </Container>
  </>
)

export default Forbidden
