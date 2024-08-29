import { chunk, isString } from "lodash"

export const defaultAddress = {
  branch: "",
  bank: "",
  line_one: "",
  line_two: "",
  city: "",
  county: "",
  postcode: "",
  sortcode: ""
}

export const formatAsSortcode = str => {
  if (!isString(str)) return str
  // Strip all characters except numerical digits
  const value = str.replace(/\D/g, "")

  // Chunk the value into two-digit strings
  const fragments = chunk(value, 2)

  // Join with a hyphen and return
  return fragments.map(arr => arr.join("")).join("-")
}
