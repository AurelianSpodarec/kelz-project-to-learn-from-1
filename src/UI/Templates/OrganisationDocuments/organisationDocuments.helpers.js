import { get } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"

/**
 * A simple function which pluralises the noun "Organisation" if there is more than one
 * @param {*} data
 * @returns
 */
export const getOrganisationAccess = data => {
  const count = get(data, "shared_with_count")
  if (count === 1) {
    return `${count} Organisation`
  }
  return `${count} Organisations`
}

/**
 * Format versions to adhere to the structure expected by the Timeline component
 * @param {*} param0
 * @returns
 */
export const formatVersionsAsEvents = ({ versions, current, onClick }) =>
  versions.map(version => {
    const { id, version_number: num, file_name: name, created_at: date } = version
    const isCurrent = num === get(current, "version_number")
    const fileName = name.split("/").pop()

    return {
      id,
      content: `${fileName} v${num}`,
      date,
      iconColour: isCurrent ? colours.green : colours.darkBlue,
      icon: isCurrent ? "check" : "plus",
      onClick: isCurrent ? null : onClick
    }
  })
