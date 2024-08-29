import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { usePost, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { checkAddressContent } from "@4cplatform/elements/Helpers"

// Helpers
import reducer from "./bankAddress.reducer"
import { defaultAddress } from "../bankAddress.helpers"

// Components
import { Provider } from "./bankAddress.context"

const BankAddressProvider = ({ children, formik, name }) => {
  const { addAlert } = React.useContext(AlertsContext)

  // State
  const [{ display }, dispatch] = React.useReducer(reducer, {
    display: checkAddressContent(get(formik, `values.${name}`, defaultAddress))
      ? "filled_in"
      : "fresh"
  })

  // Reset component to Fresh state
  const setFresh = () => {
    dispatch({ type: "SET_FRESH" })
    formik.setFieldValue(name, defaultAddress)
  }

  // Set component to Filled In state
  const setFilledIn = data => {
    dispatch({ type: "SET_FILLED_IN" })
    const sortcode = get(formik, `values.${name}.sortcode`, "")
    formik.setFieldValue(name, { ...data, sortcode })
  }

  // Bank Address search
  const [sortcodeLookup, { error }] = usePost({
    endpoint: "/sortcode-lookup",
    onCompleted: res => {
      const data = get(res, "data", {})
      setFilledIn(data)
    },
    onError: err => {
      const { status, message } = err
      addAlert({
        message: `There was an error fetching the address - status ${status}, ${message}`,
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        setFresh,
        setFilledIn,
        display,
        setSearch: sortcode => {
          sortcodeLookup({ body: { sortcode } })
        },
        formik,
        name
      }}
    >
      <ApiError error={error} />
      {children}
    </Provider>
  )
}

BankAddressProvider.propTypes = {
  children: PropTypes.any,
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
}

export default BankAddressProvider
