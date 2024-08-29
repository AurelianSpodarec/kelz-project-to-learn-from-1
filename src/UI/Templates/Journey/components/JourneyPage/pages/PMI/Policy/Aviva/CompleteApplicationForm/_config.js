import { boolean, string } from "yup"
import { Toggle, DatePicker } from "@4cplatform/elements/Forms"
import moment from "moment"
import { get } from "lodash"
import FileUploader from "../../../../../../FileUploader"

export const config = data => ({
  title: "Complete application form",
  sections: [
    {
      key: "section_1",
      components: [
        {
          key: "application_form_received_from_client",
          initialValue: get(data, "page.data.application_form_received_from_client", false),
          validationSchema: boolean()
            .oneOf([true], "MUST_BE_TRUE")
            .required("MISSING_REQUIRED_FIELD"),
          label: "Application form received from client?",
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
          key: "form_platform_underwriting_matches",
          initialValue: get(data, "page.data.form_platform_underwriting_matches", false),
          validationSchema: boolean()
            .oneOf([true], "MUST_BE_TRUE")
            .required("MISSING_REQUIRED_FIELD"),
          label: "Form / platform underwriting matches?",
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
          key: "form_platform_premium_matches",
          initialValue: get(data, "page.data.form_platform_premium_matches", false),
          validationSchema: boolean()
            .oneOf([true], "MUST_BE_TRUE")
            .required("MISSING_REQUIRED_FIELD"),
          label: "Form / platform premium matches?",
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
          key: "form_platform_start_date_matches",
          initialValue: get(data, "page.data.form_platform_start_date_matches", false),
          validationSchema: boolean()
            .oneOf([true], "MUST_BE_TRUE")
            .required("MISSING_REQUIRED_FIELD"),
          label: "Form / platform start date matches?",
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
          key: "all_relevant_check_boxes_ticked_as_required",
          initialValue: get(data, "page.data.all_relevant_check_boxes_ticked_as_required", false),
          validationSchema: boolean()
            .oneOf([true], "MUST_BE_TRUE")
            .required("MISSING_REQUIRED_FIELD"),
          label: "All relevant boxes ticked as required?",
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
          key: "form_signed_and_dated_correctly",
          initialValue: get(data, "page.data.form_signed_and_dated_correctly", false),
          validationSchema: boolean()
            .oneOf([true], "MUST_BE_TRUE")
            .required("MISSING_REQUIRED_FIELD"),
          label: "Form signed and dated correctly?",
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
        }
      ]
    },
    {
      key: "section_2",
      components: [
        {
          key: "signature_date_on_application",
          initialValue: get(data, "page.data.signature_date_on_application", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Please confirm the signature date on the application",
          component: DatePicker,
          componentProps: {
            dateRangeMax: moment().format("DD/MM/YYYY"),
            dateRangeMin: moment().subtract(1, "month").format("DD/MM/YYYY"),
            isHorizontal: false,
            isRequired: true,
            labelWidth: "24rem",
            width: "50%"
          }
        }
      ]
    },
    {
      key: "section_3",
      components: [
        {
          key: "paper_application_form_uploader",
          initialValue: get(data, "journey.paper_application_form", ""),
          component: FileUploader,
          componentProps: {
            validation: {
              types: ["zip"]
            },
            type: "PAPER_APPLICATION_FORM",
            name: "paper_application_form",
            fileSelectLabel:
              "The completed application form pages should now be scanned and the resulting images zipped into an archive for upload."
          },
          skipDataMap: true
        }
      ]
    }
  ]
})
