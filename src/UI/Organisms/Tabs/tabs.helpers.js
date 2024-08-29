import { get } from "lodash"
import { formatLabelForTestID } from "@4cplatform/elements/Helpers"

/**
 * This function evaluates the props passed in and returns the 'appearance' prop for Link components in the Tab
 * For the default Tabs component, anchor tags are used and the active/inactive appearance props are irrelevant.
 * @param {type, isActive, activeAppearance, inactiveAppearance} param0 The type prop on the Tabs component, the isActive prop on the Tab, and the active and inactive appearances for Buttons
 */
export const getLinkAppearance = ({ type, isActive, activeAppearance, inactiveAppearance }) => {
  if (type === "buttons") {
    return isActive ? activeAppearance : inactiveAppearance
  }
  return isActive ? "active" : "inactive"
}

export const getDefaultTab = ({ defaultIndex, hasQueryControls, values, name, children }) => {
  const defaultValue = formatLabelForTestID(get(children, `[${defaultIndex}].props.header`))
  if (!hasQueryControls) {
    return defaultValue
  }
  return get(values, name, defaultValue)
}
