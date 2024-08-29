import { get, set, isEmpty, isNull, isUndefined, findIndex } from "lodash"
import { object, mixed, array } from "yup"
import moment from "moment"

// Helpers
import { getPageData } from "./journey.config"

/**
 * This function builds an initialValues object for use in a formik instance.
 *
 * @param {*} data
 *
 * @returns
 */
export const mapDataToFormik = data => {
  if (isEmpty(data) || isNull(data) || isUndefined(data)) return {}

  const sections = get(data, "page.sections", [])

  const initialValues = {}

  // Iterate over the sections and store each component present in the initial values
  sections.forEach(section => {
    if (
      isEmpty(section) ||
      isNull(section) ||
      isUndefined(section) ||
      get(section, "skipDataMap", false)
    )
      return

    const components = get(section, "components", [])
    // Check each key for initial values
    components.forEach(component => {
      // Skip data mapping for presentational components
      if (
        isEmpty(component) ||
        isNull(component) ||
        isUndefined(component) ||
        get(component, "skipDataMap", false)
      )
        return

      const validationSchema = get(component, "validationSchema")

      // If component is Address, then remove unwanted properties from object by mapping the validationSchema
      if (get(component, "key") === "address" && validationSchema) {
        const addressInitialValues = get(component, "initialValue", null)
        const mappedAddressInitialValues = {}

        Object.keys(validationSchema.getDefault()).forEach(key => {
          mappedAddressInitialValues[`${key}`] = get(addressInitialValues, key, "")
        })

        set(initialValues, get(component, "key"), mappedAddressInitialValues)
      } else {
        set(
          initialValues,
          get(component, "key"),
          get(component, "initialValue", validationSchema.getDefault())
        )
      }
    })
  })

  return initialValues
}

/**
 * This function maps all the page components onto a valid yup validationSchema for use in the formik instance
 *
 * @param {*} data
 *
 * @returns a valid validationSchema for use in the journey page's formik
 */
export const mapDataToYup = data => {
  if (isEmpty(data) || isNull(data) || isUndefined(data)) return object({})

  const sections = get(data, "page.sections", [])

  let components = []

  sections.forEach(section => {
    if (
      isEmpty(section) ||
      isNull(section) ||
      isUndefined(section) ||
      get(section, "skipDataMap", false)
    )
      return

    components = [
      ...components,
      ...get(section, "components", []).filter(component => !get(component, "skipDataMap", false))
    ]
  })

  const validationSchema = components.reduce((schema, component) => {
    if (isEmpty(component) || isNull(component) || isUndefined(component)) return object({})

    const fieldKey = get(component, "key")
    const fieldSchema = get(component, "validationSchema", mixed())
    const isObject = fieldKey.includes(".")

    if (!isObject) {
      return schema.concat(object({ [fieldKey]: fieldSchema }))
    }

    const reversePath = fieldKey.split(".").reverse()
    const currNestedObject = reversePath.slice(1).reduce(
      (yupObj, path) => {
        if (!Number.isNaN(Number(path))) {
          return { array: array(object(yupObj)) }
        }
        if (yupObj.array) {
          return { [path]: yupObj.array }
        }
        return { [path]: object(yupObj) }
      },
      { [reversePath[0]]: fieldSchema }
    )

    const newSchema = object(currNestedObject)
    return schema.concat(newSchema)
  }, object({}))

  return validationSchema
}

/**
 * This function creates a useful pages array from the journey object, for use in the nav menu
 *
 * @param {*} data
 *
 * @returns an array containing 3 arrays for each nav stage
 */
