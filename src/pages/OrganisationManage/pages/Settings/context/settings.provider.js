import React, { useReducer, useContext } from "react"
import { useLocation } from "react-router-dom"
import queryString from "query-string"
import PropTypes from "prop-types"
import { get, isEmpty, omit } from "lodash"
import { useFormik } from "formik"
import { string, object } from "yup"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useGet, usePost, usePatch, ApiError } from "@4cplatform/elements/Api"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { Provider } from "../../../../../UI/Templates/OrganisationSettings"
import { OrganisationManageContext } from "../../../context/manage.context"
import reducer from "./settings.reducer"

const OrganisationSettingsProvider = ({ children }) => {
  const t = useTranslations()
  const { addAlert } = useContext(AlertsContext)
  const { organisation } = useContext(OrganisationManageContext)
  const location = useLocation()
  const qs = queryString.parse(location.search)

  // State
  const [
    {
      salesPreferences,
      journeySettings,
      // quickQuotesDefaults,
      quickQuoteSettings
    },
    dispatch
  ] = useReducer(reducer, {
    salesPreferences: {},
    journeySettings: {},
    // quickQuotesDefaults: {},
    quickQuoteSettings: {}
  })

  // Sales preferences query
  const {
    loading: salesLoading,
    error: salesError,
    refetch: salesRefetch
  } = useGet({
    endpoint: "/organisations/:slug/sales-preferences",
    params: {
      slug: get(organisation, "slug", "")
    },
    skip: isEmpty(organisation) || get(qs, "settings", "") !== "sales_preferences",
    onCompleted: res =>
      dispatch({ type: "UPDATE_VALUE", key: "salesPreferences", value: get(res, "data", {}) }),
    onError: () => {
      addAlert({
        message: t("SALES_SETTINGS_INDEX_ERROR"),
        type: "error"
      })
    }
  })

  // Update sales preferences mutation
  const [updateSalesPreferences, { loading: updateSalesLoading, error: updateSalesError }] =
    usePatch({
      endpoint: "/organisations/:slug/sales-preferences",
      params: {
        slug: get(organisation, "slug", "")
      },
      onCompleted: res =>
        dispatch({ type: "UPDATE_VALUE", key: "salesPreferences", value: get(res, "data", {}) }),
      onError: () => {
        addAlert({
          type: "error",
          message: t("SALES_SETTINGS_UPDATE_ERROR"),
          dismissible: true,
          timeout: 5
        })
      }
    })

  // Journey settings query
  const {
    loading: journeyLoading,
    error: journeyError,
    refetch: journeyRefetch
  } = useGet({
    endpoint: "/organisations/:slug/journey-settings",
    params: {
      slug: get(organisation, "slug", "")
    },
    skip: isEmpty(organisation) || get(qs, "settings", "") !== "client_journey",
    onCompleted: res =>
      dispatch({ type: "UPDATE_VALUE", key: "journeySettings", value: get(res, "data", {}) }),
    onError: () => {
      addAlert({
        message: t("JOURNEY_SETTINGS_INDEX_ERROR"),
        type: "error"
      })
    }
  })

  // Update journey settings mutation
  const [updateJourneySettings, { loading: updateJourneyLoading, error: updateJourneyError }] =
    usePatch({
      endpoint: "/organisations/:slug/journey-settings",
      params: {
        slug: get(organisation, "slug", "")
      },
      onCompleted: res =>
        dispatch({ type: "UPDATE_VALUE", key: "journeySettings", value: get(res, "data", {}) }),
      onError: () => {
        addAlert({
          type: "error",
          message: t("JOURNEY_SETTINGS_UPDATE_ERROR"),
          dismissible: true,
          timeout: 5
        })
      }
    })

  // Revert consent text mutation
  const [onRevertConsent, { loading: revertConsentLoading, error: revertConsentError }] = usePost({
    endpoint: "/organisations/:slug/revert-consent-text",
    params: {
      slug: get(organisation, "slug", "")
    },
    onCompleted: res =>
      dispatch({ type: "UPDATE_VALUE", key: "journeySettings", value: get(res, "data", {}) }),
    onError: () => {
      addAlert({
        type: "error",
        message: t("CONSENT_REVERT_UPDATE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Revert exclusion text mutation
  const [onRevertExclusion, { loading: revertExclusionLoading, error: revertExclusionError }] =
    usePost({
      endpoint: "/organisations/:slug/revert-exclusion-text",
      params: {
        slug: get(organisation, "slug", "")
      },
      onCompleted: res =>
        dispatch({ type: "UPDATE_VALUE", key: "journeySettings", value: get(res, "data", {}) }),
      onError: () => {
        addAlert({
          type: "error",
          message: t("EXCLUSION_REVERT_UPDATE_ERROR"),
          dismissible: true,
          timeout: 5
        })
      }
    })

  // Quick quote settings query
  const {
    loading: quickQuoteLoading,
    error: quickQuoteError,
    refetch: quickQuoteRefetch
  } = useGet({
    endpoint: "/organisations/:slug/quick-quote-options",
    params: {
      slug: get(organisation, "slug", "")
    },
    skip: isEmpty(organisation) || get(qs, "settings", "") !== "quick_quote",
    onCompleted: res =>
      dispatch({ type: "UPDATE_VALUE", key: "quickQuoteSettings", value: get(res, "data", {}) }),
    onError: () => {
      addAlert({
        message: t("QQ_SETTINGS_INDEX_ERROR"),
        type: "error"
      })
    }
  })

  // Update journey settings mutation
  const [
    updateQuickQuoteSettings,
    { loading: updateQuickQuoteLoading, error: updateQuickQuoteError }
  ] = usePatch({
    endpoint: "/organisations/:slug/quick-quote-options",
    params: {
      slug: get(organisation, "slug", "")
    },
    onCompleted: res =>
      dispatch({ type: "UPDATE_VALUE", key: "quickQuoteSettings", value: get(res, "data", {}) }),
    onError: () => {
      addAlert({
        type: "error",
        message: t("QQ_SETTINGS_UPDATE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  const formFields = omit(quickQuoteSettings, ["id", "available_options"])

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
    onSubmit: body => updateQuickQuoteSettings({ body })
  })

  const formik = { ...quickQuoteSettingsFormik, validationSchema }
  const { handleSubmit } = formik

  return (
    <Provider
      value={{
        salesData: salesPreferences,
        salesLoading,
        salesRefetch,
        onSalesUpdate: body => updateSalesPreferences({ body }),
        updateSalesLoading,
        journeyData: journeySettings,
        journeyLoading,
        journeyRefetch,
        onJourneyUpdate: body => updateJourneySettings({ body }),
        updateJourneyLoading,
        onRevertConsent,
        revertConsentLoading,
        onRevertExclusion,
        revertExclusionLoading,
        quickQuoteData: quickQuoteSettings,
        quickQuoteLoading,
        quickQuoteRefetch,
        updateQuickQuoteLoading,
        formik,
        handleSubmit
      }}
    >
      {children}
      <ApiError
        error={
          salesError ||
          updateSalesError ||
          journeyError ||
          updateJourneyError ||
          revertConsentError ||
          revertExclusionError ||
          quickQuoteError ||
          updateQuickQuoteError
        }
      />
    </Provider>
  )
}

OrganisationSettingsProvider.propTypes = {
  children: PropTypes.any
}

export default OrganisationSettingsProvider
