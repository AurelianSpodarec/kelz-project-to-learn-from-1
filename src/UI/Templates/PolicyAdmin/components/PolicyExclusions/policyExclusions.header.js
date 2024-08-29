import React from "react"
import { get } from "lodash"
import { useFormik } from "formik"
import { P, H2, H4 } from "@4cplatform/elements/Typography"

// Helpers
import { PoliciesContext } from "../../policies.context"

// Components
import {
  SectionWrapper,
  ExclusionHeaderTextWrapper,
  ExclusionWrapper
} from "./policyExclusions.styles"
import PolicyExclusionsHeaderActions from "./policyExclusions.header.actions"
import PolicyExclusionsApplicantEdit from "./policyExclusions.header.applicants.edit"

const PolicyExclusionsHeader = () => {
  const { exclusionsData, selectedExclusion, setEditModal, onUpdateEclusion, onExclusionSelect } =
    React.useContext(PoliciesContext)
  const applicants =
    exclusionsData && exclusionsData.map(exclusion => get(exclusion, "applicant_name"))
  const applicantNames = [...new Set(applicants)]

  const createExclusionFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      applicant_name: get(selectedExclusion, "applicant_name"),
      exclusion: get(selectedExclusion, "exclusion")
    },
    onSubmit: body => {
      setEditModal(false)
      onExclusionSelect(null)
      onUpdateEclusion({ body })
    }
  })
  const { handleSubmit } = createExclusionFormik
  const formik = { ...createExclusionFormik }
  return (
    <SectionWrapper>
      <H2 margin="0 0 2rem">{exclusionsData ? "Added exclusions" : null}</H2>
      {exclusionsData &&
        exclusionsData.map((exclusion, i) => {
          const exclusionId = get(exclusion, "id")
          const applicantName = get(exclusion, "applicant_name")
          const exclusionTitle = get(exclusion, "exclusion")
          const clickedExclusion = get(selectedExclusion, "id")
          return (
            <ExclusionWrapper key={`exclusion-${i}`} isEditForm>
              {clickedExclusion === exclusionId ? (
                <PolicyExclusionsApplicantEdit formik={formik} applicants={applicantNames} />
              ) : (
                <ExclusionHeaderTextWrapper>
                  <H4 margin="0">{applicantName}</H4>
                  <P margin="1rem 0">{exclusionTitle}</P>
                </ExclusionHeaderTextWrapper>
              )}
              <PolicyExclusionsHeaderActions exclusion={exclusion} onClick={handleSubmit} />
            </ExclusionWrapper>
          )
        })}
    </SectionWrapper>
  )
}

export default PolicyExclusionsHeader
