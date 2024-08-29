import React, { useState } from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useFormik } from "formik"
import { Button } from "@4cplatform/elements/Molecules"
import { formatLabelForTestID } from "@4cplatform/elements/Helpers"
import moment from "moment"

// Helpers
import { ApplicantsContext } from "./applicants.context"
import { addEditApplicantModel as validationSchema } from "./applicants.helpers"

// Components
import { Tab, Tabs } from "../../../../../../../../Organisms"
import ApplicantDetails from "./applicants.applicant.form.details"
import ApplicantQuestions from "./applicants.applicant.form.questions"
import ApplicantAxaQuestions from "./applicants.applicant.form.axa"

const ApplicantForm = ({ type, isEdit, applicant }) => {
  const [newActiveID, setNewActiveID] = useState()
  const {
    addApplicant,
    updateApplicant,
    canQuoteAxa,
    updateApplicantLoading,
    addApplicantLoading
  } = React.useContext(ApplicantsContext)

  // Set initial values for form based on context
  const isDependant = type === "dependant"
  let initialValues = {}
  if (isDependant) {
    initialValues = {
      child: true,
      occupation: "OTHER"
    }
  } else {
    initialValues = {
      child: false,
      occupation: isEdit ? get(applicant, "occupation", "") : ""
    }
  }

  // Formik instance
  const addEditApplicantFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      applicant: {
        gender_at_birth: isEdit ? get(applicant, "gender_at_birth", "") : "",
        title: isEdit ? get(applicant, "title", "") : "",
        first_name: isEdit ? get(applicant, "first_name", "") : "",
        middle_names: isEdit ? get(applicant, "middle_names", "") : "",
        last_name: isEdit ? get(applicant, "last_name", "") : "",
        email_address: isEdit ? get(applicant, "email_address", "") : "",
        date_of_birth: isEdit
          ? moment(get(applicant, "date_of_birth", ""), "YYYY-MM-DDTHH:mmZ").format("YYYY-MM-DD")
          : "",
        ...initialValues
      },
      questions: {
        permanent_uk_resident: isEdit ? get(applicant, "data.permanent_uk_resident", "") : "",
        covered_with_a_gp_and_access_to_medical_records: isEdit
          ? get(applicant, "data.covered_with_a_gp_and_access_to_medical_records", "")
          : "",
        pmi_required_to_fulfil_reqs_or_visa: isEdit
          ? get(applicant, "data.pmi_required_to_fulfil_reqs_or_visa", "")
          : "",
        tobacco_products_within_last_2_years: isEdit
          ? get(applicant, "data.tobacco_products_within_last_2_years", "")
          : "",
        permission_to_add_member: isEdit ? get(applicant, "data.permission_to_add_member", "") : ""
      },
      axa_questions: {
        last_5_years_heart_condition_or_heart_problem: isEdit
          ? get(applicant, "data.last_5_years_heart_condition_or_heart_problem", "")
          : "",
        last_5_years_stroke: isEdit ? get(applicant, "data.last_5_years_stroke", "") : "",
        last_5_years_cancer: isEdit ? get(applicant, "data.last_5_years_cancer", "") : "",
        last_5_years_diabetes: isEdit ? get(applicant, "data.last_5_years_diabetes", "") : "",
        last_5_years_mental_illness: isEdit
          ? get(applicant, "data.last_5_years_mental_illness", "")
          : ""
      }
    },
    validationSchema,
    onSubmit: values => {
      // Apply type to body
      const body = {
        ...values,
        applicant: {
          ...get(values, "applicant", {}),
          type: type.toUpperCase()
        }
      }

      if (isEdit) {
        updateApplicant(body)
      } else {
        addApplicant(body)
      }
    }
  })

  const formik = { ...addEditApplicantFormik, validationSchema }
  const { handleSubmit } = formik

  const onSubmit = () => {
    handleSubmit()
    const keys = Object.keys(formik.errors)
    if (keys.includes("applicant")) {
      setNewActiveID(formatLabelForTestID("Personal details"))
    } else if (keys.includes("questions")) {
      setNewActiveID(formatLabelForTestID("Questions"))
    } else if (keys.includes("axa_questions")) {
      setNewActiveID(formatLabelForTestID("AXA Questions"))
    }
  }

  return (
    <>
      <Tabs type="modal" newActiveID={newActiveID}>
        <Tab header="Personal details">
          <ApplicantDetails type={type} formik={formik} />
        </Tab>
        <Tab header="Questions">
          <ApplicantQuestions formik={formik} />
        </Tab>
        <Tab header="AXA Questions" isPresent={canQuoteAxa}>
          <ApplicantAxaQuestions formik={formik} />
        </Tab>
      </Tabs>
      <Button
        name="submit"
        onClick={onSubmit}
        isLoading={addApplicantLoading || updateApplicantLoading}
      >
        Submit
      </Button>
    </>
  )
}

ApplicantForm.defaultProps = {
  isEdit: false,
  applicant: null
}

ApplicantForm.propTypes = {
  isEdit: PropTypes.bool,
  type: PropTypes.oneOf(["partner", "dependant", "primary"]).isRequired,
  applicant: PropTypes.object
}

export default ApplicantForm
