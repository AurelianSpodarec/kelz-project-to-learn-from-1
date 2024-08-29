import { object, string, array } from "yup"
import { get } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { isValidPhoneNumber } from "react-phone-number-input"

// Icon helper for gender
export const getGenderIcon = gender => {
  switch (gender) {
    case "male":
      return "gender-male"
    case "female":
      return "gender-female"
    default:
      return "gender-male-female"
  }
}

export const editClientModel = object({
  date_of_birth: string().required("MISSING_REQUIRED_FIELD").nullable(),
  gender: string().required("MISSING_REQUIRED_FIELD").nullable(),
  title: string().required("MISSING_REQUIRED_FIELD").nullable(),
  first_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  last_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  email_address: string().email().required("MISSING_REQUIRED_FIELD").nullable(),
  phone_numbers: array()
    .of(
      object().shape({
        type: string().required("MISSING_REQUIRED_FIELD"),
        number: string()
          .test("Phone invalid", "INVALID_PHONE", val => {
            if (!val) return false
            return isValidPhoneNumber(val, "GB")
          })
          .required("MISSING_REQUIRED_FIELD")
      })
    )
    .required("MIN_LENGTH_NOT_MET")
    .min(1),
  address: object({
    line_one: string().required("MISSING_REQUIRED_FIELD"),
    line_two: string().nullable(),
    city: string().required("MISSING_REQUIRED_FIELD"),
    county: string().required("MISSING_REQUIRED_FIELD"),
    postcode: string().required("MISSING_REQUIRED_FIELD")
  })
})

// TODO: THESE ICONS AND COLORS HAVE NOT BEEN DEFINED THEY WILL BE WORKED ON FUTURE
export const getIconDetails = type => {
  switch (type) {
    case "AWAITING_TERMS":
    case "AWAITING_ACCEPTANCE":
      return {
        icon: "alert",
        iconColour: get(colours, "alerts.orange", "orange")
      }
    case "ACCEPTED_UNDERWRITING_WITH_EXCLUSIONS":
      return {
        icon: "info",
        iconColour: get(colours, "alerts.orange", "orange")
      }
    case "DECLINED":
    case "FAILED_ONBOARDING":
    case "DECLINED_UNDERWRITING":
      return {
        icon: "alert",
        iconColour: get(colours, "alerts.orange", "orange")
      }
    case "ACCEPTED":
    case "ACCEPTED_UNDERWRITING":
    case "ONBOARDED":
      return {
        icon: "info",
        iconColour: get(colours, "alerts.green", "green")
      }
    default:
      return {
        icon: "alert",
        iconColour: get(colours, "alerts.orange", "orange")
      }
  }
}
