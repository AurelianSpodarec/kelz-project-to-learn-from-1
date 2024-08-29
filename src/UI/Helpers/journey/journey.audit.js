import { get, isEmpty, find, isPlainObject, isString, isNumber, isBoolean } from "lodash"

/**
 * This function constructs the page's audit log.
 *
 * @param {*} data
 *
 * @returns
 */
export const getPageAudit = (data, values) => {
  // Get page sections
  const sections = get(data, "page.sections", [])
  // Responses array
  const responses = []

  // Iterate over the sections
  sections.forEach(section => {
    // Get the components in each section, skipping those with skipDataMap
    const components = get(section, "components", []).filter(
      component => !get(component, "skipDataMap")
    )
    // Iterate over the components
    components.forEach(component => {
      const fieldKey = get(component, "key")
      const fieldValue = get(values, fieldKey)

      // Function that allows us to
      const evaluateFieldValue = value => {
        // The processed value
        let val

        // Check if the component has options
        const fieldOptions = get(component, "componentProps.options", [])
        const hasOptions = !isEmpty(fieldOptions)

        // If it's string or number and doesn't have options array, give it the value.
        if ((isString(value) || isNumber(value)) && !hasOptions) {
          val = value
        }

        // If it's boolean and doesn't have options array, default to Yes and No.
        if (isBoolean(value) && !hasOptions) {
          val = value ? "Yes" : "No"
        }

        // If it's boolean, string or number and has the options array, get the label of the option.
        if ((isBoolean(value) || isString(value) || isNumber(value)) && hasOptions) {
          val = get(find(fieldOptions, { value }), "label")
        }

        // If it's an array
        if (Array.isArray(value)) {
          // Make the value an array
          val = []
          // Iterate over the array
          value.forEach((entry, index) => {
            // Push into the value array
            val.push({
              // The label as the name
              name: `${get(component, "label")} Entry ${index + 1}`,
              // Recursion to get the readable value
              value: evaluateFieldValue(entry)
            })
          })
        }

        // If it's a plain object
        if (isPlainObject(value)) {
          // Make the value an array
          val = []
          // Get the labels
          const labels = get(component, "labels", {})
          // Iterate over each label key
          Object.keys(labels).forEach(key => {
            // Push into the value array
            val.push({
              // The label as the name
              name: get(labels, key),
              // Recursion to get the readable value
              value: evaluateFieldValue(get(value, key))
            })
          })
        }

        // Return the processed value
        return val
      }

      // Push name and value keyed objects for each component in each section.
      responses.push({
        name: get(component, "label"),
        value: evaluateFieldValue(fieldValue)
      })
    })
  })

  // Return the page and responses keyed object to be added to the body.
  return {
    page: get(data, "page.title"),
    responses
  }
}
