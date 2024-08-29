import React from "react"
import PropTypes from "prop-types"
import { Input } from "@4cplatform/elements/Forms"

// Helpers
import { BankAddressContext } from "./context/bankAddress.context"

const BankAddressFields = ({ name, labelWidth, isHorizontal, appearance, isDisabled }) => {
  const { display, formik } = React.useContext(BankAddressContext)

  // Do not display fields unless component is in a Filled In state
  if (display !== "filled_in") return null

  return (
    <>
      <Input
        label="Branch"
        isHorizontal={isHorizontal}
        labelWidth={labelWidth}
        formik={formik}
        name={`${name}.branch`}
        appearance={appearance}
        isDisabled={isDisabled}
      />
      <Input
        label="Bank"
        isHorizontal={isHorizontal}
        labelWidth={labelWidth}
        formik={formik}
        name={`${name}.bank`}
        appearance={appearance}
        isDisabled={isDisabled}
      />
      <Input
        label="Line 1"
        isHorizontal={isHorizontal}
        labelWidth={labelWidth}
        formik={formik}
        name={`${name}.line_one`}
        appearance={appearance}
        isDisabled={isDisabled}
      />
      <Input
        label="Line 2"
        isHorizontal={isHorizontal}
        labelWidth={labelWidth}
        formik={formik}
        name={`${name}.line_two`}
        appearance={appearance}
        isDisabled={isDisabled}
      />
      <Input
        label="City"
        isHorizontal={isHorizontal}
        labelWidth={labelWidth}
        formik={formik}
        name={`${name}.city`}
        appearance={appearance}
        isDisabled={isDisabled}
      />
      <Input
        label="County"
        isHorizontal={isHorizontal}
        labelWidth={labelWidth}
        formik={formik}
        name={`${name}.county`}
        appearance={appearance}
        isDisabled={isDisabled}
      />
      <Input
        label="Postcode"
        isHorizontal={isHorizontal}
        labelWidth={labelWidth}
        formik={formik}
        name={`${name}.postcode`}
        appearance={appearance}
        isDisabled={isDisabled}
      />
    </>
  )
}

BankAddressFields.defaultProps = {
  labelWidth: "18rem",
  isHorizontal: false,
  appearance: "dark",
  isDisabled: false
}

BankAddressFields.propTypes = {
  name: PropTypes.string.isRequired,
  labelWidth: PropTypes.string,
  isHorizontal: PropTypes.bool,
  appearance: PropTypes.oneOf(["dark", "light"]),
  isDisabled: PropTypes.bool
}

export default BankAddressFields
