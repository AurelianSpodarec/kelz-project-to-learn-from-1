import React, { useContext } from "react"
import moment from "moment"
import { get, capitalize } from "lodash"
import { Table } from "@4cplatform/elements/Organisms"
import { Select } from "@4cplatform/elements/Forms"
import { SmallText } from "@4cplatform/elements/Typography"

// Helpers
import { getName } from "../../../../../../../../Helpers"
import { JourneyContext } from "../../../../../../journey.context"

// Components
const ClaimsHistoryTable = () => {
  const { data, isLoading, formik } = useContext(JourneyContext)

  const yearsCoveredArray = [
    "0 years",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "7 years",
    "8 years",
    "9 years",
    "10 years",
    "11 years",
    "12 years",
    "13 years",
    "14 years",
    "15 years"
  ]
  const applicants = get(data, "journey.applicants", [])

  const handleChange = (name, value) => {
    if (name.includes("years_covered") && value === 0) {
      formik.setFieldValue(name.replace("years_covered", "claims_last_five_years"), "None")
      formik.setFieldValue(name.replace("years_covered", "date_of_last_claim"), "Never")
      formik.setFieldValue(name, value)
    } else if (name.includes("years_covered") && value === null) {
      formik.setFieldValue(name.replace("years_covered", "claims_last_five_years"), "")
      formik.setFieldValue(name.replace("years_covered", "date_of_last_claim"), "")
      formik.setFieldValue(name, value)
    } else if (name.includes("claims_last_five_years")) {
      if (value === "None") {
        formik.setFieldValue(name.replace("claims_last_five_years", "date_of_last_claim"), "Never")
        formik.setFieldValue(name, value)
      }
      if (
        formik.values.applicants[JSON.parse(name.match(/\d+/g)[0])].date_of_last_claim === "Never"
      )
        formik.setFieldValue(name.replace("claims_last_five_years", "date_of_last_claim"), "")
      formik.setFieldValue(name, value)
    } else {
      formik.setFieldValue(name, value)
    }
  }

  return (
    <Table
      data={applicants}
      formik={formik}
      name="applicants"
      isLoading={isLoading}
      columns={[
        [
          {
            label: "Name",
            data: "first_name",
            minWidth: "120px",
            render: row => getName({ data: get(row, "data") })
          },
          {
            minWidth: "120px",
            data: "date_of_birth",
            render: row => {
              const dob = moment(get(row, "data.date_of_birth"), "YYYY-MM-DD HH:mm")
              const age = moment().diff(dob, "years")
              return (
                <SmallText margin="0">
                  Age {age}
                  &nbsp;&nbsp;
                  {capitalize(get(row, "data.type", "-"))}
                </SmallText>
              )
            }
          }
        ],
        {
          label: "Years covered",
          minWidth: "120px",
          render: row => {
            const applicantId = get(row, "data.id", false)
            const formikApplicantIndex = applicants.findIndex(a => a.id === applicantId)
            return (
              <Select
                name={`applicants.${formikApplicantIndex}.years_covered`}
                margin="0 2rem 0 0"
                onChange={val =>
                  handleChange(
                    `applicants.${formikApplicantIndex}.years_covered`,
                    yearsCoveredArray.indexOf(val)
                  )
                }
                value={
                  yearsCoveredArray[
                    get(formik, `values.applicants.${formikApplicantIndex}.years_covered`, null)
                  ]
                }
              >
                <option value="">Please select</option>
                {yearsCoveredArray.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            )
          }
        },
        {
          label: "Claims last 5 years",
          minWidth: "120px",
          render: row => {
            const applicantId = get(row, "data.id", false)
            const formikApplicantIndex = applicants.findIndex(a => a.id === applicantId)
            const yearsCoveredValue = get(
              formik,
              `values.applicants.${formikApplicantIndex}.years_covered`,
              null
            )
            return (
              <Select
                name={`applicants.${formikApplicantIndex}.claims_last_five_years`}
                isDisabled={!yearsCoveredValue || yearsCoveredValue === yearsCoveredArray[0]}
                margin="0 2rem 0 0"
                onChange={val =>
                  handleChange(`applicants.${formikApplicantIndex}.claims_last_five_years`, val)
                }
                value={get(
                  formik,
                  `values.applicants.${formikApplicantIndex}.claims_last_five_years`,
                  ""
                )}
              >
                <option value="">Please select</option>
                <option value="None">None</option>
                <option value="1 Claim">1 claim</option>
                <option value="2 Claims">2 claims</option>
                <option value="3+ Claims">3+ claims</option>
              </Select>
            )
          }
        },
        {
          label: "Date of last claim",
          data: "data.applicants.date_of_last_claim",
          minWidth: "120px",
          render: row => {
            const applicantId = get(row, "data.id", false)
            const formikApplicantIndex = applicants.findIndex(a => a.id === applicantId)
            const yearsCoveredValue = get(
              formik,
              `values.applicants.${formikApplicantIndex}.years_covered`,
              null
            )
            const claimsLastFiveYearsValue = get(
              formik,
              `values.applicants.${formikApplicantIndex}.claims_last_five_years`,
              ""
            )
            return (
              <Select
                formik={formik}
                isDisabled={
                  !yearsCoveredValue ||
                  yearsCoveredValue === yearsCoveredArray[0] ||
                  claimsLastFiveYearsValue === "None"
                }
                name={`applicants.${formikApplicantIndex}.date_of_last_claim`}
                margin="0 2rem 0 0"
                value={get(formik, `applicants.${formikApplicantIndex}.date_of_last_claim`, "")}
              >
                <option value="">Please select</option>
                <option value="Never">Never</option>
                <option value="Within 12 months">Within 12 months</option>
                {yearsCoveredValue !== yearsCoveredArray[0] &&
                  yearsCoveredValue !== yearsCoveredArray[1] && (
                    <>
                      <option value="Within 2 Years">Within 2 years</option>
                      <option value="Within 3 Years">Within 3 years</option>
                      <option value="Within 4 Years">Within 4 years</option>
                      <option value="Within 5 Years">Within 5 years</option>
                      <option value="5+ years">5+ years ago</option>
                    </>
                  )}
              </Select>
            )
          }
        }
      ]}
    />
  )
}

export default ClaimsHistoryTable
