import React from "react"
import { get, find, isObject, isEmpty } from "lodash"

/**
 * This is a helper function that returns valid <option> elements for use with a QuerySelect hitting /product-types
 * @param {*} data
 * @returns
 */
export const renderProductTypeOptions = (data = {}) => {
  if (!isObject(data)) return []
  const keys = Object.keys(data)

  return keys
    .map(key => ({ value: key, name: get(data, `[${key}].name`) }))
    .map(item => (
      <option value={item.value} key={item.value}>
        {item.name}
      </option>
    ))
}

export const renderProviderOptions = (data = [], isIdBased = false) =>
  data.map(provider => {
    const key = isIdBased ? "id" : "name"
    return (
      <option
        value={isIdBased ? get(provider, key) : get(provider, "name")}
        key={get(provider, key)}
      >
        {get(provider, "name")}
      </option>
    )
  })

export const renderProviderProductOptions = (data = [], formik, dependantField, isIdBased, t) => {
  const products = get(
    find(data, provider => {
      const key = isIdBased ? "id" : "name"
      return (
        get(provider, key) ===
        (isIdBased
          ? parseInt(get(formik, `values.${dependantField}`))
          : get(formik, `values.${dependantField}`))
      )
    }),
    "products",
    {}
  )
  const parsedProducts = !isEmpty(products)
    ? Object.keys(products).map(key => ({ key, name: t(products[key]) }))
    : []

  return parsedProducts.map(product => (
    <option value={get(product, "key")} key={get(product, "key")}>
      {get(product, "name")}
    </option>
  ))
}

/**
 * A helper function for validating related groups of booleans.
 * This returns false if all of the values specified are false.
 * If even one of them is true, it will return true.
 * @param {*} values all form values
 * @param {*} keys the keys to be evaluated
 * @returns boolean value
 */
export const requiredIfFalse = (values = {}, keys = []) => {
  if (!isObject(values) || !Array.isArray(keys)) return false

  return keys.reduce((acc, val) => {
    if (values[val]) {
      return true
    }
    return acc
  }, false)
}
