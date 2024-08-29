import { array, object, string, number, boolean } from "yup"
import { get } from "lodash"

import { Toggle } from "@4cplatform/elements/Forms"

import ClaimsHistoryTable from "./claimsHistory.table"

export const config = data => {
  const conditionalSection = get(data, "page.conditionals.has_access_to_axa_agency_codes")
    ? [
        {
          key: "axa_questions",
          title: "AXA Questions",
          components: [
            {
              key: "axa_questions.axa_anyone_planned_or_pending",
              initialValue: get(data, "page.data.axa_anyone_planned_or_pending", false),
              validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
              label:
                "Do you or anyone to be insured on this policy have any treatment, consultations, investigations or diagnostic tests, planned or pending?",
              component: Toggle,
              componentProps: {
                options: [
                  {
                    order: 0,
                    label: "No",
                    value: false
                  },
                  {
                    order: 1,
                    label: "Yes",
                    value: true
                  }
                ],
                isHorizontal: true,
                labelWidth: "80%"
              }
            },
            {
              key: "axa_questions.axa_anyone_received_treatment_or_consultation_in_last_12_months",
              initialValue: get(
                data,
                "page.data.axa_anyone_received_treatment_or_consultation_in_last_12_months",
                false
              ),
              validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
              label:
                "Have you or anyone to be insured on this policy had treatment in hospital or consulted a specialist in the last 12 months?",
              labelWidth: "80rem",
              component: Toggle,
              componentProps: {
                options: [
                  {
                    order: 0,
                    label: "No",
                    value: false
                  },
                  {
                    order: 1,
                    label: "Yes",
                    value: true
                  }
                ],
                isHorizontal: true,
                labelWidth: "80%"
              }
            }
          ]
        }
      ]
    : []

  return {
    title: "Claims history",
    sections: [
      {
        key: "applicants",
        components: [
          {
            key: "applicants",
            initialValue: data.journey?.applicants?.map(applicant => ({
              applicant_id: get(applicant, "id", 0),
              years_covered: get(applicant, "data.years_covered", ""),
              claims_last_five_years: get(applicant, "data.claims_last_five_years", ""),
              date_of_last_claim: get(applicant, "data.date_of_last_claim", "")
            })),
            validationSchema: array(
              object({
                applicant_id: number().required("MISSING_REQUIRED_FIELD"),
                years_covered: string().required("MISSING_REQUIRED_FIELD"),
                claims_last_five_years: string().required("MISSING_REQUIRED_FIELD"),
                date_of_last_claim: string().required("MISSING_REQUIRED_FIELD")
              })
            ).min(1),
            component: ClaimsHistoryTable,
            componentProps: {
              data
            }
          }
        ]
      },
      ...conditionalSection
    ]
  }
}
