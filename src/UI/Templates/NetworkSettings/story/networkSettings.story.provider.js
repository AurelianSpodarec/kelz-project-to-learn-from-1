import React from "react"
import PropTypes from "prop-types"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./networkSettings.story.reducer"

const TestNetworkSettingsProvider = ({ children, value }) => {
  const [{ consentText, exclusionText, editConsent, editExclusion }, dispatch] = React.useReducer(
    reducer,
    {
      consentText:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
      exclusionText:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
      editConsent: false,
      editExclusion: false
    }
  )

  return (
    <Provider
      value={{
        consentText,
        exclusionText,
        onSubmitConsentText: ({ consent_text: val }) => {
          dispatch({ type: "UPDATE_VALUE", key: "consentText", value: val })
        },
        onSubmitExclusionText: ({ exclusion_text: val }) =>
          dispatch({ type: "UPDATE_VALUE", key: "exclusionText", value: val }),
        editConsent,
        setEditConsent: val => dispatch({ type: "UPDATE_VALUE", key: "editConsent", value: val }),
        editExclusion,
        setEditExclusion: val =>
          dispatch({ type: "UPDATE_VALUE", key: "editExclusion", value: val }),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestNetworkSettingsProvider.defaultProps = {
  children: null,
  value: {}
}

TestNetworkSettingsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}
export default TestNetworkSettingsProvider
