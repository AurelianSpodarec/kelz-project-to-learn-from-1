import React, { useContext } from "react"
import { Column } from "@4cplatform/elements/Atoms"
import { Toggle } from "@4cplatform/elements/Forms"
import { AuthWrapper } from "@4cplatform/elements/Auth"

// Helpers
import { MyAccountSettingsContext } from "./settings.context"

// Components
import { SettingsRow } from "./settings.styles"

const Settings = () => {
  const { onUpdateSetting, updateSettingLoading, simulationModeValue, expirationEmailsValue } =
    useContext(MyAccountSettingsContext)

  return (
    <>
      <AuthWrapper roles={["ORG_ADMIN", "SALES_ADVISER"]}>
        <SettingsRow>
          <Column phone={12} small={12} tablet={12} medium={12} large={8} xLarge={8} xxLarge={8}>
            <Toggle
              name="simulation-mode"
              label="Switch on Simulation mode"
              helperText="Use the toggle to turn Simulation mode on or off."
              helperPosition="left"
              labelWidth="35rem"
              isHorizontal
              value={simulationModeValue}
              onChange={() => onUpdateSetting("simulation")}
              isDisabled={updateSettingLoading}
            />
          </Column>
        </SettingsRow>
      </AuthWrapper>
      <SettingsRow padding="2rem 0 0 0">
        <Column phone={12} small={12} tablet={12} medium={12} large={8} xLarge={8} xxLarge={8}>
          <Toggle
            name="receive-password-expiration"
            label="Receive password expiration emails?"
            helperTitle="Password expire emails"
            helperText="By default, you will be sent an email to notify you when your password is due to expire. Use the toggle to opt in or out."
            helperPosition="left"
            labelWidth="35rem"
            isHorizontal
            value={expirationEmailsValue}
            onChange={() => onUpdateSetting("expiration")}
            isDisabled={updateSettingLoading}
          />
        </Column>
      </SettingsRow>
    </>
  )
}

export default Settings
