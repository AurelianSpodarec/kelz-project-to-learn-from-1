import { string } from "yup"
import { get } from "lodash"
import { Toggle, Select } from "@4cplatform/elements/Forms"

// Helpers
import { getOptions } from "./currentPolicyOptions.helpers"

export const config = data => ({
  title: "Current policy options",
  navTitle: "Current policy options",
  sections: [
    {
      key: "current_policy_options",
      components: [
        {
          key: "cp_payment_frequency",
          initialValue: get(data, "page.data.cp_payment_frequency", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Payment Frequency",
          component: Toggle,
          componentProps: {
            limit: 4,
            options: getOptions("cp_payment_frequency"),
            isHorizontal: true,
            labelWidth: "auto"
          }
        },
        {
          key: "cp_underwriting",
          initialValue: get(data, "page.data.cp_underwriting", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Underwriting type",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            options: getOptions("cp_underwriting"),
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        },
        {
          key: "cp_excess",
          initialValue: get(data, "page.data.cp_excess", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Excess",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            options: getOptions("cp_excess"),
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        },
        {
          key: "cp_excess_type",
          initialValue: get(data, "page.data.cp_excess_type", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Excess type",
          component: Toggle,
          componentProps: {
            limit: 4,
            options: getOptions("cp_excess_type"),
            isHorizontal: true,
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        },
        {
          key: "cp_in_day_patient_treatment",
          initialValue: get(data, "page.data.cp_in_day_patient_treatment", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "In/Day Patient Treatment",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            options: getOptions("cp_in_day_patient_treatment"),
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        },
        {
          key: "cp_outpatient",
          initialValue: get(data, "page.data.cp_outpatient", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Outpatient Treatment",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            options: getOptions("cp_outpatient"),
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        },
        {
          key: "cp_outpatient_diagnostics",
          initialValue: get(data, "page.data.cp_outpatient_diagnostics", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Outpatient Diagnostics",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            options: getOptions("cp_outpatient_diagnostics"),
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        },
        {
          key: "cp_therapies",
          initialValue: get(data, "page.data.cp_therapies", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Therapies",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            options: getOptions("cp_therapies"),
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        },
        {
          key: "cp_mental_health",
          initialValue: get(data, "page.data.cp_mental_health", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Mental health",
          component: Toggle,
          componentProps: {
            limit: 4,
            options: getOptions("cp_mental_health"),
            isHorizontal: true,
            labelWidth: "auto"
          }
        },
        {
          key: "cp_protected_no_claims",
          initialValue: get(data, "page.data.cp_protected_no_claims", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Protected no claims",
          component: Toggle,
          componentProps: {
            limit: 4,
            options: getOptions("cp_protected_no_claims"),
            isHorizontal: true,
            labelWidth: "auto"
          }
        },
        {
          key: "cp_six_week",
          initialValue: get(data, "page.data.cp_six_week", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "6 week option",
          component: Toggle,
          componentProps: {
            limit: 4,
            options: getOptions("cp_six_week"),
            isHorizontal: true,
            labelWidth: "auto"
          }
        },
        {
          key: "cp_dental_and_optical",
          initialValue: get(data, "page.data.cp_dental_and_optical", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Dental and optical",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            options: getOptions("cp_dental_and_optical"),
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        },
        {
          key: "cp_cancer_cover",
          initialValue: get(data, "page.data.cp_cancer_cover", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Cancer cover",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            options: getOptions("cp_cancer_cover"),
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        },
        {
          key: "cp_travel_cover",
          initialValue: get(data, "page.data.cp_travel_cover", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Travel cover",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            options: getOptions("cp_travel_cover"),
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        },
        {
          key: "cp_private_gp",
          initialValue: get(data, "page.data.cp_private_gp", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Private GP",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            options: getOptions("cp_private_gp"),
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        },
        {
          key: "cp_extended_cover",
          initialValue: get(data, "page.data.cp_extended_cover", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Extended cover",
          component: Toggle,
          componentProps: {
            limit: 4,
            options: getOptions("cp_extended_cover"),
            isHorizontal: true,
            labelWidth: "auto"
          }
        },
        {
          key: "cp_hospital_list",
          initialValue: get(data, "page.data.cp_hospital_list", "Don’t know"),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Hospital List",
          component: Select,
          componentProps: {
            isHorizontal: true,
            isRequired: true,
            options: getOptions("cp_hospital_list"),
            labelWidth: "24rem",
            margin: "0 0 2rem"
          }
        }
      ]
    }
  ]
})
