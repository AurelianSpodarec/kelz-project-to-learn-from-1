import { boolean } from "yup"
import { get, capitalize } from "lodash"
import { Toggle } from "@4cplatform/elements/Forms"
import { H3 } from "@4cplatform/elements/Typography"

// Components
import { Banner } from "./paymentSetUp.styles"

export const config = data => ({
  title: "Payment set up",
  sections: [
    {
      key: "section_2",
      components: [
        {
          key: "banner",
          component: Banner,
          componentProps: {
            children: (
              <>
                <H3 name="payment_frequency" margin="0" appearance="light">
                  {`${capitalize(get(data, "journey.selected_quote.payment_frequency"))} premium`}
                </H3>
                <H3 name="payment_amount" margin="0" appearance="light">
                  {Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP"
                  }).format(
                    get(
                      data,
                      `journey.selected_quote.${get(
                        data,
                        "journey.selected_quote.payment_frequency"
                      )}_premium`
                    )
                  )}
                </H3>
              </>
            )
          },
          skipDataMap: true
        }
      ]
    },
    {
      key: "section_1",
      components: [
        {
          key: "policy_holder_paying",
          initialValue: get(data, "page.data.policy_holder_paying", true),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label:
            "Will the policy holder be using their personal account, of the same name, to pay for the policy?",
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
            labelWidth: "100%",
            isHorizontal: true
          }
        }
      ]
    }
  ]
})
