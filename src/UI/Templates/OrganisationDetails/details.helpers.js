import { string, object } from "yup"

// Edit Organisation Details yup schema
export const editDetailsModel = object().shape({
  name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  description: string().nullable(),
  address: object({
    postcode: string().required("MISSING_REQUIRED_FIELD").nullable(),
    line_one: string().required("MISSING_REQUIRED_FIELD").nullable(),
    line_two: string().nullable(),
    city: string().required("MISSING_REQUIRED_FIELD").nullable(),
    county: string().required("MISSING_REQUIRED_FIELD").nullable()
  }),
  phone_number: string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "INVALID_PHONE"
    )
    .required("MISSING_REQUIRED_FIELD"),
  company_registration_number: string()
    .matches(/^[\d\w]+$/, "MIX_OF_DIGITS_CHARACTERS_ALLOWED")
    .required("MISSING_REQUIRED_FIELD")
    .nullable(),
  fca_reference: string()
    .matches(/^\d+$/, "ONLY_DIGITS_ALLOWED")
    .min(6)
    .max(6)
    .required("MISSING_REQUIRED_FIELD"),
  website: string().required("MISSING_REQUIRED_FIELD").nullable(),
  contact_first_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  contact_last_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  contact_email_address: string().email().required("MISSING_REQUIRED_FIELD").nullable()
})
