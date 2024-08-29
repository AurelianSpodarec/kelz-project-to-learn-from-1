import { object, number, boolean, array } from "yup"

/**
 * validationSchema for the addOrgsFormik instance
 */
export const addOrgsModel = object({
  organisation_id: number().nullable()
})

/**
 * validationSchema for the shareAgencyCodeFormik instance
 */
export const shareAgencyCodeModel = object({
  share_to_all: boolean().required("MISSING_REQUIRED_FIELD"),
  share_with: array().nullable()
})
