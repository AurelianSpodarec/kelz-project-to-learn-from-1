/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"

// Components
import { Provider } from ".."

// Helpers
import { testData } from "./provider.story.helpers"

const TestDetailsProvider = ({ children, value }) => {
  const [isEdit, setEdit] = React.useState(false)

  return (
    <Provider
      value={{
        data: testData,
        isEdit,
        setEdit,
        onEditDetailsSubmit: val => console.log(val),
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
