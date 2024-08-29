import React from "react"
import { get } from "lodash"
import { Toggle } from "@4cplatform/elements/Forms"
import { H3, P } from "@4cplatform/elements/Typography"

// Helpers
import { SystemSettingsContext } from "./system.context"

// Components
import { ConfirmationModal } from "../../Molecules"

const MaintenanceMode = () => {
  const {
    data,
    onClickMaintenanceMode,
    maintenance,
    setMaintenance,
    maintenanceLoading,
    settingsLoading
  } = React.useContext(SystemSettingsContext)
  const isEnabled = get(data, "maintenance_mode")

  return (
    <>
      <H3>Maintenance Mode</H3>
      <Toggle
        isHorizontal
        name="maintenance_mode"
        label="Toggle switch for maintenance mode"
        options={[
          { order: 1, label: "Disabled", value: false },
          { order: 2, label: "Enabled", value: true }
        ]}
        value={get(data, "maintenance_mode")}
        onChange={value => {
          if (value === isEnabled) {
            return null
          }
          setMaintenance(true)
        }}
        labelWidth="40rem"
        isDisabled={settingsLoading}
      />
      {/* Maintenance mode modal */}
      {maintenance && (
        <ConfirmationModal
          confirmAppearance={isEnabled ? "error" : "success"}
          confirmIcon="cog"
          confirmText={isEnabled ? "Disable" : "Enable"}
          cancelAppearance="errorGhost"
          onClose={() => setMaintenance(false)}
          onConfirm={onClickMaintenanceMode}
          isLoadingConfirm={maintenanceLoading}
        >
          <P>Really {isEnabled ? "disable" : "enable"} maintenance mode on the system?</P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default MaintenanceMode
