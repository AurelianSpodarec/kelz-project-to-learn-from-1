import React from "react"
import PropTypes from "prop-types"

// Components
import BankAddressProvider from "./context/bankAddress.provider"
import { Wrapper } from "./bankAddress.styles"
import SortcodeLookup from "./bankAddress.lookup"
import BankAddressFields from "./bankAddress.fields"

const BankAddress = ({
  margin,
  name,
  labelWidth,
  formik,
  isHorizontal,
  appearance,
  isDisabled
}) => (
  <BankAddressProvider name={name} formik={formik} isHorizontal={isHorizontal}>
    <Wrapper margin={margin}>
      <SortcodeLookup
        labelWidth={labelWidth}
        name={name}
        isHorizontal={isHorizontal}
        appearance={appearance}
        isDisabled={isDisabled}
      />
      <BankAddressFields
        name={name}
        labelWidth={labelWidth}
        isHorizontal={isHorizontal}
        appearance={appearance}
        isDisabled={isDisabled}
      />
    </Wrapper>
  </BankAddressProvider>
)

BankAddress.defaultProps = {
  margin: "0 0 2rem",
  labelWidth: "18rem",
  isHorizontal: false,
  appearance: "dark",
  isDisabled: false
}

BankAddress.propTypes = {
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  labelWidth: PropTypes.string,
  formik: PropTypes.object.isRequired,
  isHorizontal: PropTypes.bool,
  appearance: PropTypes.oneOf(["dark", "light"]),
  isDisabled: PropTypes.bool
}

export default BankAddress
