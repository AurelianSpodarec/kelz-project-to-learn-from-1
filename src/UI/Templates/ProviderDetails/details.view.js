import React from "react"
import { get, capitalize, isEmpty } from "lodash"
import { v4 as uuid } from "uuid"
import { Button } from "@4cplatform/elements/Molecules"
import { H3, SmallText } from "@4cplatform/elements/Typography"

// Helpers
import { renderA } from "../../Helpers"
import { ProviderDetailsContext } from "./details.context"

// Components
import { LabelWithText } from "../../Atoms"
import { SectionWrapper, CustomFieldWrapper } from "./details.styles"

const ViewDetails = () => {
  const { data, setEdit, isLoading } = React.useContext(ProviderDetailsContext)

  return (
    <>
      <H3 margin="0 0 1rem" isLoading={isLoading}>
        Company details
      </H3>
      <SectionWrapper data-testid="provider-details-section">
        <LabelWithText
          label="Provider key"
          name="provider_key"
          content={get(data, "provider_key", "-")}
          isLoading={isLoading}
        />
        <LabelWithText
          label="Company name"
          name="company_name"
          content={get(data, "name", "-")}
          isLoading={isLoading}
        />
        <LabelWithText
          label="Description"
          name="description"
          content={get(data, "description", "-")}
          isLoading={isLoading}
          loadingLines={3}
        />
        <LabelWithText
          label="Registration number"
          name="registration_number"
          content={get(data, "registration_number", "-")}
          isLoading={isLoading}
        />
        <LabelWithText
          label="Primary contact email"
          name="primary_contact_email"
          isLoading={isLoading}
        >
          {renderA("email", get(data, "primary_contact_email", null))}
        </LabelWithText>
        <LabelWithText label="Company website" name="website" isLoading={isLoading}>
          {renderA("url", get(data, "website", null))}
        </LabelWithText>
      </SectionWrapper>
      {/* Departmental emails */}
      <H3 margin="1rem 0 2rem" isLoading={isLoading}>
        Departmental emails
      </H3>
      <SectionWrapper data-testid="provider-details-section">
        {["risk_email", "underwriting_email", "onboarding_email", "agency_codes_email"].map(key => {
          const email = get(data, key, null)
          return (
            email && (
              <LabelWithText
                key={uuid()}
                name={key}
                label={capitalize(key.replace(/_/g, " "))}
                isLoading={isLoading}
              >
                {renderA("email", email)}
              </LabelWithText>
            )
          )
        })}
      </SectionWrapper>
      {/* Additional contact details */}
      {!isEmpty(get(data, "additional_contact_details", [])) && (
        <>
          <H3 margin="1rem 0" isLoading={isLoading}>
            Additional contact details
          </H3>
          <SectionWrapper data-testid="provider-details-section">
            {get(data, "additional_contact_details", []).map(item => {
              const type = get(item, "type", null)
              const contact = get(item, "contact", null)

              if (!type || !contact) return null

              let label = "Phone number"
              if (type === "email") label = "Email address"
              if (type === "url" || type === "website") label = "Website URL"

              return (
                <CustomFieldWrapper key={uuid()}>
                  <LabelWithText margin="0" label={label} isLoading={isLoading} loadingLines={3}>
                    {renderA(type, contact)}
                    <SmallText>{get(item, "description", "-")}</SmallText>
                  </LabelWithText>
                </CustomFieldWrapper>
              )
            })}
          </SectionWrapper>
        </>
      )}

      <Button
        isDisabled={isLoading}
        leadingIcon="office-building-marker"
        type="inline-button"
        appearance="primaryInline"
        onClick={() => setEdit(true)}
        name="update_provider_information"
      >
        Update provider information
      </Button>
    </>
  )
}

export default ViewDetails
