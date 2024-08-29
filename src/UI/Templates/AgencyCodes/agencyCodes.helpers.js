import { get } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"
import { getName } from "../../Helpers"

export const getIconDetails = (status, isInPanel = false) => {
  switch (status) {
    case "ACCEPTED":
    case "ACTIVE": {
      const panelIconProps = isInPanel
        ? {
            icon: "check",
            iconBackgroundColour: get(colours, "alerts.green", "green"),
            iconColour: get(colours, "white", "white")
          }
        : {}
      return {
        icon: "check-circle",
        colour: get(colours, "alerts.green", "green"),
        ...panelIconProps
      }
    }
    case "DECLINED":
    case "SUSPENDED": {
      const panelIconProps = isInPanel
        ? {
            icon: "close",
            iconColour: get(colours, "white", "white"),
            iconBackgroundColour: get(colours, "alerts.red", "red")
          }
        : {}
      return {
        icon: "close-circle",
        colour: get(colours, "alerts.red", "red"),
        ...panelIconProps
      }
    }
    case "PENDING": {
      const panelIconProps = isInPanel
        ? {
            icon: "information-outline",
            iconBackgroundColour: get(colours, "alerts.red", "red"),
            iconColour: get(colours, "alerts.orange", "orange")
          }
        : {}
      return {
        icon: "information",
        colour: get(colours, "alerts.orange", "orange"),
        ...panelIconProps
      }
    }
    default:
      return {}
  }
}

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
 * A simple function which pluralises the noun "User" if there is more than one
 * @param {*} data
 * @returns
 */
export const getUserAccess = data => {
  const count = get(data, "shared_with_count")
  if (count === 1) {
    return `${count} User`
  }
  return `${count} Users`
}

/**
 * A function which formats organisations in a way that can be interpreted at Events in the Timeline, for sharing
 * @param {*} param0
 * @returns
 */
export const formatOrganisationsAsEvents = ({ organisations = [] }) =>
  organisations.map(org => {
    const { id, name: content, shared_at: date } = org
    return {
      id,
      content,
      date
    }
  })

/**
 * A function which formats users in a way that can be interpreted at Events in the Timeline, for sharing
 * @param {*} param0
 * @returns
 */
export const formatUsersAsEvents = ({ users = [] }) =>
  users.map(org => {
    const { id, shared_at: date } = org
    return {
      id,
      content: getName({ data: org }),
      date
    }
  })
