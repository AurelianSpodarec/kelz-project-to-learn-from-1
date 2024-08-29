import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { ClientsContext } from "./clients.context"
import { PageContext } from "../../Organisms"

// Components
import { ButtonsWrapper } from "./clients.styles"

const ClientsPanelHeaderButtons = ({ isWidePanel }) => {
  const { queryLoading, setNotesModal, panelBodyContent, setPanelBodyContent } =
    useContext(ClientsContext)
  const { setPanelStatus } = useContext(PageContext)
  return (
    <ButtonsWrapper isWidePanel={isWidePanel}>
      <Button
        appearance="whiteGhost"
        trailingIcon="account-plus"
        margin={isWidePanel ? "0 2rem 0 0" : "2rem 0"}
        onClick={() => {
          setPanelBodyContent("edit")
          !isWidePanel && setPanelStatus("wide")
        }}
        isDisabled={queryLoading}
        name="edit_client"
      >
        Edit client
      </Button>
      <Button
        appearance="whiteGhost"
        trailingIcon="playlist-plus"
        margin={isWidePanel ? "0 2rem 0 0" : "2rem 0"}
        onClick={() => {
          panelBodyContent !== "Notes" && setPanelBodyContent("Notes")
          panelBodyContent === "Journey" && setPanelStatus("wide")
          setNotesModal(true)
        }}
        isDisabled={queryLoading}
        name="add_note"
      >
        Add note
      </Button>
    </ButtonsWrapper>
  )
}

ClientsPanelHeaderButtons.defaultProps = {
  isWidePanel: false
}

ClientsPanelHeaderButtons.propTypes = {
  /**
   * Change buttons styling if it is wide panel
   */
  isWidePanel: PropTypes.bool
}

export default ClientsPanelHeaderButtons
