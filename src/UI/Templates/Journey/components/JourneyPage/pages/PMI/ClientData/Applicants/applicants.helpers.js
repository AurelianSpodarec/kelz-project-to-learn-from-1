import { string, object, boolean } from "yup"

export const addEditAliasModel = object({
  address: object({
    line_one: string().required("MISSING_REQUIRED_FIELD"),
    line_two: string().nullable(),
    city: string().required("MISSING_REQUIRED_FIELD"),
    county: string().required("MISSING_REQUIRED_FIELD"),
    postcode: string().required("MISSING_REQUIRED_FIELD")
  }),
  alias: object({
    title: string().required("MISSING_REQUIRED_FIELD"),
    first_name: string().required("MISSING_REQUIRED_FIELD"),
    middle_names: string().nullable(),
    last_name: string().required("MISSING_REQUIRED_FIELD")
  })
})

export const addEditApplicantModel = object({
  applicant: object({
    gender_at_birth: string().required("MISSING_REQUIRED_FIELD"),
    title: string().required("MISSING_REQUIRED_FIELD"),
    first_name: string().required("MISSING_REQUIRED_FIELD"),
    middle_names: string().nullable(),
    last_name: string().required("MISSING_REQUIRED_FIELD"),
    email_address: string().email("INVALID_EMAIL").required("MISSING_REQUIRED_FIELD"),
    date_of_birth: string().required("MISSING_REQUIRED_FIELD"),
    child: boolean().required("MISSING_REQUIRED_FIELD"),
    occupation: string().required("MISSING_REQUIRED_FIELD")
  }),
  questions: object({
    permanent_uk_resident: boolean()
      .oneOf([true], "MUST_BE_TRUE")
      .required("MISSING_REQUIRED_FIELD"),
    covered_with_a_gp_and_access_to_medical_records: boolean()
      .oneOf([true], "MUST_BE_TRUE")
      .required("MISSING_REQUIRED_FIELD"),
    pmi_required_to_fulfil_reqs_or_visa: boolean().required("MISSING_REQUIRED_FIELD"),
    tobacco_products_within_last_2_years: boolean().required("MISSING_REQUIRED_FIELD"),
    permission_to_add_member: boolean().required("MISSING_REQUIRED_FIELD")
  }),
  axa_questions: object({
    last_5_years_heart_condition_or_heart_problem: boolean().required("MISSING_REQUIRED_FIELD"),
    last_5_years_stroke: boolean().required("MISSING_REQUIRED_FIELD"),
    last_5_years_cancer: boolean().required("MISSING_REQUIRED_FIELD"),
    last_5_years_diabetes: boolean().required("MISSING_REQUIRED_FIELD"),
    last_5_years_mental_illness: boolean().required("MISSING_REQUIRED_FIELD")
  })
})
