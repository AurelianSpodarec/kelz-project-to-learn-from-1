/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Helpers
import { fakeSelfServiceResponse } from "../../../Helpers"

// Components
import { Provider } from ".."

const MyAccountDetailsStoryProvider = ({ children, value }) => {
  const [detailsOpen, setDetailsOpen] = React.useState(false)
  return (
    <Provider
      value={{
        user: get(fakeSelfServiceResponse, "data", {}),
        onUpdateDetailsSubmit: val => console.log(val),
        detailsOpen,
        toggleUpdateDetails: val => setDetailsOpen(val),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

MyAccountDetailsStoryProvider.defaultProps = {
  children: null,
  value: {}
}

MyAccountDetailsStoryProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default MyAccountDetailsStoryProvider
