import { get } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"

/**
 * This takes the policy's status and returns an appropriate icon and its properties.
 * @param type A string representing the policy's status
 */

export const getIconDetails = type => {
  switch (type) {
    case "AWAITING_TERMS":
    case "AWAITING_ACCEPTANCE":
      return {
        icon: "alert-circle",
        iconColour: get(colours, "alerts.orange", "orange")
      }
    case "ACCEPTED_UNDERWRITING_WITH_EXCLUSIONS":
      return {
        icon: "alert",
        iconColour: get(colours, "alerts.orange", "orange")
      }
    case "ACCEPTED_UNDERWRITING":
    case "ACCEPTED":
      return {
        icon: "check-circle",
        iconColour: get(colours, "alerts.green", "green")
      }
    case "DECLINED":
    case "FAILED_ONBOARDING":
    case "DECLINED_UNDERWRITING":
      return {
        icon: "close-circle",
        iconColour: get(colours, "alerts.red", "red")
      }
    default:
      return {}
  }
}
