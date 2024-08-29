import { colours } from "@4cplatform/elements/Helpers"

export const getIconColour = ({ appearance, iconColour }) => {
  if (iconColour) {
    return iconColour
  }
  return appearance === "light" ? colours.white : colours.darkBlue
}
