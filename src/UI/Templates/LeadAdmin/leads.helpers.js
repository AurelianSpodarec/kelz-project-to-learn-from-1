import { object, string, array } from "yup"
import { isValidPhoneNumber } from "react-phone-number-input"

// Icon helper for lead type
export const getTypeIcon = type => {
  switch (type) {
    case "PMI":
    default:
      return "medical-bag"
  }
}

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

export const editLeadModel = object({
  type: string().required("MISSING_REQUIRED_FIELD").nullable(),
  lead_source: string().required("MISSING_REQUIRED_FIELD").nullable(),
  date_of_birth: string().required("MISSING_REQUIRED_FIELD").nullable(),
  gender_at_birth: string().required("MISSING_REQUIRED_FIELD").nullable(),
  title: string().required("MISSING_REQUIRED_FIELD").nullable(),
  first_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  last_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  email_address: string().email().required("MISSING_REQUIRED_FIELD").nullable(),
  phone_numbers: array()
    .of(
      object().shape({
        type: string().required(),
        number: string()
          .test("Phone invalid", "INVALID_PHONE", val => {
            if (!val) return false
            return isValidPhoneNumber(val, "GB")
          })
          .required("MISSING_REQUIRED_FIELD")
      })
    )
    .required("MISSING_REQUIRED_FIELD")
    .min(1)
})

export const dispositionModel = object({
  disposition: string().required("MISSING_REQUIRED_FIELD").nullable(),
  note: string()
})

export const editTransferModel = object({
  user_id: string().required("MISSING_REQUIRED_FIELD").nullable()
})
