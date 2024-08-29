import React from "react"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { P, H3 } from "@4cplatform/elements/Typography"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { AuthWrapper } from "@4cplatform/elements/Auth"
import { OrganisationDetailsContext } from "./details.context"
import { getName } from "../../Helpers"

// Components
import { LabelWithText } from "../../Atoms"
import { SectionWrapper } from "./details.styles"

const ViewDetails = () => {
  const { data, setEdit, isLoading } = React.useContext(OrganisationDetailsContext)
  const address = get(data, "address", null)

  return (
    <>
      <SectionWrapper data-testid="details-section-organisation_details">
        <H3 margin="0 0 2rem">Organisation details</H3>
        <LabelWithText
          label="Company name"
          content={get(data, "name", "-")}
          isLoading={isLoading}
        />
        <LabelWithText
          label="Description"
          content={get(data, "description", "-")}
          isLoading={isLoading}
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
          label="Registration number"
          content={get(data, "company_registration_number", "-")}
          isLoading={isLoading}
        />
        <LabelWithText
          label="FCA reference"
          content={get(data, "fca_reference", "-")}
          isLoading={isLoading}
        />
        <LabelWithText
          label="Company website"
          content={get(data, "website", "-")}
          isLoading={isLoading}
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
      <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"]}>
        <Button
          isDisabled={isLoading}
          leadingIcon="office-building-marker"
          type="inline-button"
          appearance="primaryInline"
          onClick={() => setEdit(true)}
          name="update_organisation_information"
        >
          Update organisation information
        </Button>
      </AuthWrapper>
    </>
  )
}

export default ViewDetails
