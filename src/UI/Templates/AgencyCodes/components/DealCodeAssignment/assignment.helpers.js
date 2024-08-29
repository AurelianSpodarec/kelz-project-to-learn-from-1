import { object, string } from "yup"

/**
 * Dynamically set the text of the header in the ConfirmationSegment
 * @param {*} type
 * @returns
 */
export const getConfirmationHeader = type => {
  switch (type) {
    case "suspend":
      return "Confirm suspension"
    case "reinstate":
      return "Confirm reinstatement"
    case "unassign":
      return "Confirm unassignment"
    default:
      return "Are you sure?"
  }
}

/**
 * Dynamically set the text of the subheader in the ConfirmationSegment
 * @param {*} type
 * @returns
 */
export const getConfirmationSubheader = type => {
  switch (type) {
    case "suspend":
      return "Are you sure you want to suspend this deal code?"
    case "reinstate":
      return "Are you sure you want to reinstate this deal code?"
    case "unassign":
      return "Are you sure you want to unassign this deal code?"
    default:
      return ""
  }
}

/**
 * validationSchema for the assignDealCodeFormik instance
 */
export const assignDealCodeModel = object({
  deal_code_slug: string().required("MISSING_REQUIRED_FIELD").nullable()
})
