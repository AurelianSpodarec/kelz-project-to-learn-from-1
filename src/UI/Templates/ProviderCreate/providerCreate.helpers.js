import { get } from "lodash"
import { object, string, array, mixed } from "yup"
import { isValidPhoneNumber } from "react-phone-number-input"
import { validateFiles } from "@4cplatform/elements/Helpers"

// Helpers
import { alphanumericRegex } from "../../Helpers"

export const uploadLogoModel = object({
  upload_logo: mixed()
    .required()
    .test("fileValidation", "LOGO_INVALID", async (_, context) => {
      const list = get(context, "parent.update_logo", [])
      return validateFiles(list, { types: ["image/jpeg", "image/png"] })
    })
})

export const createProviderModel = object({
  provider_key: string().required("MISSING_REQUIRED_FIELD"),
  name: string().required("MISSING_REQUIRED_FIELD"),
  description: string(),
  registration_number: string()
    .matches(alphanumericRegex, "INVALID_ALPHANUMERIC")
    .required("MISSING_REQUIRED_FIELD"),
  primary_contact_email: string().email("INVALID_EMAIL").required("MISSING_REQUIRED_FIELD"),
  risk_email: string().email("INVALID_EMAIL").required("MISSING_REQUIRED_FIELD"),
  underwriting_email: string().email("INVALID_EMAIL").required("MISSING_REQUIRED_FIELD"),
  onboarding_email: string().email("INVALID_EMAIL").required("MISSING_REQUIRED_FIELD"),
  agency_codes_email: string().email("INVALID_EMAIL").required("MISSING_REQUIRED_FIELD"),
  website: string().url("INVALID_URL").required("MISSING_REQUIRED_FIELD"),
  additional_contact_details: array(
    object({
      type: string().required("MISSING_REQUIRED_FIELD"),
      contact: string()
        .when("type", {
          is: "email",
          then: string().email("INVALID_EMAIL")
        })
        .when("type", {
          is: "phone",
          then: string().test("Phone invalid", "INVALID_PHONE", val => {
            if (!val) return false
            return isValidPhoneNumber(val, "GB")
          })
        })
        .when("type", {
          is: "url",
          then: string().url("INVALID_URL")
        })
        .required("MISSING_REQUIRED_FIELD"),
      description: string()
    })
  )
})
