import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { renderTitleOptions } from "@4cplatform/elements/Helpers"
import { Input, QuerySelect, Select, DatePicker, Checkbox } from "@4cplatform/elements/Forms"
import { ConfigContext } from "@4cplatform/elements/Config"

const ApplicantDetails = ({ formik, type }) => {
  const isDependant = type === "dependant"
  const [isChild, setChild] = useState(false)
  const { LOADING_TITLES, GLOBAL_TITLES } = useContext(ConfigContext)

  return (
    <>
      <Select name="applicant.gender_at_birth" formik={formik} label="Gender at birth">
        <option value="">Select a gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Select>
      <Select name="applicant.title" label="Title" formik={formik} isDisabled={LOADING_TITLES}>
        {LOADING_TITLES ? (
          <option value="">Loading titles</option>
        ) : (
          <option value="">Select title</option>
        )}
        {renderTitleOptions(GLOBAL_TITLES?.data, formik, "applicant.gender_at_birth")}
      </Select>
      <Input label="First name" name="applicant.first_name" formik={formik} />
      <Input label="Middle names" name="applicant.middle_names" formik={formik} />
      <Input label="Last name" name="applicant.last_name" formik={formik} />
      <Input label="Email address" name="applicant.email_address" formik={formik} />
      {/* Conditional fields */}
      {isDependant && (
        <Checkbox
          label="Child"
          value={isChild}
          onChange={() => setChild(!isChild)}
          margin="2rem 0 2rem"
        />
      )}
      {(!isDependant || (isDependant && !isChild)) && (
        <QuerySelect
          name="applicant.occupation"
          label="Occupation"
          noun={{ singular: "occupation", plural: "occupations" }}
          endpoint="/occupations"
          helperText="<p>Please note that some insurers apply a discount to the premium should the client disclose that they fall under one of the selected occupations. Your client may be asked to provide evidence of their occupation in order to be eligible for any discounts applied. If your client is unable or unwilling to provide evidence of their occupation, please mark their occupation as Other.</p>"
          render={jobs => {
            const keys = Object.keys(jobs)
            return keys.map(key => (
              <option key={key} value={key}>
                {jobs[key]}
              </option>
            ))
          }}
          formik={formik}
        />
      )}
      <DatePicker
        name="applicant.date_of_birth"
        formik={formik}
        label="Date of birth"
        margin="0"
        dateRangeMax={isChild ? null : moment().subtract(18, "years").format("DD/MM/YYYY")}
        dateRangeMin={isChild ? moment().subtract(18, "years").format("DD/MM/YYYY") : null}
      />
    </>
  )
}

ApplicantDetails.propTypes = {
  formik: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}

export default ApplicantDetails
