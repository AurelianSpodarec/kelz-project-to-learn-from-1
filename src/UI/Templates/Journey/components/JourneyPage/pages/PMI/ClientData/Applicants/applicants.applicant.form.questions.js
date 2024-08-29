import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { Toggle } from "@4cplatform/elements/Forms"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { H4, P } from "@4cplatform/elements/Typography"

const ApplicantQuestions = ({ formik }) => (
  <>
    <Toggle
      name="questions.permanent_uk_resident"
      label="Is the client a permanent UK resident?"
      formik={formik}
    />
    <Toggle
      name="questions.covered_with_a_gp_and_access_to_medical_records"
      label="Is the person to be covered registered with a GP and do they have access to their medical records in English?"
      formik={formik}
    />
    <Toggle
      name="questions.pmi_required_to_fulfil_reqs_or_visa"
      label="Is PMI required in order to fulfill home office requirements and/or a visa application?"
      formik={formik}
    />
    <Toggle
      name="questions.tobacco_products_within_last_2_years"
      label="Has the client used any tobacco products within the last 2 years?"
      formik={formik}
    />
    {!get(formik, "values.questions.permission_to_add_member", false) && (
      <ComplianceNote type="error">
        <H4 margin="0 0 1rem">Permission to add</H4>
        <P margin="0 0 1rem">
          In order to continue with the journey, all partners and dependants must give permission to
          be added.
        </P>
      </ComplianceNote>
    )}
    <Toggle
      name="questions.permission_to_add_member"
      label="Permission to add this member?"
      formik={formik}
    />
  </>
)

ApplicantQuestions.propTypes = {
  formik: PropTypes.object.isRequired
}

export default ApplicantQuestions
