import React, { useContext } from "react"
import PropTypes from "prop-types"

// Helpers
import { ClientsContext } from "./clients.context"

// Components
import { PageContext } from "../../Organisms"
import { RoundedButton, RoundedButtonsWrapper } from "./clients.styles"

const buttons = ["Journey", "Quotes", "Policies", "Notes"]

const ClientsPanelButtons = ({ margin }) => {
  const { panelBodyContent, setPanelBodyContent } = useContext(ClientsContext)
  const { panelStatus, setPanelStatus } = useContext(PageContext)

  const handleClick = button => {
    panelStatus !== "open" && setPanelStatus("open")
    setPanelBodyContent(button)
    if (button !== "Journey") {
      setPanelStatus("wide")
    }
  }

  return (
    <RoundedButtonsWrapper margin={margin}>
      {buttons.map((button, i) => (
        <RoundedButton
          key={`button_${i}`}
          className={panelBodyContent === button && "active"}
          appearance="whiteGhost"
          onClick={() => handleClick(button)}
        >
          {button}
        </RoundedButton>
      ))}
    </RoundedButtonsWrapper>
  )
}

ClientsPanelButtons.defaultProps = {
  margin: ""
}
ClientsPanelButtons.propTypes = {
  margin: PropTypes.string
}

export default ClientsPanelButtons
