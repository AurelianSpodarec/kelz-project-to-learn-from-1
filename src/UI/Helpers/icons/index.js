import { get } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"

export const getTwoFactorAuthIcon = (type, complete) => {
  switch (type) {
    case "TWO_FA_GOOGLE_AUTH":
      return {
        icon: "google",
        iconColour: get(colours, complete ? "green" : "lightGrey", "black")
      }
    case "TWO_FA_EMAIL":
      return {
        icon: "email-outline",
        iconColour: get(colours, complete ? "green" : "lightGrey", "black")
      }
    case "TWO_FA_SMS":
      return {
        icon: "message-text-outline",
        iconColour: get(colours, complete ? "green" : "lightGrey", "black")
      }
    case "TWO_FA_NONE":
    case null:
    default:
      return { icon: "shield-off-outline", iconColour: get(colours, "red", "red") }
  }
}
