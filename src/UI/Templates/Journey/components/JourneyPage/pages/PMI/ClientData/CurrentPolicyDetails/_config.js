import { string, boolean } from "yup"
import { get } from "lodash"
import moment from "moment"
import { Input, DatePicker, Toggle, QuerySelect } from "@4cplatform/elements/Forms"
import { P, H4 } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"

// Helpers
import {
  renderProviderOptions,
  renderProviderProductOptions
} from "../../../../../../../../Helpers"

export const config = (data, t) => ({
  title: "Current policy",
  navTitle: "Current policy",
  subtitle:
    "Does the client have an existing live PMI policy in place or one that has lapsed in the past 30 days?",
  sections: [
    {
      key: "current_policy",
      components: [
        {
          key: "cp_current_policy",
          initialValue: get(data, "page.data.cp_current_policy", null),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD").nullable(),
          label: "Client has a current policy",
          component: Toggle,
          componentProps: {
            helperText:
              "By clicking <strong>Yes</strong> and confirming the client has a live PMI policy in place you will be presented with the option of switching to other providers on the same underwriting terms. By clicking on <strong>No</strong> you will only have the underwriting options available for people who are currently uninsured.",
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
            isHorizontal: true
          }
        },
        {
          key: "compliance_note",
          component: ComplianceNote,
          condition: {
            type: "formik",
            fieldKey: "cp_current_policy",
            fieldValue: true
          },
          componentProps: {
            children: (
              <>
                <H4 margin="0 0 1rem">Compliance note</H4>
                <P margin="0">
                  You need to prompt the client that they would need to cancel their existing policy
                  or wait until the term end to start this policy, which will start from the date
                  their cancellation/term ends.
                </P>
              </>
            ),
            type: "error"
          },
          skipDataMap: true
        }
      ]
    },
    {
      key: "current_policy_details",
      title: "Current policy details",
      condition: {
        type: "formik",
        fieldKey: "cp_current_policy",
        fieldValue: true
      },
      components: [
        {
          key: "paragraph",
          component: P,
          componentProps: {
            children:
              "This information can be found on the renewal documents from your existing insurer or certificate of insurance."
          },
          skipDataMap: true
        },
        {
          key: "cp_company_or_group_policy",
          initialValue: get(data, "page.data.cp_company_or_group_policy", ""),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD").nullable(),
          label: "Group/company policy",
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
            isHorizontal: true
          }
        },
        {
          key: "cp_current_insurer",
          initialValue: get(data, "page.data.cp_current_insurer", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Current insurer",
          component: QuerySelect,
          componentProps: {
            name: "provider_option",
            isHorizontal: true,
            labelWidth: "24rem",
            isRequired: true,
            margin: "0 0 2rem",
            noun: { singular: "insurer", plural: "insurers" },
            endpoint: "/providers",
            render: ddata => renderProviderOptions(ddata, false)
          }
        },
        {
          key: "cp_current_product_name",
          initialValue: get(data, "page.data.cp_current_product_name", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Current product",
          component: QuerySelect,
          componentProps: {
            name: "product_type",
            dependantField: "cp_current_insurer",
            isHorizontal: true,
            labelWidth: "24rem",
            isRequired: true,
            margin: "0 0 2rem",
            noun: { singular: "product", plural: "products" },
            endpoint: "/providers",
            render: (ddata, fformik, dependantField) =>
              renderProviderProductOptions(ddata, fformik, dependantField, false, t)
          }
        },
        {
          key: "cp_renewal_date",
          initialValue: get(data, "page.data.cp_renewal_date", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Renewal date of existing policy",
          component: DatePicker,
          componentProps: {
            dateRangeMin: moment().subtract(30, "days").format("DD/MM/YYYY"),
            dateRangeMax: moment().add(1, "year").subtract(1, "day").format("DD/MM/YYYY"),
            isHorizontal: true,
            labelWidth: "24rem",
            isRequired: true,
            margin: "0 0 1rem"
          }
        },
        {
          key: "cp_underwritten_in_uk",
          initialValue: get(data, "page.data.cp_underwritten_in_uk", ""),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label: "Current policy underwritten in the UK?",
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
            isHorizontal: true
          }
        },
        {
          key: "cp_monthly_cost",
          initialValue: get(data, "page.data.cp_monthly_cost", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Current monthly cost",
          component: Input,
          componentProps: {
            leadingIcon: "currency-gbp",
            leadingIconType: "prepend",
            placeholder: "Amount",
            isHorizontal: true,
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        }
      ]
    }
  ]
})
