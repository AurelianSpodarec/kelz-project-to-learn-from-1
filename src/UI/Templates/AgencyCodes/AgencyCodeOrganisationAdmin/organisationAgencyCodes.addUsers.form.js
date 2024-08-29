/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { nullFunc } from "@4cplatform/elements/Helpers"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"

// Components
import { AddUserFormWrapper } from "./organisationAgencyCodes.styles"
import { Typeahead } from "../../../Forms"
import { getName } from "../../../Helpers"

const AddUsersForm = ({ formik, handleSubmit, users }) => {
  const { orgVal, setUserVal, suggestionsLoading } = React.useContext(AgencyCodesContext)

  // Clear the orgVal at component dismount
  React.useEffect(() => setUserVal(""), [])

  return (
    <AddUserFormWrapper>
      <Typeahead
        formik={formik}
        name="user_id"
        label="Select user"
        onSelect={user => {
          setUserVal(user.label)
          formik.setFieldValue("user_id", user.id)
        }}
        onChange={val => setUserVal(val)}
        suggestions={users.map(org => {
          const { id } = org
          return { id, label: getName({ data: org }) }
        })}
        hasCancel={!!orgVal}
        onCancel={() => setUserVal("")}
        isLoading={suggestionsLoading}
        shouldClearOnSubmit
      />
      <Button
        name="add_org"
        leadingIcon="plus"
        type="inline-button"
        onClick={handleSubmit}
        isDisabled={!get(formik, "values.user_id", null)}
      >
        Add user
      </Button>
    </AddUserFormWrapper>
  )
}

AddUsersForm.defaultProps = {
  handleSubmit: nullFunc,
  users: []
}

AddUsersForm.propTypes = {
  formik: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  users: PropTypes.array
}

export default AddUsersForm
