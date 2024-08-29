import React from "react"
import PropTypes from "prop-types"
import { Toggle } from "@4cplatform/elements/Forms"
import { P } from "@4cplatform/elements/Typography"

const ApplicantAxaQuestions = ({ formik }) => (
  <>
    <P>In the last five years have you had or received treatment for:</P>
    <Toggle
      name="axa_questions.last_5_years_heart_condition_or_heart_problem"
      label="Heart condition or heart problem?"
      formik={formik}
    />
    <Toggle name="axa_questions.last_5_years_stroke" label="Stroke?" formik={formik} />
    <Toggle name="axa_questions.last_5_years_cancer" label="Cancer?" formik={formik} />
    <Toggle name="axa_questions.last_5_years_diabetes" label="Diabetes?" formik={formik} />
    <Toggle
      name="axa_questions.last_5_years_mental_illness"
      label="Mental illness?"
      formik={formik}
    />
  </>
)

ApplicantAxaQuestions.propTypes = {
  formik: PropTypes.object.isRequired
}

export default ApplicantAxaQuestions
