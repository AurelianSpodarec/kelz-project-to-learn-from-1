import { string } from "yup"
import { get } from "lodash"
import { Select } from "@4cplatform/elements/Forms"

// Helpers
import { getOptions } from "./thirdPartyPayerAccountType.helpers"

export const config = data => ({
  title: "Third party Ppayer account type",
  sections: [
    {
      key: "third_party_account_type",
      components: [
        {
          key: "third_party_payer_account_type",
          initialValue: get(data, "page.data.third_party_payer_account_type", "SOLE"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "From what type of account will third party payments be made?",
          component: Select,
          componentProps: {
            isRequired: true,
            labelWidth: "100%",
            options: getOptions(get(data, "page.data.provider.slug", ""))
          }
        }
      ]
    }
  ]
})
