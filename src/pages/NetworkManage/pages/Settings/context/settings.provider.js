import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useGet, usePatch, ApiError } from "@4cplatform/elements/Api"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { Provider } from "../../../../../UI/Templates/NetworkSettings"
import { NetworkManageContext } from "../../../context/manage.context"
import reducer from "./settings.reducer"

const NetworkSettingsProvider = ({ children }) => {
  const t = useTranslations()
  const { addAlert } = React.useContext(AlertsContext)
  const { network } = React.useContext(NetworkManageContext)

  // State
  const [
    { consentText, exclusionText, editConsent, editExclusion, deleteConsent, deleteExclusion },
    dispatch
  ] = React.useReducer(reducer, {
    consentText: "",
    exclusionText: "",
    editConsent: false,
    editExclusion: false,
    deleteConsent: false,
    deleteExclusion: false
  })

  // Get settings mutation
  const { loading: getLoading, error: getError } = useGet({
    endpoint: "/networks/:slug/settings",
    params: {
      slug: get(network, "slug", "")
    },
    onCompleted: res => {
      dispatch({
        type: "FETCH_COMPLETE",
        consentText: get(res, "data.consent_text", ""),
        exclusionText: get(res, "data.exclusion_text")
      })
    }
  })

  // Update settings mutation
  const [updateSettings, { loading: updateLoading, error: updateError }] = usePatch({
    endpoint: "/networks/:slug/settings",
    params: {
      slug: get(network, "slug", "")
    },
    onCompleted: res => {
      dispatch({
        type: "UPDATE_COMPLETE",
        consentText: get(res, "data.consent_text", ""),
        exclusionText: get(res, "data.exclusion_text", "")
      })
      addAlert({
        message: t("NETWORK_SETTING_UPDATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("NETWORK_SETTING_UPDATE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        getLoading,
        updateLoading,
        consentText,
        exclusionText,
        editConsent,
        setEditConsent: val => dispatch({ type: "UPDATE_VALUE", key: "editConsent", value: val }),
        editExclusion,
        setEditExclusion: val =>
          dispatch({ type: "UPDATE_VALUE", key: "editExclusion", value: val }),
        deleteConsent,
        setDeleteConsent: val => {
          dispatch({ type: "UPDATE_VALUE", key: "deleteConsent", value: val })
        },
        deleteExclusion,
        setDeleteExclusion: val => {
          dispatch({ type: "UPDATE_VALUE", key: "deleteExclusion", value: val })
        },
        onSubmitConsentText: ({ consent_text: val }) => {
          const body = {
            exclusion_text: exclusionText,
            consent_text: val
          }
          updateSettings({ body })
        },
        onSubmitExclusionText: ({ exclusion_text: val }) => {
          const body = {
            exclusion_text: val,
            consent_text: consentText
          }
          updateSettings({ body })
        },
        onDeleteConsentText: () => {
          const body = {
            exclusion_text: exclusionText,
            consent_text: null
          }
          updateSettings({ body })
        },
        onDeleteExclusionText: () => {
          const body = {
            consent_text: consentText,
            exclusion_text: null
          }
          updateSettings({ body })
        }
      }}
    >
      {children}
      <ApiError error={getError || updateError} />
    </Provider>
  )
}

NetworkSettingsProvider.propTypes = {
  children: PropTypes.any
}

export default NetworkSettingsProvider
