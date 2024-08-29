import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { H2, Label, P } from "@4cplatform/elements/Typography"

// Components
import { LabelWithText, IconWithText } from "../../Atoms"
import { PanelHeader } from "../../Molecules/FlyOutPanel"

// Helpers
import { OrganisationsContext } from "./organisations.context"
import { getName } from "../../Helpers"

const OrganisationsPanelHeader = ({ selectedOrganisation, isDeleted }) => {
  const { selectLoading } = React.useContext(OrganisationsContext)

  const contentProps = property => ({
    appearance: "light",
    isLoading: selectLoading,
    content: property ? get(selectedOrganisation, property, "-") : null
  })
  const address = get(selectedOrganisation, "address", null)
  const addressEntries = ["line_one", "line_two", "city", "county", "postcode"]

  const lastLoggedInDate = get(selectedOrganisation, "last_logged_in_at", "")
  const lastLoggedInDateValue =
    lastLoggedInDate && moment(lastLoggedInDate, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YY HH:mm")

  const deletedAtDate = get(selectedOrganisation, "deleted_at", "")
  const deletedAtDateValue =
    deletedAtDate && moment(deletedAtDate, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YY HH:mm")

  return (
    <PanelHeader isDeleted={isDeleted}>
      {/* Org Info */}
      <H2 margin="1rem 0" {...contentProps()}>
        {get(selectedOrganisation, "name", "")}
      </H2>
      {!isDeleted && lastLoggedInDateValue && (
        <Label name="last-login" {...contentProps()} margin="0 0 3rem">
          Last login: {lastLoggedInDateValue}
        </Label>
      )}
      {isDeleted && deletedAtDateValue && (
        <Label name="deleted-at" {...contentProps()} margin="0 0 3rem">
          Deleted at: {deletedAtDateValue}
        </Label>
      )}
      <IconWithText icon="pound" {...contentProps("id")} />
      <IconWithText icon="script-text" {...contentProps("description")} />
      <IconWithText icon="phone" {...contentProps("phone_number")} />
      {!isDeleted && (
        <LabelWithText name="address" label="Address" {...contentProps()}>
          {address &&
            addressEntries.map((x, index) => (
              <P {...contentProps()} margin="0" key={`key_org_address_row_${index}`}>
                {get(address, x, "")}
              </P>
            ))}
        </LabelWithText>
      )}
      <IconWithText
        icon="account"
        {...contentProps()}
        content={getName({ data: selectedOrganisation, isContact: true })}
      />
      <IconWithText icon="email" {...contentProps("contact_email_address")} />

      {/* Manage Org */}
      {!isDeleted && (
        <Button
          appearance="whiteGhost"
          margin="2rem 0 1rem"
          trailingIcon="chevron-right"
          type="Link"
          to={`/organisations/${get(selectedOrganisation, "slug", "")}`}
          isDisabled={selectLoading}
          name="manage_organisation"
        >
          Manage organisation
        </Button>
      )}
    </PanelHeader>
  )
}

OrganisationsPanelHeader.defaultProps = {
  selectedOrganisation: null,
  isDeleted: false
}

OrganisationsPanelHeader.propTypes = {
  selectedOrganisation: PropTypes.object,
  isDeleted: PropTypes.bool
}

export default OrganisationsPanelHeader
