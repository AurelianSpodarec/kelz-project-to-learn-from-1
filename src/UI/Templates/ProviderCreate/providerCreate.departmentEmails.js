import React from "react"
import PropTypes from "prop-types"
import { snakeCase } from "lodash"
import { Input } from "@4cplatform/elements/Forms"
import { H3 } from "@4cplatform/elements/Typography"

const departmentalEmails = ["Risk", "Underwriting", "Onboarding", "Agency codes"]

const ProviderDepartmentEmails = ({ formik }) => (
  <>
    <H3 margin="0 0 2rem">Departmental emails</H3>
    {departmentalEmails.map((email, i) => (
      <Input
        key={`email_input_${i}`}
        label={`${email} email`}
        name={`${snakeCase(email)}_email`}
        formik={formik}
        placeholder={`${email} email`}
      />
    ))}
  </>
)

ProviderDepartmentEmails.propTypes = {
  /**
   * The formik instance that controls this component
   */
  formik: PropTypes.object
}

export default ProviderDepartmentEmails
