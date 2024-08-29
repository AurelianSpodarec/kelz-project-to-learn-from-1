import { isValidPhoneNumber } from "react-phone-number-input"
import { object, string } from "yup"

export const createNetworkModel = object({
  name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  description: string().required("MISSING_REQUIRED_FIELD").nullable(),
  company_registration_number: string()
    .matches(/^[\d\w]+$/, "MIX_OF_DIGITS_CHARACTERS_ALLOWED")
    .required("MISSING_REQUIRED_FIELD")
    .nullable(),
  fca_reference: string()
    .matches(/^\d+$/, "ONLY_DIGITS_ALLOWED")
    .min(6)
    .max(6)
    .required("MISSING_REQUIRED_FIELD"),
  phone_number: string()
    .test("Phone invalid", "INVALID_PHONE", val => {
      if (!val) return false
      return isValidPhoneNumber(val, "GB")
    })
    .required("MISSING_REQUIRED_FIELD"),
  contact_first_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  contact_last_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  contact_email_address: string().email().required("MISSING_REQUIRED_FIELD").nullable(),
  address: object({
    postcode: string().required("MISSING_REQUIRED_FIELD").nullable(),
    line_one: string().required("MISSING_REQUIRED_FIELD").nullable(),
    line_two: string().nullable(),
    city: string().required("MISSING_REQUIRED_FIELD").nullable(),
    county: string().required("MISSING_REQUIRED_FIELD").nullable()
  })
})
