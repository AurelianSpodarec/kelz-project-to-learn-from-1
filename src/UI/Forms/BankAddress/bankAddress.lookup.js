import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { Input } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { BankAddressContext } from "./context/bankAddress.context"
import { defaultAddress, formatAsSortcode } from "./bankAddress.helpers"

// Components
import { LookupWrapper, ManualWrapper } from "./bankAddress.styles"

const SortcodeLookup = ({ labelWidth, name, isHorizontal, appearance, isDisabled }) => {
  const { display, setFresh, setSearch, setFilledIn, formik } = React.useContext(BankAddressContext)
  const value = get(formik, `values.${name}.sortcode`, null)
  // Check whether or not to display the Cancel button and behaviors
  const isCancel = display === "filled_in"

  return (
    <LookupWrapper>
      <Input
        label="Sortcode"
        isHorizontal={isHorizontal}
        labelWidth={labelWidth}
        margin="0"
        name={`${name}.sortcode`}
        trailingIcon={isCancel ? "close" : "magnify"}
        placeholder="00-00-00"
        value={formatAsSortcode(value)}
        onChange={val => {
          // Do not allow sortcodes with more than six digits
          if (val.replace(/\D/g, "").length <= 6) {
            formik.setFieldValue(`${name}.sortcode`, formatAsSortcode(val))
          }
        }}
        onClick={() => {
          if (isCancel) {
            setFresh()
          } else {
            setSearch(value)
          }
        }}
        appearance={appearance}
        isDisabled={isDisabled}
      />
      <ManualWrapper isHorizontal={isHorizontal}>
        {display !== "filled_in" && (
          <Button
            appearance={appearance === "light" ? "whiteInline" : "primaryInline"}
            type="inline-button"
            margin="0 0 0 1rem"
            onClick={() => setFilledIn({ ...defaultAddress })}
            name="enter_manually"
            isDisabled={isDisabled}
          >
            Enter manually
          </Button>
        )}
      </ManualWrapper>
    </LookupWrapper>
  )
}

SortcodeLookup.defaultProps = {
  labelWidth: "18rem",
  isHorizontal: false,
  appearance: "dark",
  isDisabled: false
}

SortcodeLookup.propTypes = {
  name: PropTypes.string.isRequired,
  labelWidth: PropTypes.string,
  isHorizontal: PropTypes.bool,
  appearance: PropTypes.oneOf(["dark", "light"]),
  isDisabled: PropTypes.bool
}

export default SortcodeLookup
