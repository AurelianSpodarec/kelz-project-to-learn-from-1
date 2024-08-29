import React from "react"

// Components
import { RoundedButton, RoundedButtonsWrapper } from "../../clients.styles"

const PolicySummaryButtons = () => {
  // TODO: THERE IS NO CONTENT FOR THESE TABS OUT OF SCOPE ATM
  const [, setActiveTab] = React.useState("People")

  return (
    <RoundedButtonsWrapper margin="2rem 0 1rem">
      <RoundedButton
        header="All"
        appearance="primaryGhost"
        isLightBackground
        onClick={() => {
          setActiveTab("People")
        }}
      >
        People
      </RoundedButton>
      <RoundedButton
        appearance="primaryGhost"
        isLightBackground
        onClick={() => {
          setActiveTab("Documentation")
        }}
      >
        Documentation
      </RoundedButton>
      <RoundedButton
        appearance="primaryGhost"
        isLightBackground
        onClick={() => {
          setActiveTab("Disclosures")
        }}
      >
        Disclosures
      </RoundedButton>
      <RoundedButton
        appearance="primaryGhost"
        isLightBackground
        onClick={() => {
          setActiveTab("Exclusions")
        }}
      >
        Exclusions
      </RoundedButton>
    </RoundedButtonsWrapper>
  )
}

export default PolicySummaryButtons
