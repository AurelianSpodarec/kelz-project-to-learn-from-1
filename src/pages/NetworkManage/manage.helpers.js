import { get, isObject } from "lodash"

export const getDefaultFilter = values => {
  if (!isObject(values)) return "client_name"
  const keys = Object.keys(values)

  if (keys.includes("organisation_name")) {
    return "organisation_name"
  }
  return "client_name"
}

export const getDefaultSearch = values => {
  if (!isObject(values)) return ""
  const keys = Object.keys(values)

  if (keys.includes("organisation_name")) {
    return decodeURI(get(values, "organisation_name", ""))
  }
  return ""
}
