import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { Input } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"
import Select from "@4cplatform/elements/Forms/Select"

// Helpers
import { disableButton } from "./networkInvitations.helpers"

// Components
import { InviteOrganisationFormWrapper } from "./networkInvitations.styles"

const Form = ({ formik, organisations, handleSubmit, isLoading }) => (
  <>
    <InviteOrganisationFormWrapper>
      {/* Org ID */}
      {!get(formik, "values.email_address") && (
        <Select formik={formik} name="organisation_id" label="Organisation" isDisabled={isLoading}>
          <option value="">Please select</option>
          {organisations.map(({ id, name }) => (
            <option value={id} key={`org_option_${id}`}>
              {name}
            </option>
          ))}
        </Select>
      )}

      {/* Email address */}
      {!get(formik, "values.organisation_id") && (
        <Input label="Email address" formik={formik} name="email_address" />
      )}

      {/* Add New Invitation button */}
      {!disableButton(get(formik, "values", {})) && (
        <Button name="add_new" leadingIcon="plus" type="inline-button" onClick={handleSubmit}>
          Add another organisation
        </Button>
      )}
    </InviteOrganisationFormWrapper>
  </>
)

Form.defaultProps = {
  organisations: [],
  isLoading: false
}

Form.propTypes = {
  organisations: PropTypes.array,
  formik: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default Form
