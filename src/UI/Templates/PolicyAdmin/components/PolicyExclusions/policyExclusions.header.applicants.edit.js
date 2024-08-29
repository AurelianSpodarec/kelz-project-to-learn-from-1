import React from "react"
import PropTypes from "prop-types"
import { Select, TextArea } from "@4cplatform/elements/Forms"

// Components
import { ExclusionBodyWrapper, SectionWrapper } from "./policyExclusions.styles"

const PolicyExclusionsApplicantEdit = ({ formik, applicants }) => (
  <ExclusionBodyWrapper data-testid="edit_exclusions-wrapper" isEditForm>
    <SectionWrapper isEditForm>
      <Select hasAccountIcon formik={formik} name="applicant_name" data-testid="edit_name">
        {applicants.map(applicantName => (
          <option key={`${applicantName}-option`}>{applicantName}</option>
        ))}
      </Select>
      <TextArea
        data-testid="edit_exclusion-textarea"
        name="exclusion"
        margin="0"
        padding="1rem"
        formik={formik}
        labelWidth="100%"
        hasErrorMessage={false}
      />
    </SectionWrapper>
  </ExclusionBodyWrapper>
)

PolicyExclusionsApplicantEdit.propTypes = {
  /**
   * The formik instance that controls this component
   */
  formik: PropTypes.object.isRequired,
  /**
   * The list of policy exclusion applicant names
   */
  applicants: PropTypes.object
}
export default PolicyExclusionsApplicantEdit
