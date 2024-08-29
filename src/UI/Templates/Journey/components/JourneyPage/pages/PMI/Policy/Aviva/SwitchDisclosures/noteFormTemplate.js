import React, { useEffect } from "react"
import moment from "moment"
import { get } from "lodash"
import { object, number, string, boolean } from "yup"
import { Select, Toggle, TextArea, DatePicker } from "@4cplatform/elements/Forms"
import { P, List } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { DisclosureNotesContext } from "../../../../../../DisclosureNotes/disclosureNotes.context"

const NoteFormTemplate = () => {
  const {
    applicants,
    disclosureNoteFormik,
    setNoteValidationSchema,
    setAddEditModal,
    addEditModal
  } = React.useContext(DisclosureNotesContext)

  useEffect(() => {
    setNoteValidationSchema(
      object({
        journey_applicant_id: number().min(0).required("MISSING_REQUIRED_FIELD"),
        conditions_or_symptoms: string().required("MISSING_REQUIRED_FIELD"),
        date_of_consultation: string().required("MISSING_REQUIRED_FIELD"),
        date_of_last_symptom_or_treatment: string(),
        treatment_received: string().required("MISSING_REQUIRED_FIELD"),
        present_state_of_health: string().min(1).required("MISSING_REQUIRED_FIELD"),
        foreseeable_consultation_or_treatment: boolean().required("MISSING_REQUIRED_FIELD")
      })
    )
    if (addEditModal.type === "new")
      setAddEditModal({
        ...addEditModal,
        noteInitialValues: {
          journey_applicant_id: "",
          conditions_or_symptoms: "",
          date_of_consultation: "",
          date_of_last_symptom_or_treatment: "",
          treatment_received: "",
          present_state_of_health: "",
          foreseeable_consultation_or_treatment: ""
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formik = {
    ...disclosureNoteFormik
  }
  const getConsultationMinDate = React.useMemo(() => {
    if (formik.values && formik.values.journey_applicant_id) {
      const applicantData = applicants.find(
        applicant => applicant.id === JSON.parse(formik.values.journey_applicant_id)
      )
      return moment(applicantData.date_of_birth).format("DD/MM/YYYY")
    }
    return ""
  }, [applicants, formik.values])

  const getTreatementMinDate = React.useMemo(() => {
    if (formik.values && formik.values.date_of_consultation) {
      return moment(formik.values.date_of_consultation).format("DD/MM/YYYY")
    }
    return ""
  }, [formik.values])

  return (
    <>
      <Select
        name="journey_applicant_id"
        label="Select member"
        formik={formik}
        hasErrorMessage={false}
      >
        <option value="">Select applicant</option>
        {applicants.map(applicant => (
          <option value={get(applicant, "id")} key={get(applicant, "id")}>
            {get(applicant, "first_name")} {get(applicant, "last_name")}
          </option>
        ))}
      </Select>
      <ComplianceNote type="info" margin="2rem 0">
        <P>
          Where possible, please try to obtain the following information from the client in relation
          to the condition disclosed:
        </P>
        <List listType="unordered" name="conditions">
          <li>Diagnosis.</li>
          <li>Nature of symptoms (if no diagnosis made).</li>
          <li>Date of first symptoms and when saw GP/Specialist.</li>
          <li>Nature of treatment received.</li>
          <li>Date of last symptoms/treatment.</li>
          <li>Any known underlying cause.</li>
          <li>Specific location suffered on the body (including the left or right side).</li>
          <li>Any prognosis.</li>
        </List>
      </ComplianceNote>
      <TextArea name="conditions_or_symptoms" formik={formik} label="Conditions / Symptoms:" />

      <DatePicker
        name="date_of_consultation"
        formik={formik}
        label="Date of consultation"
        dateRangeMin={getConsultationMinDate}
      />
      <DatePicker
        name="date_of_last_symptom_or_treatment"
        formik={formik}
        label="Date of last symptoms / treatment"
        dateRangeMin={getTreatementMinDate}
        isDisabled={!formik.values?.date_of_consultation}
      />
      <TextArea
        name="treatment_received"
        formik={formik}
        margin="0 0 2rem 0"
        label="Treatment Received:"
      />
      <TextArea
        name="present_state_of_health"
        formik={formik}
        margin="0 0 2rem 0"
        label="Present State of Health:"
      />
      <Toggle
        name="foreseeable_consultation_or_treatment"
        label="Any foreseeable need for any further consultation or treatment:"
        formik={formik}
        margin="0 0 2rem 0"
        labelWidth="auto"
        options={[
          {
            order: 1,
            label: "No",
            value: false
          },
          {
            order: 2,
            label: "Yes",
            value: true
          }
        ]}
        isHorizontal
      />
    </>
  )
}

export default NoteFormTemplate
