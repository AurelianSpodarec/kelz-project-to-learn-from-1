import { boolean, string, object } from "yup"
import { Toggle, Input, Address } from "@4cplatform/elements/Forms"

export const testData = {
  page: {
    key: "CONSENT_TO_PERSONAL_INFO",
    stage: "FACT_FIND",
    route: "/journeys/ABC0M-19796/consent",
    title: "Consent to use personal information",
    navTitle: "Consent",
    sections: [
      {
        key: "section_1",
        components: [
          {
            key: "consent_to_personal_information",
            initialValue: false,
            validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
            label: "Client consent received",
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
          }
        ]
      }
    ]
  },
  journey: {
    id: 999,
    organisation_id: 999,
    network_id: 999,
    user_id: 1005,
    client_id: 999,
    reference: "ABC0M-19796",
    product_type: "PMI",
    current_page: "CLIENT_DETAILS",
    simulation_mode: true,
    complete: false,
    locked: false,
    meta: {
      pages: {
        CONSENT_TO_PERSONAL_INFO: {
          stage: "FACT_FIND",
          order: 0,
          route: "/journeys/ABC0M-19796/consent"
        }
      }
    },
    created_at: "2021-08-06T16:10:04.000000Z",
    updated_at: "2021-08-06T18:23:21.000000Z",
    deleted_at: null
  }
}

export const testData1 = {
  page: {
    key: "CLIENT_DETAILS",
    stage: "FACT_FIND",
    route: "/journeys/ABC0M-19796/client-details",
    data: [],
    title: "Client details",
    conditionals: { has_access_to_axa_agency_codes: true },
    sections: [
      {
        key: "client_details",
        components: [
          {
            key: "email_address",
            initialValue: "",
            validationSchema: string().email("INVALID_EMAIL").required("MISSING_REQUIRED_FIELD"),
            label: "Email address",
            component: Input,
            componentProps: {
              type: "email",
              isHorizontal: true,
              labelWidth: "18rem"
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
            initialValue: {
              postcode: "",
              line_one: "",
              line_two: "",
              city: "",
              county: ""
            },
            validationSchema: object({
              postcode: string().required(),
              line_one: string().required(),
              line_two: string(),
              city: string().required(),
              county: string()
            }),
            labels: {
              postcode: "Postcode",
              line_one: "Line 1",
              line_two: "Line 2",
              city: "City",
              county: "County"
            },
            component: Address,
            componentProps: {
              isHorizontal: true
            }
          }
        ]
      },
      {
        key: "other",
        title: "Other",
        components: [
          {
            key: "permanent_uk_resident",
            initialValue: false,
            validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
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
              labelWidth: "100%"
            },
            modal: {
              fieldValueTrigger: true,
              title: "Value triggered Modal",
              content:
                "<p>The modal has custom content, and it only triggers if the field's formik value matches the modal trigger.</p>"
            }
          }
        ]
      },
      {
        key: "axa_questions",
        title: "AXA Questions",
        titleHelper: "AXA Questions Title helper",
        subtitle: "In the last five years have you had or received treatment for:",
        subtitleHelper: "AXA Questions Subtitle helper",
        components: [
          {
            key: "axa_questions_had_or_received_treatment_for_heart_condition",
            initialValue: false,
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
              labelWidth: "100%"
            }
          }
        ]
      }
    ],
    modals: {
      submit: [
        {
          fieldKey: "axa_questions_had_or_received_treatment_for_heart_condition",
          fieldValueTrigger: false,
          title: "Submit Modal",
          content: "<p>Triggered via field value but only on submit</p>"
        }
      ]
    }
  },
  journey: {
    id: 999,
    organisation_id: 999,
    network_id: 999,
    user_id: 1005,
    client_id: 999,
    reference: "ABC0M-19796",
    product_type: "PMI",
    current_page: "CLIENT_DETAILS",
    simulation_mode: true,
    complete: false,
    locked: false,
    meta: {
      pages: {
        CONSENT_TO_PERSONAL_INFO: {
          stage: "FACT_FIND",
          order: 0,
          route: "/journeys/ABC0M-19796/consent"
        },
        CLIENT_DETAILS: {
          stage: "FACT_FIND",
          order: 1,
          route: "/journeys/ABC0M-19796/client-details"
        }
      }
    },
    created_at: "2021-08-06T16:10:04.000000Z",
    updated_at: "2021-08-06T18:23:21.000000Z",
    deleted_at: null
  }
}

export const getStoryJourneyPage = key => {
  switch (key) {
    case "CONSENT_TO_PERSONAL_INFO":
      return testData
    case "CLIENT_DETAILS":
      return testData1
    default:
      return testData
  }
}

export const storyHandlePageClick = key => {
  switch (key) {
    case "CONSENT_TO_PERSONAL_INFO":
      return testData
    case "CLIENT_DETAILS":
      return testData1
    default:
      return testData
  }
}
