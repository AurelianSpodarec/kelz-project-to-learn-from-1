import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { H2, SmallText } from "@4cplatform/elements/Typography"

// Helpers
import { ClientsContext } from "./clients.context"
import { getName } from "../../Helpers"

// Components
import { PanelHeader } from "../../Molecules/FlyOutPanel"
import ClientsPanelHeaderDetails from "./clients.panel.header.details"
import ClientsPanelHeaderAddress from "./clients.panel.header.address"
import ClientsPanelHeaderButtons from "./clients.panel.header.buttons"
import { HeaderUserDetailsWrapper } from "./clients.styles"
import ClientNotes from "./clients.panel.header.notes"

const ClientsPanelHeader = ({ isEdit, isWidePanel }) => {
  const { viewLoading, viewData, notesModal } = React.useContext(ClientsContext)
  const name = getName({ data: viewData })
  const created = get(viewData, "created_at", "-")
  const displayDate = new Date(created).toLocaleString().replace(",", " ")

  return (
    <PanelHeader>
      <H2 appearance="light" isLoading={viewLoading} margin={`${isEdit ? "0" : "2rem"} 0 1rem`}>
        {name}
      </H2>
      <SmallText appearance="light" isLoading={viewLoading} margin="0">
        Created: {displayDate}
      </SmallText>
      <HeaderUserDetailsWrapper isEdit={isEdit}>
        <ClientsPanelHeaderDetails isEdit={isEdit} />
        <ClientsPanelHeaderAddress />
        {!isEdit && <ClientsPanelHeaderButtons isWidePanel={isWidePanel} />}
      </HeaderUserDetailsWrapper>
      {notesModal && <ClientNotes />}
    </PanelHeader>
  )
}

ClientsPanelHeader.defaultProps = {
  isEdit: false,
  isWidePanel: false
}

ClientsPanelHeader.propTypes = {
  /**
   * Whether or not to display the Edit and Add note buttons
   */
  isEdit: PropTypes.bool,
  /**
   * Change buttons styling if it is wide panel
   */
  isWidePanel: PropTypes.bool
}

export default ClientsPanelHeader
