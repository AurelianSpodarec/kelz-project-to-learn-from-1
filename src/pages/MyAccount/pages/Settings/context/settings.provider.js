import React, { useContext } from "react"
import PropTypes from "prop-types"
import { get, set, find } from "lodash"
import { usePatch, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { Provider } from "../../../../../UI/Templates/MyAccountSettings"

// Helpers
import { PageContext } from "../../../../../UI/Organisms"

const SelfServiceProvider = ({ children }) => {
  const { selfServiceData, selfServiceUpdate } = useContext(PageContext)
  const { addAlert } = useContext(AlertsContext)

  const simulationModeId = get(
    find(get(selfServiceData, "settings", []), ["key", "SIMULATION_MODE"]),
    "id",
    null
  )
  const simulationModeValue = get(
    find(get(selfServiceData, "settings", []), ["key", "SIMULATION_MODE"]),
    "data.value",
    false
  )

  const expirationEmailsId = get(
    find(get(selfServiceData, "settings", []), ["key", "RECEIVE_PASSWORD_EXPIRY_EMAIL"]),
    "id",
    false
  )
  const expirationEmailsValue = get(
    find(get(selfServiceData, "settings", []), ["key", "RECEIVE_PASSWORD_EXPIRY_EMAIL"]),
    "data.value",
    false
  )

  // Update settings
  const [updateSetting, { loading: updateSettingLoading, error: updateSettingError }] = usePatch({
    endpoint: "/users/:slug/settings/:settingID",
    onCompleted: res => {
      const newData = selfServiceData
      set(
        find(get(newData, "settings", []), ["key", get(res, "data.key", {})]),
        "data.value",
        get(res, "data.data.value", false)
      )
      selfServiceUpdate({ ...newData })
      addAlert({
        type: "success",
        message: "Your settings have been successfully updated",
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        simulationModeValue,
        expirationEmailsValue,
        updateSettingLoading,
        onUpdateSetting: setting => {
          updateSetting({
            params: {
              slug: get(selfServiceData, "slug", ""),
              settingID: setting === "simulation" ? simulationModeId : expirationEmailsId
            },
            body: {
              data: {
                value: setting === "simulation" ? !simulationModeValue : !expirationEmailsValue
              }
            }
          })
        }
      }}
    >
      {children}
      <ApiError error={updateSettingError} />
    </Provider>
  )
}

SelfServiceProvider.defaultProps = {
  children: null
}

SelfServiceProvider.propTypes = {
  children: PropTypes.any
}

export default SelfServiceProvider
