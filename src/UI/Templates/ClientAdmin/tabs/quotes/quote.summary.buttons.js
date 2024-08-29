import React from "react"
import { Button } from "@4cplatform/elements/Molecules"

// Components
import { ButtonsWrapper } from "../../clients.styles"

const QuoteSummaryButtons = () => (
  <ButtonsWrapper margin="2rem">
    <Button appearance="success" trailingIcon="chevron-right" onClick={() => {}}>
      Resume journey
    </Button>
    <Button appearance="error" trailingIcon="cancel" onClick={() => {}}>
      Cancel
    </Button>
  </ButtonsWrapper>
)

export default QuoteSummaryButtons
