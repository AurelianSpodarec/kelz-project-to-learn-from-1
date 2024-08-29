import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { get } from "lodash"
import { useHistory } from "react-router-dom"
import { Button } from "@4cplatform/elements/Molecules"
import { H2, SmallText, P } from "@4cplatform/elements/Typography"

// Components
import { LabelWithText, IconWithText } from "../../Atoms"
import { PanelHeader } from "../../Molecules/FlyOutPanel"
import { PanelButtonsWrapper } from "./networkOrganisations.styles"

// Helpers
import { NetworkOrganisationsContext } from "./networkOrganisations.context"
import { PageContext } from "../../Organisms"
import { getName } from "../../Helpers"

const NetworkOrganisationsPanelHeader = ({ selectedOrganisation }) => {
  const { resetPanel } = React.useContext(PageContext)
  const { selectLoading, network } = React.useContext(NetworkOrganisationsContext)
  const name = get(selectedOrganisation, "name", "")
  const lastLoggedIn = get(selectedOrganisation, "last_logged_in_at", "")
  const history = useHistory()

  return (
    <PanelHeader>
      <H2 margin="1rem 0" appearance="light" isLoading={selectLoading}>
        {name}
      </H2>
      <SmallText appearance="light" isLoading={selectLoading}>
        Last login: {moment(lastLoggedIn, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")}
      </SmallText>

      {/* Contact Info */}
      <IconWithText
        icon="pound"
        iconSize="1.5rem"
        appearance="light"
        content={get(selectedOrganisation, "id", "-")}
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0 0 1rem"
      />
      <IconWithText
        icon="star"
        iconSize="1.5rem"
        appearance="light"
        content={get(selectedOrganisation, "phone_number", "-")}
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0 0 1rem"
      />
      <IconWithText
        icon="account"
        iconSize="1.5rem"
        appearance="light"
        content={getName({ data: selectedOrganisation, isContact: true })}
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0"
      />
      <IconWithText
        icon="subdirectory-arrow-right"
        appearance="light"
        content={get(selectedOrganisation, "contact_email_address", "-")}
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0 0 2rem 1rem"
      />
      <LabelWithText label="Address" appearance="light" isLoading={selectLoading}>
        <>
          {!!get(selectedOrganisation, "address.address_line_one") && (
            <P appearance="light" margin="0">
              {get(selectedOrganisation, "address.address_line_one")}
            </P>
          )}
          {!!get(selectedOrganisation, "address.address_line_two") && (
            <P appearance="light" margin="0">
              {get(selectedOrganisation, "address.address_line_two")}
            </P>
          )}
          {!!get(selectedOrganisation, "address.city") && (
            <P appearance="light" margin="0">
              {get(selectedOrganisation, "address.city")}
            </P>
          )}
          {!!get(selectedOrganisation, "address.county") && (
            <P appearance="light" margin="0">
              {get(selectedOrganisation, "address.county")}
            </P>
          )}
          {!!get(selectedOrganisation, "address.postcode") && (
            <P appearance="light" margin="0">
              {get(selectedOrganisation, "address.postcode")}
            </P>
          )}
        </>
      </LabelWithText>

      {/* Quotes & Policies */}
      <PanelButtonsWrapper>
        <Button
          appearance="whiteGhost"
          trailingIcon="map-marker-path"
          onClick={() => {
            resetPanel()
            history.push(
              `/networks/${get(network, "slug", "")}?manage=quotes&organisation_name=${encodeURI(
                get(selectedOrganisation, "name")
              )}`
            )
          }}
        >
          Quotes
        </Button>
        <Button
          appearance="whiteGhost"
          trailingIcon="script-text"
          onClick={() => {
            resetPanel()
            history.push(
              `/networks/${get(network, "slug", "")}?manage=policies&organisation_name=${encodeURI(
                get(selectedOrganisation, "name")
              )}`
            )
          }}
        >
          Policies
        </Button>
      </PanelButtonsWrapper>
    </PanelHeader>
  )
}

NetworkOrganisationsPanelHeader.defaultProps = {
  selectedOrganisation: null
}

NetworkOrganisationsPanelHeader.propTypes = {
  selectedOrganisation: PropTypes.object
}

export default NetworkOrganisationsPanelHeader
