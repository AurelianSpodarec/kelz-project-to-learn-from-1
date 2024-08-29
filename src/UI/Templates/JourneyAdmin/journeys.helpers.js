import { get } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"
/**
 * This takes the journeys's status and returns an appropriate icon and its properties.
 * @param status A string representing the quote's status
 */

export const getIconDetails = status => {
  switch (status) {
    case "IN_PROGRESS":
      return {
        icon: "progress-clock",
        iconColour: get(colours, "alerts.orange", "orange")
      }
    case "QUOTED":
      return {
        icon: "currency-gbp",
        iconColour: get(colours, "white", "white")
      }
    case "COMPLETE":
      return {
        icon: "check-circle",
        iconColour: get(colours, "alerts.green", "green")
      }
    default:
      return {}
  }
}
