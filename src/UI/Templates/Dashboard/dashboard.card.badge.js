import React from "react"

// Components
import { IconWithText } from "../../Atoms"
import { SimulatedBadgeWrapper } from "./dashboard.styles"

const SimulatedBadge = () => (
  <SimulatedBadgeWrapper>
    <IconWithText
      content="Simulated"
      appearance="light"
      margin="0"
      icon="cube-outline"
      fontSize="1.25rem"
      iconSize="1.4rem"
      iconSpacing="0.5rem"
    />
  </SimulatedBadgeWrapper>
)

export default SimulatedBadge
