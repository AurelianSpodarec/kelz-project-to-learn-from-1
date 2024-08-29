import { isArray, get } from "lodash"

export const hasArrayErrors = ({ touched, errors }, name) => {
  // Do not run this comparison if the args pulled off the formik are not arrays
  if (!isArray(errors[name]) || !isArray(touched[name])) return false
  // Check if component has been touched
  const isTouched = touched[name].reduce((acc, val) => {
    const { type, number } = val
    if (type === true || number === true) {
      return true
    }
    return acc
  }, false)
  // Check to see if any errors are present
  const hasError = errors[name].reduce((acc, val) => {
    const typeErr = get(val, "type", null)
    const numErr = get(val, "number", null)
    const emailErr = get(val, "email_address", null)

    if (!!typeErr || !!numErr || !!emailErr) {
      return true
    }
    return acc
  }, false)

  return hasError && isTouched
}

export const getArrayErrors = ({ errors }, name, t) => {
  // Do not run if the args pulled off formik are not arrays
  if (!isArray(errors[name])) return []
  // Return an array of all the errors associated with the customFields component
  return errors[name].reduce((acc, val, i) => {
    const typeErr = get(val, "type", null)
    const numErr = get(val, "number", null)
    const emailErr = get(val, "email_address", null)
    const err = []
    if (typeErr) {
      err.push(`Custom field ${i + 1} - ${t(typeErr)}`)
    }
    if (numErr) {
      err.push(`Phone number ${i + 1} - ${t(numErr)}`)
    }
    if (emailErr) {
      err.push(`Email ${i + 1} - ${t(numErr)}`)
    }
    return [...acc, ...err]
  }, [])
}
