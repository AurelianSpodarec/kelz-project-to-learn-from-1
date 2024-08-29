import { boolean } from "yup"
import { get } from "lodash"

import { Toggle } from "@4cplatform/elements/Forms"
import { P } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"

export const config = data => ({
  title: " Medical history",
  navTitle: "Medical history",
  subtitle: " An opportunity to discuss and make notes on the client’s previous medical history",
  sections: [
    {
      key: "compliance_note",
      components: [
        {
          key: "compliance_note",
          component: ComplianceNote,
          componentProps: {
            children: (
              <P>
                In order to determine the best advice for the client it is important to ask the
                following questions:
              </P>
            ),
            type: "error"
          },
          skipDataMap: true
        }
      ]
    },
    {
      key: "medical_history",
      components: [
        {
          key: "anyone_had_consultations_tests_therapies_or_treatment_last_twelve_months",
          initialValue: get(
            data,
            "page.data.anyone_had_consultations_tests_therapies_or_treatment_last_twelve_months",
            ""
          ),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label:
            "Have you or any person to be covered by this policy had any GP and/or specialist consultations, tests, therapies or treatment (NHS or Private) in the last 12 months?",
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
        },
        {
          key: "anyone_had_consultations_tests_medication_or_treatment_last_five_years",
          initialValue: get(
            data,
            "page.data.anyone_had_consultations_tests_medication_or_treatment_last_five_years",
            ""
          ),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label:
            "Have you or any person to be covered by this policy had any hospital and/or specialist consultations, tests, medication or treatment (NHS or Private) in the last 5 years?",
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
        },
        {
          key: "anyone_had_treatment_for_cancer_heart_disease_psychiatric_orthopaedic_last_five_years",
          initialValue: get(
            data,
            "page.data.anyone_had_treatment_for_cancer_heart_disease_psychiatric_orthopaedic_last_five_years",
            ""
          ),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label:
            "Have you or any person to be covered by this policy ever had treatment (NHS or Private) for Cancer, Heart Disease, (and circulatory) Psychiatric Conditions or Orthopaedic in the last 5 years?",
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
        },
        {
          key: "any_appointments_planned_or_pending_in_the_future",
          initialValue: get(
            data,
            "page.data.any_appointments_planned_or_pending_in_the_future",
            ""
          ),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label:
            "Do you currently have appointments planned or pending with a GP, Specialist or a hospital in the future (NHS or Private)?",
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
