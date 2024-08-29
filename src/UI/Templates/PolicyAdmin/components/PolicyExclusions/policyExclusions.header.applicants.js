import React from "react"
import { get } from "lodash"
import { Label, P } from "@4cplatform/elements/Typography"
import { Select, TextArea } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"
import { useFormik } from "formik"

// Helpers
import { PoliciesContext } from "../../policies.context"

// Components
import { ExclusionBodyWrapper, SectionWrapper } from "./policyExclusions.styles"

const PolicyExclusionsApplicants = () => {
  const { exclusionsData, onCreateExclusion } = React.useContext(PoliciesContext)
  const applicants =
    exclusionsData && exclusionsData.map(exclusion => get(exclusion, "applicant_name"))
  const applicantNames = [...new Set(applicants)]

  const createExclusionFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      applicant_name: applicantNames[0],
      exclusion: ""
    },
    onSubmit: body => onCreateExclusion({ body })
  })
  const { handleSubmit } = createExclusionFormik
  const formik = { ...createExclusionFormik }

  return (
    <ExclusionBodyWrapper data-testid="add_exclusions-wrapper">
      <SectionWrapper>
        <Label margin="0 0 1rem">
          <P>Select a person</P>
        </Label>
        <Select hasAccountIcon formik={formik} name="applicant_name">
          {applicantNames.map(applicantName => (
            <option key={`${applicantName}-option`} value={applicantName}>
              {applicantName}
            </option>
          ))}
        </Select>
        <TextArea
          name="exclusion"
          margin="0"
          padding="1rem"
          formik={formik}
          labelWidth="100%"
          label="Policy exclusion"
          hasErrorMessage={false}
        />
        <Button
          appearance="success"
          trailingIcon="plus"
          onClick={handleSubmit}
          name="add_policy_exclusion"
          margin="2rem 0 0"
        >
          Add
        </Button>
      </SectionWrapper>
    </ExclusionBodyWrapper>
  )
}

export default PolicyExclusionsApplicants
