import React from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { Container } from "@4cplatform/elements/Atoms"
import { H1, P } from "@4cplatform/elements/Typography"

// Helpers
import { DASHBOARD } from "../../config/pages"

const NotFound = () => (
  <>
    <Helmet>
      <title>404 Not Found</title>
    </Helmet>
    <Container>
      <H1>404 Not Found</H1>
      <P>Something went wrong</P>
      <Link to={DASHBOARD.path}>Back home</Link>
    </Container>
  </>
)

export default NotFound
