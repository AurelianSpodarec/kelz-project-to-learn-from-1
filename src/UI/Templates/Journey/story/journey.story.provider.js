import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useFormik } from "formik"
import { object } from "yup"

// Components
import { Provider } from ".."

// Helpers
import { mapDataToFormik, mapDataToYup, getNavigation, getPageData } from "../../../Helpers"
import { testData, getStoryJourneyPage, storyHandlePageClick } from "./journey.story.helpers"
import reducer from "./journey.story.reducer"
import { fakeMedicalHistoryNotesGetResponse } from "../../../Helpers/responses/journeys/pages/PMI/ClientData/MedicalHistory"

const TestJourneyProvider = ({ children, value, response }) => {
  const rawData = response || testData
  const [{ data, faqQuery, fieldModal, hasSubmitModal, validationSchema }, dispatch] =
    React.useReducer(reducer, {
      data: {
        ...rawData,
        page: { ...get(rawData, "page", {}), ...getPageData(rawData) }
      },
      faqQuery: {
        search: "",
        provider: ""
      },
      fieldModal: { open: false, modal: null },
      hasSubmitModal: false,
      validationSchema: object({})
    })

  useEffect(() => {
    if (data) dispatch({ type: "UPDATE_VALUE", key: "validationSchema", value: mapDataToYup(data) })
  }, [data])

  const formikInstance = useFormik({
    initialValues: mapDataToFormik(data),
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      const key = get(data, "page.key", null)
      dispatch({ type: "UPDATE_VALUE", key: "data", value: getStoryJourneyPage(key) })
    }
  })

  const navigation = getNavigation(data)

  return (
    <Provider
      value={{
        data,
        notes: fakeMedicalHistoryNotesGetResponse.data,
        faqQuery,
        formik: { ...formikInstance, validationSchema },
        onPageSubmit: formikInstance.handleSubmit,
        navigation,
        onClickPrevious: page => {
          const key = get(page, "name")
          dispatch({ type: "UPDATE_VALUE", key: "data", value: storyHandlePageClick(key) })
        },
        onNavClick: page => {
          const key = get(page, "name")
          dispatch({ type: "UPDATE_VALUE", key: "data", value: storyHandlePageClick(key) })
        },
        hasSubmitModal,
        setSubmitModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "hasSubmitModal", value: val }),
        fieldModal,
        setFieldModal: val => dispatch({ type: "UPDATE_VALUE", key: "fieldModal", value: val }),
        isLoading: false,
        addToFormikValidationSchema: schemaObject =>
          dispatch({
            type: "UPDATE_VALUE",
            key: "validationSchema",
            value: validationSchema.concat(schemaObject)
          }),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestJourneyProvider.defaultProps = {
  children: null,
  value: {},
  response: null
}

TestJourneyProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object,
  response: PropTypes.object
}

export default TestJourneyProvider
