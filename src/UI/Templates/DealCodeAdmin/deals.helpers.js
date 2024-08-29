import { string, object, boolean } from "yup"
import { get } from "lodash"

// Helpers
import { requiredIfFalse } from "../../Helpers"

// Icon helper for lead type
export const getTypeIcon = type => {
  switch (type) {
    case "PMI":
    default:
      return "medical-bag"
  }
}

/**
 * The validationSchema used for the editDealCodeFormik instance
 */
export const editDealCodeModel = object({
  description: string(),
  start_date: string().required("MISSING_REQUIRED_FIELD"),
  end_date: string().required("MISSING_REQUIRED_FIELD"),
  style_new: boolean()
    .test("requiredIfFalse", "REQUIRED_IF_FALSE", (value, context) => {
      const values = get(context, "parent", {})
      return requiredIfFalse(values, ["style_new", "style_switch"])
    })
    .required("MISSING_REQUIRED_FIELD"),
  style_switch: boolean()
    .test("requiredIfFalse", "REQUIRED_IF_FALSE", (value, context) => {
      const values = get(context, "parent", {})
      return requiredIfFalse(values, ["style_new", "style_switch"])
    })
    .required("MISSING_REQUIRED_FIELD"),
  underwriting_fmu: boolean()
    .test("requiredIfFalse", "REQUIRED_IF_FALSE", (value, context) => {
      const values = get(context, "parent", {})
      return requiredIfFalse(values, ["underwriting_mori", "underwriting_fmu"])
    })
    .required("MISSING_REQUIRED_FIELD"),
  underwriting_mori: boolean()
    .test("requiredIfFalse", "REQUIRED_IF_FALSE", (value, context) => {
      const values = get(context, "parent", {})
      return requiredIfFalse(values, ["underwriting_mori", "underwriting_fmu"])
    })
    .required("MISSING_REQUIRED_FIELD"),
  active: boolean().required("MISSING_REQUIRED_FIELD")
})
