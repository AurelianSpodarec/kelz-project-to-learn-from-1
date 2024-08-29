import React from "react"
import PropTypes from "prop-types"
import { H3 } from "@4cplatform/elements/Typography"

// Components
import { CustomFieldsWrapper } from "./providerCreate.styles"
import { CustomFields } from "../../Forms"

const ProviderCustomFields = ({ formik }) => (
  <>
    <CustomFieldsWrapper>
      <H3 margin="0">Additional contact details</H3>
      <CustomFields name="additional_contact_details" formik={formik} margin="2.4rem 0 0" />
    </CustomFieldsWrapper>
  </>
)

ProviderCustomFields.propTypes = {
  /**
   * The formik instance that controls this component
   */
  formik: PropTypes.object
}

export default ProviderCustomFields
