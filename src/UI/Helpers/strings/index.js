import { get, isEmpty } from "lodash"

/**
 * This is a helper function which generates a human-readable name from an object with typical name keys inside
 * @param {data, hasMiddle, hasTitle} param0
 * data is the object from which the name is extracted
 * hasMiddle is a boolean which controls whether or not to include the middle name, if it exists
 * hasTitle is a boolean which controls whether or not to include the title, if it exists
 */
export const getName = ({ data, hasMiddle, hasTitle, isContact }) => {
  let first = get(data, "first_name")
  let last = get(data, "last_name")
  const middle = get(data, "middle_names", "")
  const title = get(data, "title.label", "")

  if (isContact) {
    first = get(data, "contact_first_name")
    last = get(data, "contact_last_name")
  }

  let value = ""

  if (!first || !last) {
    return "-"
  }

  if (!!hasMiddle && !!middle) {
    value = `${first} ${middle} ${last}`
  } else {
    value = `${first} ${last}`
  }

  if (!!hasTitle && !!title) {
    value = `${title} ${value}`
  }

  return value
}

/**
 * This returns a string for the order_by key in API hooks
 * @param {*} sorting
 * @returns a string for use in the order_by query
 */
export const getOrderBy = (sorting = {}) => {
  if (isEmpty(sorting)) return null

  const { dataKey, direction } = sorting
  // Only sort by the final key if sorting nested properties
  const splitKey = dataKey.split(".")
  if (direction === "desc") {
    return `${splitKey[splitKey.length - 1]}_desc`
  }
  return splitKey[splitKey.length - 1]
}

/**
 * This is a helper RegEx constant for alphanumeric strings.
 */
export const alphanumericRegex = /^([a-zA-Z0-9 _-]+)$/
