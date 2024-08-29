import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { H2, SmallText, P } from "@4cplatform/elements/Typography"
import { getName } from "../../Helpers"

// Components
import { IconWithText, LabelWithText } from "../../Atoms"
import { PanelHeader } from "../../Molecules/FlyOutPanel"

// Helpers
import { NetworksContext } from "./networks.context"

const NetworksPanelHeader = ({ selectedNetwork, isDeleted }) => {
  const { selectLoading } = React.useContext(NetworksContext)
  const lastLoggedIn = get(selectedNetwork, "last_logged_in_at", "-")
  return (
    <PanelHeader isDeleted={isDeleted}>
      {/* Title/Subtitle */}
      <H2 margin="1rem 0" appearance="light" isLoading={selectLoading}>
        {get(selectedNetwork, "name")}
      </H2>
      <SmallText appearance="light" isLoading={selectLoading}>
        {`Last login: ${
          lastLoggedIn ? moment(lastLoggedIn, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm") : "-"
        }`}
      </SmallText>
      {isDeleted && (
        <SmallText appearance="light" isLoading={selectLoading}>
          {`Network deleted date: ${moment(
            get(selectedNetwork, "deleted_at"),
            "YYYY-MM-DDTHH:mmZ"
          ).format("MM/DD/YY HH:mm:ss")}`}
        </SmallText>
      )}

      {/* Contact Info */}
      <IconWithText
        icon="pound"
        iconSize="1.5rem"
        appearance="light"
        content={get(selectedNetwork, "id", "-")}
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0 0 1rem"
      />
      <IconWithText
        icon="phone"
        iconSize="1.5rem"
        appearance="light"
        content={get(selectedNetwork, "phone_number", "-")}
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0 0 1rem"
      />
      <IconWithText
        icon="account"
        iconSize="1.5rem"
        appearance="light"
        content={getName({ data: selectedNetwork, isContact: true })}
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0"
      />
      <IconWithText
        icon="subdirectory-arrow-right"
        appearance="light"
        content={get(selectedNetwork, "contact_email_address", "-")}
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0 0 2rem 1rem"
      />
      <IconWithText
        icon="domain"
        iconSize="1.5rem"
        appearance="light"
        content="Company registration number"
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0"
      />
      <IconWithText
        icon="subdirectory-arrow-right"
        appearance="light"
        content={get(selectedNetwork, "company_registration_number", "-")}
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0 0 2rem 1rem"
      />
      <IconWithText
        icon="pound"
        iconSize="1.5rem"
        appearance="light"
        content="FCA Reference"
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0"
      />
      <IconWithText
        icon="subdirectory-arrow-right"
        appearance="light"
        content={get(selectedNetwork, "fca_reference", "-")}
        fontSize="1.6rem"
        isLoading={selectLoading}
        margin="0 0 2rem 1rem"
      />
      <LabelWithText label="Address" appearance="light" isLoading={selectLoading}>
        <>
          {!!get(selectedNetwork, "address.line_one") && (
            <P appearance="light" margin="0">
              {get(selectedNetwork, "address.line_one")}
            </P>
          )}
          {!!get(selectedNetwork, "address.line_two") && (
            <P appearance="light" margin="0">
              {get(selectedNetwork, "address.line_two")}
            </P>
          )}
          {!!get(selectedNetwork, "address.city") && (
            <P appearance="light" margin="0">
              {get(selectedNetwork, "address.city")}
            </P>
          )}
          {!!get(selectedNetwork, "address.county") && (
            <P appearance="light" margin="0">
              {get(selectedNetwork, "address.county")}
            </P>
          )}
          {!!get(selectedNetwork, "address.postcode") && (
            <P appearance="light" margin="0">
              {get(selectedNetwork, "address.postcode")}
            </P>
          )}
        </>
      </LabelWithText>

      {/* Edit Button */}
      {!isDeleted && (
        <Button
          appearance="whiteGhost"
          trailingIcon="chevron-right"
          margin="2rem 0"
          type="Link"
          to={`/networks/${get(selectedNetwork, "slug", "")}`}
          isDisabled={selectLoading}
          name="manage_network"
        >
          Manage Network
        </Button>
      )}
    </PanelHeader>
  )
}

NetworksPanelHeader.defaultProps = {
  selectedNetwork: null,
  isDeleted: false
}

NetworksPanelHeader.propTypes = {
  selectedNetwork: PropTypes.object,
  isDeleted: PropTypes.bool
}

export default NetworksPanelHeader
