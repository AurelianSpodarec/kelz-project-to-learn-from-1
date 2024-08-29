/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { nullFunc } from "@4cplatform/elements/Helpers"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"

// Components
import { AddOrganisationFormWrapper } from "./networkAgencyCodes.styles"
import { Typeahead } from "../../../Forms"

const AddOrgsForm = ({ formik, handleSubmit, organisations }) => {
  const { orgVal, setOrgVal, suggestionsLoading } = React.useContext(AgencyCodesContext)

  // Clear the orgVal at component dismount
  React.useEffect(() => setOrgVal(""), [])

  return (
    <AddOrganisationFormWrapper>
      <Typeahead
        formik={formik}
        name="organisation_id"
        label="Select organisation"
        onSelect={org => {
          setOrgVal(org.label)
          formik.setFieldValue("organisation_id", org.id)
        }}
        onChange={val => setOrgVal(val)}
        suggestions={organisations.map(org => {
          const { id, name } = org
          return { id, label: name }
        })}
        hasCancel={!!orgVal}
        onCancel={() => setOrgVal("")}
        isLoading={suggestionsLoading}
        shouldClearOnSubmit
      />
      <Button
        name="add_org"
        leadingIcon="plus"
        type="inline-button"
        onClick={handleSubmit}
        isDisabled={!get(formik, "values.organisation_id", null)}
      >
        Add organisation
      </Button>
    </AddOrganisationFormWrapper>
  )
}

AddOrgsForm.defaultProps = {
  handleSubmit: nullFunc,
  organisations: []
}

AddOrgsForm.propTypes = {
  formik: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  organisations: PropTypes.array
}

export default AddOrgsForm
