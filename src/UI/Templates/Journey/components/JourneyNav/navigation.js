import React, { useContext } from "react"
import { get } from "lodash"

// Components
import { NavigationWrapper } from "./navigation.styles"
import NavSection from "./navigation.section"

// Helpers
import { JourneyContext } from "../../journey.context"

const Navigation = () => {
  const { navigation } = useContext(JourneyContext)
  const clientData = get(navigation, "[0]", [])
  const quotes = get(navigation, "[1]", [])
  const policy = get(navigation, "[2]", [])

  return (
    <NavigationWrapper>
      <NavSection title="Client data" pages={clientData} isFirst />
      <NavSection title="Quotes" pages={quotes} />
      <NavSection title="Policy" pages={policy} />
    </NavigationWrapper>
  )
}

export default Navigation
