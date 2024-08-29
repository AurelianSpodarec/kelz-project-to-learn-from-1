import React from "react"
import { useLocation } from "react-router-dom"
import queryString from "query-string"
import { get, toLower } from "lodash"
import { Container } from "@4cplatform/elements/Atoms"
import { Helmet } from "react-helmet-async"
import { H1 } from "@4cplatform/elements/Typography"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import JourneysProvider from "./context/journeys.provider"
import { JourneyAdmin, JourneysPanel } from "../../UI/Templates"

// Helpers
import { DASHBOARD } from "../../config/pages"

const Journeys = () => {
  const { search } = useLocation()
  const t = useTranslations()

  const qs = queryString.parse(search)
  const status = get(qs, "status")

  const getTitle = () => {
    if (Array.isArray(status) && status.includes("IN_PROGRESS") && status.includes("QUOTED"))
      return "Incomplete journeys"
    return `Journeys ${toLower(t(status))}`
  }

  return (
    <>
      <Helmet>
        <title>{getTitle()}</title>
      </Helmet>
      <JourneysProvider>
        <Container width="80%">
          <Breadcrumbs
            trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: getTitle() }]}
            margin="4.5rem 0 1rem 0"
          />
          <H1 margin="0 0 6rem">{getTitle()}</H1>
          <JourneyAdmin />
        </Container>
        <JourneysPanel />
      </JourneysProvider>
    </>
  )
}

export default Journeys
