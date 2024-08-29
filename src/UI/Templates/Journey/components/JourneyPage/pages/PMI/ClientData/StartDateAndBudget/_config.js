import { string, number } from "yup"
import { get } from "lodash"
import { Input } from "@4cplatform/elements/Forms"
import StartDatePicker from "./startDatePicker"

export const config = data => ({
  title: "Start date & budget",
  subtitle:
    "Ensure the client understands that by selecting a future start date for their insurance policy, the client will need to notify you should there be any change in the client’s health or circumstances during the intervening period as this may affect the advice and recommendation that has been provided.",
  sections: [
    {
      key: "start_date_and_budget",
      components: [
        {
          key: "affordable_budget",
          initialValue: get(data, "page.data.affordable_budget", ""),
          validationSchema: number().moreThan(0),
          label: "Affordable monthly budget",
          component: Input,
          componentProps: {
            type: "number",
            leadingIcon: "currency-gbp",
            leadingIconType: "prepend",
            placeholder: "Amount",
            isHorizontal: true,
            labelWidth: "30rem",
            margin: "0 0 4rem",
            isDisabled: get(data, "page.conditionals.skip_affordable_budget", false),
            helperPosition: "left",
            helperText:
              "The affordable budget will be printed on the client’s demands and needs document and therefore must only be entered if you have obtained a figure from the client. If you would rather not ask this question then please remove it by visiting your account settings."
          }
        },
        {
          key: "start_date",
          initialValue: get(data, "page.data.start_date", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Start date",
          component: StartDatePicker
        }
      ]
    }
  ]
})
