import React from "react"
import PropTypes from "prop-types"
import { Input, TextArea } from "@4cplatform/elements/Forms"
import { H3 } from "@4cplatform/elements/Typography"

const ProviderCompanyDetails = ({ formik }) => (
  <>
    <H3 margin="0 0 3rem">Company details</H3>
    <Input label="Company name" name="name" formik={formik} placeholder="Input text" />
    <TextArea
      label="Description"
      name="description"
      formik={formik}
      placeholder="Company description"
    />
    <Input
      label="Registration number"
      name="registration_number"
      formik={formik}
      placeholder="Registration number"
    />
    <Input
      label="Primary contact email"
      name="primary_contact_email"
      formik={formik}
      placeholder="Primary contact email"
    />
    <Input
      label="Company website"
      name="website"
      formik={formik}
      placeholder="Company website (e.g. www.example.com)"
      leadingText="https://"
    />
  </>
)

ProviderCompanyDetails.propTypes = {
  formik: PropTypes.object.isRequired
}

export default ProviderCompanyDetails
