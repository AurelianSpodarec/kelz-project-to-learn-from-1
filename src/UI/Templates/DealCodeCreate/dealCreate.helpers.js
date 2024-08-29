import { object, string, boolean } from "yup"
import { get } from "lodash"

// Helpers
import { requiredIfFalse } from "../../Helpers"

/**
 * The validationSchema used by the createDealCodeFormik instance
 */
export const createDealCodeModel = object({
  product_type: string().required("MISSING_REQUIRED_FIELD"),
  provider_id: string().required("MISSING_REQUIRED_FIELD"),
  product: string().required("MISSING_REQUIRED_FIELD"),
  name: string().required("MISSING_REQUIRED_FIELD"),
  deal_code: string().required("MISSING_REQUIRED_FIELD"),
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
  quoting: boolean().required("MISSING_REQUIRED_FIELD"),
  onboarding: boolean().required("MISSING_REQUIRED_FIELD")
})
