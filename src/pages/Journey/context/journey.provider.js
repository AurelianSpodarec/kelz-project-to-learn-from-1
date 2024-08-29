import React, { useReducer, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { get } from "lodash"
import { useFormik } from "formik"
import { useHistory, useParams } from "react-router-dom"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useGet, usePost, ApiError } from "@4cplatform/elements/Api"
import { useTranslations } from "@4cplatform/elements/Translations"
import { object } from "yup"

// Components
import { Provider } from "../../../UI/Templates/Journey"

// Helpers
import reducer from "./journey.reducer"
import {
  getPageData,
  mapDataToFormik,
  mapDataToYup,
  getNavigation,
  getStageParam,
  getNextStage,
  getPreviousStage,
  getPageAudit
} from "../../../UI/Helpers"

const JourneyProvider = ({ children }) => {
  const { addAlert } = useContext(AlertsContext)

  // Router controls
  const { stage, reference } = useParams()
  const history = useHistory()

  const t = useTranslations()

  // State
  const [
    {
      data,
      canQuery,
      fieldModal,
      hasPreviousModal,
      hasSubmitModal,
      hasFaqModal,
      duration,
      faqQuery,
      faqQueryResults,
      validationSchema
    },
    dispatch
  ] = useReducer(reducer, {
    data: null,
    hasSubmitModal: false,
    hasFaqModal: false,
    hasPreviousModal: false,
    fieldModal: { open: false, modal: null },
    canQuery: true,
    duration: moment(),
    faqQuery: {},
    faqQueryResults: [],
    validationSchema: object({})
  })

  // Journey GET request
  const {
    loading: queryLoading,
    called: queryCalled,
    error: queryError
  } = useGet({
    endpoint: "/journeys/:reference/:stage",
    params: {
      reference,
      stage
    },
    onCompleted: res => {
      const newData = get(res, "data", {})
      dispatch({
        type: "FETCH_COMPLETE",
        data: {
          ...newData,
          page: { ...get(newData, "page", {}), ...getPageData(newData, t) }
        }
      })
    },
    skip: !canQuery
  })

  // Every time the location changes, reset the duration.
  useEffect(() => {
    if (queryCalled && !queryLoading)
      dispatch({ type: "UPDATE_VALUE", key: "duration", value: moment() })
  }, [queryLoading, queryCalled])

  // Journey Audit POST request
  const [submitAudit, { loading: auditLoading, error: auditError }] = usePost({
    endpoint: "/journeys/:reference/audits",
    params: {
      reference
    }
  })

  // Journey POST request
  const [submit, { loading: postLoading, error: postError }] = usePost({
    endpoint: get(data, "page.route"),
    onCompleted: res => {
      // Submit Journey Audit
      const auditBody = {
        duration: moment().diff(duration, "seconds"),
        // eslint-disable-next-line no-use-before-define
        ...getPageAudit(data, get(formikInstance, "values"))
      }
      submitAudit({ body: auditBody })

      // Update data in state
      const newData = get(res, "data", {})
      dispatch({
        type: "SUBMIT_COMPLETE",
        data: {
          ...newData,
          page: { ...get(newData, "page", {}), ...getPageData(newData, t) }
        }
      })
      // Update URL
      history.push(`/journeys/${reference}/${getStageParam(get(newData, "page"))}`)
    }
  })

  const {
    loading: faqsLoading,
    error: faqsError,
    refetch: faqsRefetch
  } = useGet({
    endpoint: "/faqs",
    skip: !hasFaqModal,
    query: {
      ...faqQuery
    },
    onCompleted: res => {
      const newData = get(res, "data", [])
      dispatch({ type: "UPDATE_VALUE", key: "faqQueryResults", value: newData })
    },
    onError: () => {
      addAlert({
        message: t("FAQS_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  useEffect(() => {
    if (data) dispatch({ type: "UPDATE_VALUE", key: "validationSchema", value: mapDataToYup(data) })
  }, [data])

  // Current page's formik instance
  const formikInstance = useFormik({
    initialValues: mapDataToFormik(data),
    validationSchema,
    enableReinitialize: true,
    onSubmit: body => submit({ body })
  })

  // Pages for nav menu
  const navigation = getNavigation(data)
  return (
    <Provider
      value={{
        data,
        formik: { ...formikInstance, validationSchema },
        onPageSubmit: formikInstance.handleSubmit,
        postError,
        navigation,
        onNavClick: page => {
          // change the params and expose the query
          history.push(`/journeys/${reference}/${getStageParam(page)}`)
          dispatch({ type: "CHANGE_PAGE" })
        },
        disablePrevious: getPreviousStage(data) === stage,
        onClickNext: () => {
          // Change the params and expose the query
          const newStage = getNextStage(data)
          if (!(newStage === stage)) {
            history.push(`/journeys/${reference}/${newStage}`)
            dispatch({ type: "CHANGE_PAGE" })
          }
        },
        onClickPrevious: () => {
          // Change the params and expose the query
          const newStage = getPreviousStage(data)
          if (!(newStage === stage)) {
            history.push(`/journeys/${reference}/${newStage}`)
            dispatch({ type: "CHANGE_PAGE" })
          }
        },
        hasSubmitModal,
        setSubmitModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "hasSubmitModal", value: val }),
        hasPreviousModal,
        setPreviousModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "hasPreviousModal", value: val }),
        fieldModal,
        setFieldModal: val => dispatch({ type: "UPDATE_VALUE", key: "fieldModal", value: val }),
        hasFaqModal,
        setFaqModal: val => {
          dispatch({ type: "UPDATE_VALUE", key: "hasFaqModal", value: val })
          if (val === true)
            dispatch({
              type: "UPDATE_VALUE",
              key: "faqQuery",
              value: {
                search: "",
                provider: ""
              }
            })
          if (val === false) {
            dispatch({ type: "UPDATE_VALUE", key: "faqQueryResults", value: [] })
            dispatch({
              type: "UPDATE_VALUE",
              key: "faqQuery",
              value: {}
            })
          }
        },
        faqQuery,
        faqQueryResults,
        faqsLoading,
        faqsRefetch,
        setFaqQuery: val => dispatch({ type: "UPDATE_VALUE", key: "faqQuery", value: val }),
        isLoading: queryLoading || postLoading,
        nextLoading: postLoading,
        auditLoading,
        addToFormikValidationSchema: schemaObject =>
          dispatch({
            type: "UPDATE_VALUE",
            key: "validationSchema",
            value: validationSchema.concat(schemaObject)
          })
      }}
    >
      {children}
      <ApiError error={queryError || postError || auditError || faqsError} />
    </Provider>
  )
}

JourneyProvider.propTypes = {
  children: PropTypes.any
}

export default JourneyProvider