export const getNavigation = data => {
  if (isEmpty(data) || isNull(data) || isUndefined(data)) return [[], [], []]

  const current = get(data, "page")
  const pages = { ...get(data, "journey.meta.pages", {}) }
  let keys = Object.keys(pages)
  const getStage = stage => {
    switch (stage) {
      case "FACT_FIND":
        return 0
      case "QUOTE":
        return 1
      case "POLICY":
        return 2
      default:
        return null
    }
  }

  // If keys doesn't already include the current page, apply the current page
  if (!isEmpty(current) && !keys.includes(get(current, "key"))) {
    const pageData = getPageData({ page: current })
    keys = [...keys, get(current, "key")]
    pages[get(current, "key")] = {
      ...current,
      title: get(pageData, "navTitle", get(pageData, "title")),
      key: get(current, "key")
    }
  }

  return keys.reduce(
    (navigation, key) => {
      const pageData = getPageData({ page: { key } })
      const page = {
        ...get(pages, key, {}),
        title: get(pageData, "navTitle", get(pageData, "title")),
        key
      }

      const stage = getStage(page.stage)

      navigation[stage] = [...navigation[stage], page]
      return navigation
    },
    [[], [], []]
  )
}
/**
 * This function renders the form component attaching the Formik instance and multiple props from the page config.
 *
 * @param component The component that gets rendered
 * @param formik The Formik instance
 * @param isLocked Boolean that indicates if the Journey is locked or not
 *
 * @returns
 */
export const renderSectionComponent = (component, formik, isLocked, apiErrors) => {
  if (isEmpty(component) || isNull(component) || isUndefined(component)) return

  const key = get(component, "key", "journey_field")
  const label = get(component, "label", "Journey field label")

  const Component = get(component, "component", null)

  // Do not apply uneeded props for presentational components
  let formProps = {}
  if (!get(component, "skipDataMap", false)) {
    formProps = {
      name: key,
      label,
      formik,
      apiErrors,
      isDisabled: isLocked || get(component, "isDisabled", false)
    }
  }

  const componentProps = get(component, "componentProps", {})
  const children = get(component, "children", [])

  return !isEmpty(children) ? (
    <Component key={key} {...{ ...componentProps, children: undefined }} {...formProps}>
      {children}
    </Component>
  ) : (
    <Component key={key} {...componentProps} {...formProps} />
  )
}

/**
 * This grabs the last path parameter from the page's route - the stage - and returns it
 *
 * @param {} page
 *
 * @returns the last path parameter
 */
export const getStageParam = page => {
  const route = get(page, "route", "")
  const params = route.split("/")
  return get(params, `[${params.length - 1}]`)
}

/**
 * This returns the stage for the new page's route, for use on the Next button click handler
 *
 * @param {*} data
 *
 * @returns new stage for next page
 */
export const getNextStage = data => {
  const currentPage = get(data, "page")
  // Create an array of all stored pages and sort them
  const pageKeys = Object.keys(get(data, "journey.meta.pages", {}))
  const pages = pageKeys
    .map(key => {
      const page = get(data, `journey.meta.pages.${key}`)
      return { ...page, name: key }
    })
    .sort(page => page.order)

  const currentIndex = findIndex(pages, { name: get(currentPage, "key") })

  // If the current page doesn't exist, return the last page
  if (currentIndex < 0) {
    return getStageParam(pages[pages.length - 1])
  }

  // Don't return a new stage if this is the last page
  if (currentIndex === pages.length - 1) {
    return getStageParam(currentPage)
  }

  // Return the previous page
  return getStageParam(pages[currentIndex + 1])
}

/**
 * This returns the stage for the previous page's route, for use on the Previous button click handler
 *
 * @param {*} data
 *
 * @returns new stage for previous page
 */
export const getPreviousStage = data => {
  const currentPage = get(data, "page")
  // Create an array of all stored pages and sort them
  const pageKeys = Object.keys(get(data, "journey.meta.pages", {}))
  const pages = pageKeys
    .map(key => {
      const page = get(data, `journey.meta.pages.${key}`)
      return { ...page, name: key }
    })
    .sort(page => page.order)

  const currentIndex = findIndex(pages, { name: get(currentPage, "key") })

  // If the current page doesn't exist, return the last page
  if (currentIndex < 0) {
    return getStageParam(pages[pages.length - 1])
  }

  // Don't return a new stage if this is the first page
  if (currentIndex === 0) {
    return getStageParam(currentPage)
  }

  // Return the previous page
  return getStageParam(pages[currentIndex - 1])
}

/**
 * This chekcs if a policy start date correct and returns true or false
 *
 * @param {*} data
 *
 * @returns return true or false
 */
export const isStartDateValid = (policyStartDate = null, provider = null) => {
  if (!(policyStartDate && provider)) return
  if (
    provider.toUpperCase() === "AVIVA" &&
    ["29", "30", "31"].includes(moment(policyStartDate).date())
  ) {
    return false
  }
  return true
}
