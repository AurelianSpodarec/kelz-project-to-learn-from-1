import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useTranslations } from "@4cplatform/elements/Translations"
import { useGet, useDelete, usePatch, usePost, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"

// Components
import { Provider } from "../../../UI/Templates/SystemSettings"

// Helpers
import reducer from "./settings.reducer"

const SystemSettingsProvider = ({ children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const t = useTranslations()

  // State
  const [
    { maintenance, dueDiligenceEdit, dueDiligenceDelete, dueDiligences, data, createOpen },
    dispatch
  ] = React.useReducer(reducer, {
    maintenance: false,
    dueDiligenceEdit: { isOpen: false, dueDiligence: null },
    dueDiligenceDelete: { isOpen: false, dueDiligence: null },
    dueDiligences: [],
    data: null,
    createOpen: false
  })

  // Index system settings
  const {
    error: settingsError,
    loading: settingsLoading,
    refetch: refetchSettings
  } = useGet({
    endpoint: "/system-settings",
    onCompleted: res => {
      const systemSettings = get(res, "data")
      dispatch({ type: "UPDATE_VALUE", key: "data", value: systemSettings })
    }
  })

  // Enable maintenance mode
  const [enable, { loading: enableLoading, error: enableError }] = usePatch({
    endpoint: "/maintenance-mode/enable",
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("MAINTENANCE_MODE_ENABLE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "maintenance", value: false })
      refetchSettings()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("MAINTENANCE_MODE_ENABLE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Disable maintenance mode
  const [disable, { loading: disableLoading, error: disableError }] = usePatch({
    endpoint: "/maintenance-mode/disable",
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("MAINTENANCE_MODE_DISABLE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "maintenance", value: false })
      refetchSettings()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("MAINTENANCE_MODE_DISABLE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Index due diligences
  const {
    error: dueDiligencesError,
    refetch: dueDiligencesRefetch,
    loading: dueDiligencesLoading
  } = useGet({
    endpoint: "/due-diligences",
    onCompleted: res => {
      const ddData = get(res, "data", [])
      dispatch({ type: "UPDATE_VALUE", key: "dueDiligences", value: ddData })
    }
  })

  // Create due diligence
  const [create, { error: createDueDiligenceError }] = usePost({
    endpoint: "/due-diligences",
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("CREATE_DUE_DILIGENCE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "createOpen", value: false })
      dueDiligencesRefetch()
    }
  })

  // Update existing due diligence
  const [update, { error: updateDueDiligenceError }] = usePatch({
    endpoint: "/due-diligences/:id",
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("UPDATE_DUE_DILIGENCE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      dueDiligencesRefetch()
      dispatch({
        type: "UPDATE_VALUE",
        key: "dueDiligenceEdit",
        value: { isOpen: false, dueDiligence: null }
      })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("UPDATE_DUE_DILIGENCE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Delete due diligence
  const [remove, { error: deleteDueDiligenceError, loading: deleteLoading }] = useDelete({
    endpoint: "/due-diligences/:id",
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("DELETE_DUE_DILIGENCE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      dispatch({
        type: "UPDATE_VALUE",
        key: "dueDiligenceDelete",
        value: { isOpen: false, dueDiligence: null }
      })
      dueDiligencesRefetch()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DELETE_DUE_DILIGENCE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        data,
        settingsLoading,
        maintenance,
        setMaintenance: val => dispatch({ type: "UPDATE_VALUE", key: "maintenance", value: val }),
        onClickMaintenanceMode: () => {
          const isEnabled = get(data, "maintenance_mode")
          if (isEnabled) {
            disable()
          } else {
            enable()
          }
        },
        maintenanceLoading: enableLoading || disableLoading,
        dueDiligences,
        dueDiligenceDelete,
        setDueDiligenceDelete: val =>
          dispatch({ type: "UPDATE_VALUE", key: "dueDiligenceDelete", value: val }),
        dueDiligenceEdit,
        setDueDiligenceEdit: val =>
          dispatch({ type: "UPDATE_VALUE", key: "dueDiligenceEdit", value: val }),
        onDueDiligenceDelete: () => {
          const { dueDiligence } = dueDiligenceDelete
          remove({ params: { id: dueDiligence } })
        },
        onDueDiligenceSubmit: (values = {}) => {
          const { dueDiligence } = dueDiligenceEdit
          const key = Object.keys(values)[0]
          const body = {
            title: get(values, `${key}.title`),
            description: get(values, `${key}.content`)
          }
          update({
            params: {
              id: dueDiligence
            },
            body
          })
        },
        onAddDueDiligence: values => {
          const body = {
            title: get(values, "add_due_diligence.title"),
            description: get(values, "add_due_diligence.content")
          }
          create({ body })
        },
        createOpen,
        setCreateOpen: val => dispatch({ type: "UPDATE_VALUE", key: "createOpen", value: val }),
        deleteLoading,
        dueDiligencesLoading
      }}
    >
      {children}
      <ApiError
        error={
          settingsError ||
          dueDiligencesError ||
          enableError ||
          disableError ||
          updateDueDiligenceError ||
          createDueDiligenceError ||
          deleteDueDiligenceError
        }
      />
    </Provider>
  )
}

SystemSettingsProvider.propTypes = {
  children: PropTypes.any
}

export default SystemSettingsProvider
