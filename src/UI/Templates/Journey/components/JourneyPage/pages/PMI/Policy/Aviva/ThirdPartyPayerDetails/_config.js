import moment from "moment"
import { string, object } from "yup"
import { get } from "lodash"
import { renderTitleOptions } from "@4cplatform/elements/Helpers/forms"
import { Input, Address, DatePicker, Select, QuerySelect } from "@4cplatform/elements/Forms"

export const config = data => ({
  title: `${
    get(data, "page.data.third_party_payer_account_type", "").charAt(0).toUpperCase() +
    get(data, "page.data.third_party_payer_account_type", "").slice(1).toLowerCase()
  } Third party payer details`,
  sections: [
    {
      key: "account_holder",
      components: [
        ...(get(data, "page.data.third_party_payer_account_type", "") === "COMPANY"
          ? [
              {
                key: "company_name",
                initialValue: get(data, "page.data.company_name", ""),
                validationSchema: string().required("MISSING_REQUIRED_FIELD"),
                label: "Company name",
                component: Input,
                componentProps: {
                  isHorizontal: true,
                  isRequired: true,
                  margin: "0 0 2rem"
                }
              }
            ]
          : []),
        {
          key: "first_name",
          initialValue: get(data, "page.data.first_name", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "First name",
          component: Input,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            margin: "0 0 2rem"
          }
        },
        {
          key: "last_name",
          initialValue: get(data, "page.data.last_name", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Last name",
          component: Input,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            margin: "0 0 2rem"
          }
        },
        {
          key: "middle_names",
          initialValue: get(data, "page.data.middle_names", ""),
          validationSchema: string().nullable(),
          label: "Middle name(s)",
          component: Input,
          componentProps: {
            isHorizontal: true,
            margin: "0 0 2rem"
          }
        },
        {
          key: "date_of_birth",
          initialValue: get(data, "page.data.date_of_birth", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Date of birth",
          component: DatePicker,
          componentProps: {
            dateRangeMax: moment().subtract(18, "years").format("DD/MM/YYYY"),
            isHorizontal: true,
            isRequired: true,
            margin: "0 0 1rem"
          }
        },
        {
          key: "gender_at_birth",
          initialValue: get(data, "page.data.gender_at_birth", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Gender at birth",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            children: (
              <>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </>
            ),
            margin: "0 0 2rem"
          }
        },
        {
          key: "title",
          initialValue: get(data, "page.data.title", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Title",
          component: QuerySelect,
          componentProps: {
            dependantField: "gender_at_birth",
            isHorizontal: true,
            isRequired: true,
            margin: "0 0 2rem",
            noun: { singular: "title", plural: "titles" },
            endpoint: "/dmz/titles",
            render: renderTitleOptions
          }
        },
        {
          key: "phone",
          initialValue: get(data, "page.data.phone", ""),
          validationSchema: string()
            .test("Phone invalid", "INVALID_PHONE", val => {
              if (!val) return false
              return /^\d+$/.test(val)
            })
            .required("MISSING_REQUIRED_FIELD"),
          label: "Phone number",
          component: Input,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            margin: "0 0 2rem"
          }
        },
        {
          key: "email_address",
          initialValue: get(data, "page.data.email_address", ""),
          validationSchema: string().email("INVALID_EMAIL").required("MISSING_REQUIRED_FIELD"),
          label: "Email address",
          component: Input,
          componentProps: {
            type: "email",
            isHorizontal: true,
            isRequired: true,
            margin: "0 0 2rem"
          }
        }
      ]
    },
    {
      key: "account_address",
      title: "Account holder address",
      components: [
        {
          key: "address",
          initialValue: get(data, "page.data.address", {
            postcode: "",
            line_one: "",
            line_two: "",
            city: "",
            county: ""
          }),
          validationSchema: object({
            postcode: string().required("MISSING_REQUIRED_FIELD"),
            line_one: string().required("MISSING_REQUIRED_FIELD"),
            line_two: string(),
            city: string().required("MISSING_REQUIRED_FIELD"),
            county: string().required("MISSING_REQUIRED_FIELD")
          }),
          labels: {
            type: "Type",
            postcode: "Postcode",
            line_one: "Line 1",
            line_two: "Line 2",
            city: "City",
            county: "County"
          },
          component: Address,
          componentProps: {
            isHorizontal: true,
            labelWidth: "30rem",
            margin: "0 0 2rem"
          }
        }
      ]
    }
  ]
})
