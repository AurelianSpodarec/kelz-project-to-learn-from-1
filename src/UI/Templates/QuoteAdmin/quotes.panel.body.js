import React from "react"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { QuotesContext } from "./quotes.context"

// Components
import { PanelBody } from "../../Molecules/FlyOutPanel"

const QuoteView = () => {
  const { selectLoading, setMessagingModal } = React.useContext(QuotesContext)
  return (
    <PanelBody>
      {/* TODO: Messaging */}
      <Button
        appearance="success"
        trailingIcon="email"
        onClick={() => setMessagingModal(true)}
        name="messaging_modal"
        isLoading={selectLoading}
        isDisabled
      >
        Messaging
      </Button>
    </PanelBody>
  )
}

export default QuoteView
