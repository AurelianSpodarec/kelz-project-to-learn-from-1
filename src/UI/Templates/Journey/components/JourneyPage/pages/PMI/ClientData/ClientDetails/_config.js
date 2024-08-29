import React, { useContext } from "react"
import moment from "moment"
import { string, object, boolean, array } from "yup"
import { get } from "lodash"
import { isValidPhoneNumber } from "react-phone-number-input"
import { renderTitleOptions } from "@4cplatform/elements/Helpers/forms"
import {
  Input,
  Toggle,
  Address,
  DatePicker,
  Select,
  QuerySelect,
  PhoneNumbers
} from "@4cplatform/elements/Forms"
import { P } from "@4cplatform/elements/Typography"
import { ConfigContext } from "@4cplatform/elements/Config"
import { JourneyContext } from "../../../../../.."

const TitleOptions = () => {
  const { LOADING_TITLES, GLOBAL_TITLES } = useContext(ConfigContext)
  const { formik } = useContext(JourneyContext)
  return (
    <>
      {LOADING_TITLES ? (
        <option value="">Loading titles</option>
      ) : (
        <option value="">Select title</option>
      )}
      {renderTitleOptions(GLOBAL_TITLES?.data, formik, "client.gender_at_birth")}
    </>
  )
}

export const config = data => {
  const conditionalSection = get(data, "page.conditionals.has_access_to_axa_agency_codes", false)
    ? [
        {
          key: "axa_questions",
          title: "AXA Questions",
          titleHelper:
            "<p>If you choose the moratorium option, there are some other specified conditions that we will not cover (as listed below).</p><p>If you have diabetes, treatment of the specified conditions below are also not covered:</p><ul><li>Diabetes</li><li>Coronary heart disease (ischaemic heart disease)</li><li>Cataracts</li><li>Disease to the retina in the eye caused by diabetes (diabetic retinopathy)</li><li>Disease in the kidneys caused by diabetes (diabetic renal disease)</li><li>Arterial disease</li><li>Stroke</li></ul><p>If you are having treatment for high blood pressure, treatment of the specified conditions below are also not covered:</p><ul><li>Raised blood pressure (hypertension)</li><li>Coronary heart disease (ischaemic heart disease)</li><li>Stroke</li><li>Kidney failure caused by high blood pressure (hypertensive renal failure)</li></ul><p>If you are under investigation, having treatment or are undergoing monitoring as a result of a Prostate Specific Antigen (PSA) test, we will not cover treatment of:</p><ul><li>Any prostate conditions</li></ul>",
          components: [
            {
              key: "preamble",
              component: P,
              componentProps: {
                children: "In the last five years have you had or received treatment for:"
              },
              skipDataMap: true
            },
            {
              key: "axa_questions.last_5_years_heart_condition_or_heart_problem",
              initialValue: get(
                data,
                "page.data.last_5_years_heart_condition_or_heart_problem",
                false
              ),
              validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
              label: "Heart condition or heart problem",
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
                labelWidth: "39.5rem",
                margin: "0 0 2rem"
              }
            },
            {
              key: "axa_questions.last_5_years_stroke",
              initialValue: get(data, "page.data.last_5_years_stroke", false),
              validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
              label: "Stroke",
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
                labelWidth: "39.5rem",
                margin: "0 0 2rem"
              }
            },
            {
              key: "axa_questions.last_5_years_cancer",
              initialValue: get(data, "page.data.last_5_years_cancer", false),
              validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
              label: "Cancer",
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
                labelWidth: "39.5rem",
                margin: "0 0 2rem"
              },
              modal: {
                fieldValueTrigger: !get(data, "page.data.last_5_years_cancer", false),
                title: "Cancer",
                content:
                  "<p>Please be advised, by answering <strong>Yes</strong> to this question, your client will not be eligible for Full Cancer Cover with AXA PPP, Health-On-Line or InSpire policies and will only be eligible for NHS Cancer Support.</p>",
                confirmation: true
              }
            },
            {
              key: "axa_questions.last_5_years_diabetes",
              initialValue: get(data, "page.data.last_5_years_diabetes", false),
              validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
              label: "Diabetes",
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
                labelWidth: "39.5rem",
                margin: "0 0 2rem"
              }
            },
            {
              key: "axa_questions.last_5_years_mental_illness",
              initialValue: get(data, "page.data.last_5_years_mental_illness", false),
              validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
              label: "Mental illness",
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
                labelWidth: "39.5rem",
                margin: "0 0 2rem"
              },
              modal: {
                fieldValueTrigger: !get(data, "page.data.last_5_years_mental_illness", false),
                title: "Mental illness",
                content:
                  "<p>Please be advised, by answering <strong>Yes</strong> to this question, your client will not be eligible to add Mental Health cover onto their policy when quoting with AXA PPP, Health-On-Line or InSpire.</p>",
                confirmation: true
              }
            }
          ]
        }
      ]
    : []

  return {
    title: "Client details",
    sections: [
      {
        key: "client_details",
        components: [
          {
            key: "client.email_address",
            initialValue: get(data, "journey.client.email_address", ""),
            validationSchema: string().email("INVALID_EMAIL").required("MISSING_REQUIRED_FIELD"),
            label: "Email address",
            component: Input,
            componentProps: {
              type: "email",
              isHorizontal: true,
              isRequired: true,
              margin: "0 0 2rem"
            }
          },
          {
            key: "client.first_name",
            initialValue: get(data, "journey.client.first_name", ""),
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
            key: "client.middle_names",
            initialValue: get(data, "journey.client.middle_names", ""),
            validationSchema: string().nullable(),
            label: "Middle name(s)",
            component: Input,
            componentProps: {
              isHorizontal: true,
              margin: "0 0 2rem"
            }
          },
          {
            key: "client.last_name",
            initialValue: get(data, "journey.client.last_name", ""),
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
            key: "client.date_of_birth",
            initialValue: get(data, "journey.client.date_of_birth", ""),
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
            key: "client.gender_at_birth",
            initialValue: get(data, "journey.client.gender_at_birth", ""),
            validationSchema: string().required("MISSING_REQUIRED_FIELD"),
            label: "Gender at birth",
            component: Select,
            componentProps: {
              isHorizontal: true,
              isRequired: true,
              margin: "0 0 2rem",
              options: [
                { order: 0, label: "Male", value: "male" },
                { order: 1, label: "Female", value: "female" }
              ]
            }
          },
          {
            key: "client.title",
            initialValue: get(data, "journey.client.title", ""),
            validationSchema: string().required("MISSING_REQUIRED_FIELD"),
            label: "Title",
            component: Select,
            componentProps: {
              isHorizontal: true,
              isRequired: true,
              margin: "0 0 2rem",
              children: <TitleOptions />
            }
          },
          {
            key: "client.occupation",
            initialValue: get(data, "journey.client.occupation", ""),
            validationSchema: string().required("MISSING_REQUIRED_FIELD"),
            label: "Occupation",
            component: QuerySelect,
            componentProps: {
              isHorizontal: true,
              isRequired: true,
              helperText:
                "<p>Please note that some insurers apply a discount to the premium should the client disclose that they fall under one of the selected occupations. Your client may be asked to provide evidence of their occupation in order to be eligible for any discounts applied. If your client is unable or unwilling to provide evidence of their occupation, please mark their occupation as Other.</p>",
              margin: "0 0 2rem",
              noun: { singular: "occupation", plural: "occupations" },
              endpoint: "/occupations",
              render: jobs => {
                const keys = Object.keys(jobs)
                return keys.map(key => (
                  <option key={key} value={key}>
                    {jobs[key]}
                  </option>
                ))
              }
            }
          },
          {
            key: "phone_numbers",
            initialValue: get(data, "journey.client.phone_numbers", [
              { type: "PRIMARY", number: "" }
            ]),
            validationSchema: array(
              object({
                type: string().required(),
                number: string()
                  .test("Phone invalid", "INVALID_UK_PHONE", val => {
                    if (!val) return false
                    return isValidPhoneNumber(val, "GB")
                  })
                  .required("MISSING_REQUIRED_FIELD")
              })
            )
              .required("MIN_LENGTH_NOT_MET")
              .min(1),
            label: "Phone numbers",
            component: PhoneNumbers,
            componentProps: {
              isHorizontal: true,
              margin: "0 0 2rem"
            }
          }
        ]
      },
      {
        key: "address",
        title: "Address",
        components: [
          {
            key: "address",
            initialValue: get(data, "journey.client.address", {
              postcode: "",
              line_one: "",
              line_two: "",
              city: "",
              county: ""
            }),
            validationSchema: object({
              postcode: string()
                .test("correctUkPostcode", "CORRECT_UK_POSTCODE", no =>
                  /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/.test(no)
                )
                .required("MISSING_REQUIRED_FIELD"),
              line_one: string().required(),
              line_two: string().nullable(),
              city: string().required(),
              county: string().required()
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
      },
      {
        key: "questions",
        title: "Other",
        components: [
          {
            key: "questions.permanent_uk_resident",
            initialValue: get(data, "page.data.permanent_uk_resident", false),
            validationSchema: boolean()
              .oneOf([true], "MUST_BE_TRUE")
              .required("MISSING_REQUIRED_FIELD"),
            label: "Is the client a permanent UK resident?",
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
              labelWidth: "39.5rem",
              margin: "0 0 2rem"
            }
          },
          {
            key: "questions.covered_with_a_gp_and_access_to_medical_records",
            initialValue: get(
              data,
              "page.data.covered_with_a_gp_and_access_to_medical_records",
              false
            ),
            validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
            label:
              "Is the person to be covered registered with a GP and do they have access to their medical records in English?",
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
              labelWidth: "auto",
              margin: "0 0 2rem"
            }
          },
          {
            key: "questions.pmi_required_to_fulfil_reqs_or_visa",
            initialValue: get(data, "page.data.pmi_required_to_fulfil_reqs_or_visa", false),
            validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
            label:
              "Is PMI required in order to fulfil home office requirements and/or a visa application?",
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
              labelWidth: "auto",
              margin: "0 0 2rem"
            }
          },
          {
            key: "questions.tobacco_products_within_last_2_years",
            initialValue: get(data, "page.data.tobacco_products_within_last_2_years", false),
            validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
            label: "Has the client used any tobacco products within the last 2 years?",
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
              labelWidth: "auto",
              margin: "0 0 2rem"
            }
          },
          {
            key: "questions.payment_for_participating_in_sport",
            initialValue: get(data, "page.data.payment_for_participating_in_sport", false),
            validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
            label: "Do any of the applicants receive payment for participating in sport?",
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
              labelWidth: "auto",
              margin: "0 0 2rem"
            },
            modal: {
              fieldValueTrigger: !get(data, "page.data.payment_for_participating_in_sport", false),
              title: "Sport-related Injury",
              content:
                "<p>Please ensure that your client is aware that no insurer will provide cover for any injury that occurs directly from or as a result of participating in a paid or funded sport.</p><p>In some cases, this is an eligibility criteria question and the insurer will look to decline cover for any applicants who can answer YES to this question.</p><h4>Insurer's Stance</h4><p>Bupa will not provide cover for a professional sports person, or a semi-professional sports persion who follows a sport occupation as a secondary means of livelihood.</p>"
            }
          }
        ]
      },
      ...conditionalSection
    ]
  }
}
