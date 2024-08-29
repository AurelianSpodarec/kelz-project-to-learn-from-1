import React, { useState } from "react"
import { H2 } from "@4cplatform/elements/Typography"

// Components
import { SettingsWrapper, QuickQuoteSettingsWrapper } from "./organisationSettings.styles"
import QuickQuoteLevel from "./organisationSettings.quickQuote.level"

const QuickQuoteSettings = () => {
  const [isEdit, setIsEdit] = useState({
    basic: false,
    standard: false,
    comprehensive: false
  })

  const levels = ["basic", "standard", "comprehensive"]

  return (
    <SettingsWrapper>
      <H2 margin="0 0 3rem">Quick Quote</H2>
      <QuickQuoteSettingsWrapper>
        {levels.map(level => (
          <QuickQuoteLevel key={level} level={level} isEdit={isEdit} setIsEdit={setIsEdit} />
        ))}
      </QuickQuoteSettingsWrapper>
    </SettingsWrapper>
  )
}

export default QuickQuoteSettings
