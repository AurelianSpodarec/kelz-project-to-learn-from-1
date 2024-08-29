import moment from "moment"
import { object, string, array, date } from "yup"
import { isValidPhoneNumber } from "react-phone-number-input"

export const createLeadModel = object({
  type: string().required("MISSING_REQUIRED_FIELD").nullable(),
  lead_source: string().required("MISSING_REQUIRED_FIELD").nullable(),
  date_of_birth: date()
    .max(moment().subtract(18, "years").format("YYYY-MM-DD"))
    .required("MISSING_REQUIRED_FIELD")
    .nullable(),
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
