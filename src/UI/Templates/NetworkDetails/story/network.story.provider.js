/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import { fakeNetworkGetResponse } from "../../../Helpers"

const TestDetailsProvider = ({ children, value }) => {
  const [isEdit, setEdit] = React.useState(false)
  return (
    <Provider
      value={{
        data: get(fakeNetworkGetResponse, "data", {}),
        isEdit,
        setEdit,
        onEditDetailsSubmit: val => console.log(val),
        onLogoUpdate: val => console.log(val),
        onLogoDelete: val => console.log(val),
        isLoading: false,
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestDetailsProvider.defaultProps = {
  children: null,
  value: {}
}

TestDetailsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestDetailsProvider
