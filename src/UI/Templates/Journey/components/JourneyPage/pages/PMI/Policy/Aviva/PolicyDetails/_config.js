import { string } from "yup"
import { Input } from "@4cplatform/elements/Forms"
import { get } from "lodash"

export const config = data => ({
  title: "Aviva policy details",
  subtitle: "Please provide details about your last Aviva policy.",
  sections: [
    {
      components: [
        {
          key: "aviva_policy_number",
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Policy number",
          initialValue: get(data, "data.aviva_policy_number", ""),
          component: Input
        },
        {
          key: "aviva_member_number",
          validationSchema: string(),
          label: "Member number (if applicable)",
          initialValue: get(data, "data.aviva_member_number", ""),
          component: Input
        }
      ]
    }
  ]
})
