/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"

// Components
import { Provider } from ".."

const MyAccountSettingsStoryProvider = ({ children, value }) => (
  <Provider
    value={{
      simulationModeValue: false,
      expirationEmailsValue: true,
      onUpdateSetting: setting => console.log(setting),
      ...value
    }}
  >
    {children}
  </Provider>
)

MyAccountSettingsStoryProvider.defaultProps = {
  children: null,
  value: {}
}

MyAccountSettingsStoryProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default MyAccountSettingsStoryProvider
