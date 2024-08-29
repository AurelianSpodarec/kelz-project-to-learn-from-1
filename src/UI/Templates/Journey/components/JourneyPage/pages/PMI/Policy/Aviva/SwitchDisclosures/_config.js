import { boolean } from "yup"
import { get } from "lodash"

import DisclosureNotes from "../../../../../../DisclosureNotes"
import NoteFormTemplate from "./noteFormTemplate"
import NoteDisplayTemplate from "./noteDisplayTemplate"

export const config = data => ({
  title: "Switch disclosures",
  sections: [
    {
      key: "section_1",
      components: [
        {
          key: "symptoms_consultations_tests_treatments_last_12_months",
          name: "symptoms_consultations_tests_treatments_last_12_months",
          initialValue: get(
            data,
            "page.data.'symptoms_consultations_tests_treatments_last_12_months",
            false
          ),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label:
            "Have you or any person to be covered by this policy experienced symptoms or had any consultations, diagnostic tests or treatment in the last 12 months or do you have appointments planned with a GP, specialist, or a hospital in the future?",
          component: DisclosureNotes,
          componentProps: {
            options: [
              { order: 0, label: "No", value: false },
              { order: 1, label: "Yes", value: true }
            ],
            noteFormTemplate: NoteFormTemplate,
            noteDisplayTemplate: NoteDisplayTemplate,
            isHorizontal: true
          }
        },
        {
          key: "consultations_tests_treatments_last_5_years_relating_to_cancer",
          name: "consultations_tests_treatments_last_5_years_relating_to_cancer",
          initialValue: get(
            data,
            "page.data.consultations_tests_treatments_last_5_years_relating_to_cancer",
            false
          ),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label:
            "Have you or any person to be covered by this policy had any consultations, test, medication or treatment in the last 5 years relating to any type of cancer or suspected cancer (if the consultations or tests are part or routine NHS screening programmes and resulted in no further action then you do not need to tick yes to this question)?",
          component: DisclosureNotes,
          componentProps: {
            options: [
              { order: 0, label: "No", value: false },
              { order: 1, label: "Yes", value: true }
            ],
            noteFormTemplate: NoteFormTemplate,
            noteDisplayTemplate: NoteDisplayTemplate,
            isHorizontal: true
          }
        },
        {
          key: "consultations_tests_treatments_last_5_years_relating_to_heart_conditions",
          name: "consultations_tests_treatments_last_5_years_relating_to_heart_conditions",
          initialValue: get(
            data,
            "page.data.consultations_tests_treatments_last_5_years_relating_to_heart_conditions",
            false
          ),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label:
            "Have you or any person to be covered by this policy had any consultations, test, medication or treatment in the last 5 years relating to any form of heart, circulatory or vascular conditions or symptoms (including stroke, hypertension and raised cholesterol), or diabetes?",
          component: DisclosureNotes,
          componentProps: {
            options: [
              {
                order: 0,
                label: "No",

                value: false
              },
              { order: 1, label: "Yes", value: true }
            ],
            noteFormTemplate: NoteFormTemplate,
            noteDisplayTemplate: NoteDisplayTemplate,
            isHorizontal: true
          }
        },
        {
          key: "consultations_tests_treatments_last_5_years_relating_to_mental_illness",
          name: "consultations_tests_treatments_last_5_years_relating_to_mental_illness",
          initialValue: get(
            data,
            "page.data.consultations_tests_treatments_last_5_years_relating_to_mental_illness",
            false
          ),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label:
            "Have you or any person to be covered by this policy had any consultations, test, medication or treatment in the last 5 years relating to any psychiatric or mental illness or conditions (only relevant if selecting the mental health option)?",
          component: DisclosureNotes,
          componentProps: {
            options: [
              { order: 0, label: "No", value: false },
              { order: 1, label: "Yes", value: true }
            ],
            noteFormTemplate: NoteFormTemplate,
            noteDisplayTemplate: NoteDisplayTemplate,
            isHorizontal: true
          }
        }
      ]
    }
  ]
})
