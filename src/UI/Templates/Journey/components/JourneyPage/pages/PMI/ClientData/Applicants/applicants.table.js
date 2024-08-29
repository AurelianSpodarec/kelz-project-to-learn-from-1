import React from "react"
import { get, capitalize } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"
import { Icon } from "@4cplatform/elements/Atoms"
import { colours } from "@4cplatform/elements/Helpers"
import { SmallText } from "@4cplatform/elements/Typography"
import { Checkbox } from "@4cplatform/elements/Forms"

// Helpers
import { ApplicantsContext } from "./applicants.context"
import { getName } from "../../../../../../../../Helpers"

// Components
import { AnswerWrapper } from "./applicants.styles"
import RowActions from "./applicants.table.actions"

const ApplicantsTable = () => {
  const {
    applicants,
    setPage,
    setPerPage,
    pagination,
    applicantsLoading,
    includeApplicant,
    includeApplicantLoading,
    excludeApplicant,
    excludeApplicantLoading
  } = React.useContext(ApplicantsContext)

  return (
    <Table
      data={applicants}
      isLoading={applicantsLoading}
      name="applicants"
      columns={[
        {
          label: "Incl.",
          data: "included",
          minWidth: "100px",
          render: row => {
            const slug = get(row, "data.slug", "")
            const isIncluded = get(row, "data.included", false)
            return (
              <Checkbox
                name={`applicant_${get(row, "data.id", "")}_${isIncluded ? "exclude" : "include"}`}
                label={null}
                value={isIncluded}
                margin="0"
                onChange={() => {
                  if (isIncluded) {
                    excludeApplicant(slug)
                  } else {
                    includeApplicant(slug)
                  }
                }}
                isDisabled={
                  includeApplicantLoading || excludeApplicantLoading || applicants.length === 1
                }
              />
            )
          }
        },
        [
          {
            label: "Name",
            data: "first_name",
            minWidth: "180px",
            render: row => getName({ data: get(row, "data") })
          },
          {
            label: "Details",
            data: "date_of_birth",
            minWidth: "180px",
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
          label: "Smoker",
          data: "data.tobacco_products_within_last_2_years",
          minWidth: "80px",
          render: row => {
            const isSmoker = get(row, "data.data.tobacco_products_within_last_2_years", false)
            return (
              <AnswerWrapper>
                <Icon
                  icon={isSmoker ? "check-circle" : "close-circle"}
                  colour={isSmoker ? get(colours, "green") : get(colours, "red")}
                  size="2.5rem"
                />
              </AnswerWrapper>
            )
          }
        },
        {
          label: "UK Resident",
          data: "data.permanent_uk_resident",
          minWidth: "80px",
          render: row => {
            const isResident = get(row, "data.data.permanent_uk_resident", false)
            return (
              <AnswerWrapper>
                <Icon
                  icon={isResident ? "check-circle" : "close-circle"}
                  colour={isResident ? get(colours, "green") : get(colours, "red")}
                  size="2.5rem"
                />
              </AnswerWrapper>
            )
          }
        },
        {
          label: "Visa",
          data: "data.pmi_required_to_fulfil_reqs_or_visa",
          minWidth: "80px",
          render: row => {
            const isRequiredForVisa = get(
              row,
              "data.data.pmi_required_to_fulfil_reqs_or_visa",
              false
            )
            return (
              <AnswerWrapper>
                <Icon
                  icon={isRequiredForVisa ? "check-circle" : "close-circle"}
                  colour={isRequiredForVisa ? get(colours, "green") : get(colours, "red")}
                  size="2.5rem"
                />
              </AnswerWrapper>
            )
          }
        },
        {
          label: "",
          data: "buttons",
          minWidth: "180px",
          render: row => <RowActions applicant={get(row, "data", {})} />
        }
      ]}
      hasActions={false}
      pagination={pagination}
      changePage={e => setPage(e)}
      changePerPage={setPerPage}
      perPageOptions={{ max: 20, interval: 5 }}
      hasPerPage={false}
    />
  )
}

export default ApplicantsTable
