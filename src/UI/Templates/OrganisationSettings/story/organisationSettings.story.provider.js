/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get, omit } from "lodash"
import { useFormik } from "formik"
import { string, object } from "yup"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./organisationSettings.story.reducer"
import {
  fakeOrganisationSalesSettingsGetResponse,
  fakeOrganisationJourneySettingsGetResponse,
  fakeOrganisationQQSettingsDefaultsGetResponse,
  fakeOrganisationQQSettingsGetResponse
} from "../../../Helpers"

const TestOrganisationSettingsProvider = ({ children, value: providerValue }) => {
  const [{ salesData, journeyData, quickQuotesDefaults, quickQuoteData }, dispatch] =
    React.useReducer(reducer, {
      salesData: get(fakeOrganisationSalesSettingsGetResponse, "data", {}),
      journeyData: get(fakeOrganisationJourneySettingsGetResponse, "data", {}),
      quickQuotesDefaults: get(fakeOrganisationQQSettingsDefaultsGetResponse, "data", {}),
      quickQuoteData: get(fakeOrganisationQQSettingsGetResponse, "data", {})
    })

  const formFields = omit(quickQuoteData, ["id", "available_options"])

  const validationSchema = (() => {
    const schema = {}
    Object.keys(formFields).forEach(
      key => (schema[key] = string().required("MISSING_REQUIRED_FIELD"))
    )
    return object(schema)
  })()

  const quickQuoteSettingsFormik = useFormik({
    enableReinitialize: true,
    initialValues: formFields,
    validationSchema,
    onSubmit: () => {}
  })

  const formik = { ...quickQuoteSettingsFormik, validationSchema }
  const { handleSubmit } = formik

  return (
    <Provider
      value={{
        salesData,
        salesRefetch: () => console.log("sales refetch"),
        salesLoading: false,
        onSalesUpdate: value => dispatch({ type: "UPDATE_VALUE", key: "salesData", value }),
        journeyData,
        journeyRefetch: () => console.log("journey refetch"),
        journeyLoading: false,
        onJourneyUpdate: value => dispatch({ type: "UPDATE_VALUE", key: "journeyData", value }),
        onRevertConsent: () => console.log("revert consent"),
        revertConsentLoading: false,
        onRevertExclusion: () => console.log("revert exclusion"),
        revertExclusionLoading: false,
        quickQuotesDefaults,
        quickQuoteData,
        formik,
        handleSubmit,
        ...providerValue
      }}
    >
      {children}
    </Provider>
  )
}

TestOrganisationSettingsProvider.defaultProps = {
  children: null,
  value: {}
}

TestOrganisationSettingsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}
export default TestOrganisationSettingsProvider
