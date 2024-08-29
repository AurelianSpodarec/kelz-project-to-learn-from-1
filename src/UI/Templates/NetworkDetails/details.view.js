import React from "react"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { H3, P } from "@4cplatform/elements/Typography"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { AuthWrapper } from "@4cplatform/elements/Auth"
import { NetworkDetailsContext } from "./details.context"
import { getName } from "../../Helpers"

// Components
import { LabelWithText } from "../../Atoms"
import { SectionWrapper } from "./details.styles"

const ViewDetails = () => {
  const { data, setEdit, isLoading } = React.useContext(NetworkDetailsContext)

  const address = get(data, "address", null)

  return (
    <>
      {/* Network Details */}
      <SectionWrapper data-testid="details-section-network_details">
        <H3 margin="0 0 2rem">Network details</H3>
        <LabelWithText
          label="Network name"
          isLoading={isLoading}
          content={get(data, "name", "-")}
        />
        <LabelWithText
          label="Description"
          isLoading={isLoading}
          content={get(data, "description", "-")}
        />
        {!!address && (
          <LabelWithText label="Address" isLoading={isLoading}>
            <>
              {!!get(address, "line_one") && <P margin="0">{get(address, "line_one")}</P>}
              {!!get(address, "line_two") && <P margin="0">{get(address, "line_two")}</P>}
              {!!get(address, "city") && <P margin="0">{get(address, "city")}</P>}
              {!!get(address, "county") && <P margin="0">{get(address, "county")}</P>}
              {!!get(address, "postcode") && <P margin="0">{get(address, "postcode")}</P>}
            </>
          </LabelWithText>
        )}
        <LabelWithText
          label="Phone number"
          isLoading={isLoading}
          content={get(data, "phone_number", "-")}
        />
        <LabelWithText
          label="Registration Number"
          isLoading={isLoading}
          content={get(data, "company_registration_number", "-")}
        />
        <LabelWithText
          label="FCA Reference"
          isLoading={isLoading}
          content={get(data, "fca_reference", "-")}
        />
      </SectionWrapper>

      {/* Contact Details */}
      <SectionWrapper data-testid="details-section-contact_details">
        <H3 margin="0 0 2rem">Contact details</H3>
        <LabelWithText
          label="Primary contact name"
          isLoading={isLoading}
          content={getName({ data, isContact: true })}
        />
        <LabelWithText
          label="Primary contact email"
          isLoading={isLoading}
          content={get(data, "contact_email_address", "-")}
          colour={colours.blue}
        />
      </SectionWrapper>

      {/* Edit button */}
      <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "NETWORK_ADMIN"]}>
        <Button
          isDisabled={isLoading}
          leadingIcon="office-building-marker"
          type="inline-button"
          appearance="primaryInline"
          onClick={() => setEdit(true)}
          name="update_network_information"
        >
          Update network information
        </Button>
      </AuthWrapper>
    </>
  )
}

export default ViewDetails
