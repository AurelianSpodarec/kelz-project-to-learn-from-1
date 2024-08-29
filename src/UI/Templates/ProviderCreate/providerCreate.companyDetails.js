import React from "react"
import PropTypes from "prop-types"
import { Input, TextArea, QuerySelect } from "@4cplatform/elements/Forms"
import { H3 } from "@4cplatform/elements/Typography"

const ProviderCompanyDetails = ({ formik }) => (
  <>
    <H3 margin="0 0 3rem">Company details</H3>
    <QuerySelect
      name="provider_key"
      label="Provider key"
      noun={{ singular: "provider", plural: "providers" }}
      endpoint="/available-providers"
      render={data =>
        data.map((provider, i) => (
          <option
            value={provider}
            key={`provider_key-option_${i}`}
            data-testid={`provider_key-option_${i}`}
          >
            {provider}
          </option>
        ))
      }
      formik={formik}
      margin="0 0 2rem"
      fontSize="1.4rem"
    />
    <Input label="Company name" name="name" formik={formik} placeholder="Input text" />
    <TextArea label="Description" name="description" formik={formik} placeholder="Description" />
    <Input
      label="Registration number"
      name="registration_number"
      formik={formik}
      placeholder="Input text"
    />
    <Input
      label="Primary contact email"
      name="primary_contact_email"
      formik={formik}
      placeholder="Input text"
    />
    <Input
      label="Company website"
      name="website"
      formik={formik}
      placeholder="Input text"
      leadingText="https://"
    />
  </>
)

ProviderCompanyDetails.propTypes = {
  formik: PropTypes.object.isRequired
}

export default ProviderCompanyDetails
