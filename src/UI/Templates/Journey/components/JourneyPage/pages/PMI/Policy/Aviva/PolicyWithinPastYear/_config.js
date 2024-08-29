import { boolean } from "yup"
import { Toggle } from "@4cplatform/elements/Forms"
import { get } from "lodash"

export const config = data => ({
  title: "Policy within last year",
  subtitle:
    "Has the client, or any members to be covered, been insured under an Aviva PMI policy within the past 12 months?",
  sections: [
    {
      key: "section_1",
      components: [
        {
          key: "anyone_covered_insured_under_an_aviva_pmi_policy_within_the_past_twelve_months",
          initialValue: get(
            data,
            "page.data.anyone_covered_insured_under_an_aviva_pmi_policy_within_the_past_twelve_months",
            false
          ),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label: "Client answer",
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
            labelWidth: "50rem"
          }
        }
      ]
    }
  ]
})
