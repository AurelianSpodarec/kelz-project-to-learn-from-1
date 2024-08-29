import { P } from "@4cplatform/elements/Typography"
import { get } from "lodash"
import { Toggle } from "@4cplatform/elements/Forms"
import { boolean } from "yup"

export const config = data => ({
  title: "Aviva renewal commission",
  sections: [
    {
      key: "aviva_renewal_commission",
      components: [
        {
          component: P,
          componentProps: {
            children:
              "The client has declared that he / she has had an Aviva policy within the past 12 months. As Aviva defines this as a renewal, your commission will be calculated at your renewal rate, if you are unaware of what your renewal rate is you should contact your Aviva account manager."
          },
          skipDataMap: true
        },
        {
          key: "agreed_to_avivas_renewal_commission",
          initialValue: get(data, "page.data.agreed_to_avivas_renewal_commission", false),
          validationSchema: boolean()
            .oneOf([true], "MUST_BE_TRUE")
            .required("MISSING_REQUIRED_FIELD"),
          label: "Please verify that you agree to your provider’s renewal commission rate.",
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
            labelWidth: "60rem"
          }
        }
      ]
    }
  ]
})
