import React from "react"
import { Helmet } from "react-helmet-async"

// Components
import { Journey as ClientJourney } from "../../UI/Templates"
import JourneyProvider from "./context/journey.provider"

const Journey = () => (
  <>
    <Helmet>
      <title>Journey</title>
    </Helmet>
    <JourneyProvider>
      <ClientJourney />
    </JourneyProvider>
  </>
)

export default Journey
