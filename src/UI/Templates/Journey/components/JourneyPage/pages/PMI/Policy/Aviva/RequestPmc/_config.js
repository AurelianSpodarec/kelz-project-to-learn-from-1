import { boolean } from "yup"
import { get } from "lodash"
import { P, List } from "@4cplatform/elements/Typography"
import { Toggle } from "@4cplatform/elements/Forms"
import FileUploader from "../../../../../../FileUploader"

export const config = data => ({
  title: "Request certificate of Insurance",
  sections: [
    {
      key: "section_1",
      components: [
        {
          key: "pmc_must_meet_the_following_criteria_text_message",
          component: P,
          componentProps: {
            children:
              "Requested copy of Previous Medical Certificate (PMC) from client. PMC must meet the following criteria:"
          },
          skipDataMap: true
        },
        {
          key: "request_certificate_of_insurance_criteria_list",
          component: List,
          componentProps: {
            listType: "unordered",
            name: "request_certificate_of_insurance_criteria_list",
            children: (
              <>
                <li>Most recent certificate</li>
                <li>Letter headed paper</li>
                <li>Confirmation of members covered</li>
                <li>Original start date</li>
                <li>Underwriting method applied</li>
                <li>Underwriting method applied</li>
                <li>Confirmation of terms / exclusions</li>
              </>
            )
          },
          skipDataMap: true
        },
        {
          key: "has_pmc_been_received_text_message",
          component: P,
          componentProps: {
            children:
              "It is possible to continue with the sales journey without confirmation if the user has not confirmed that the client’s PMC has been received and meets the required criteria. However, this will be required later before being able to submit the application."
          },
          skipDataMap: true
        }
      ]
    },
    {
      key: "section_2",
      components: [
        {
          key: "pmc_received_and_meets_criteria",
          initialValue: get(data, "page.data.pmc_received_and_meets_criteria", false),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label: "PMC received and meets above criteria?",
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
            labelWidth: "39rem",
            isHorizontal: true
          }
        }
      ]
    },
    {
      key: "section_3",
      components: [
        {
          key: "request_certificate_of_insurance_criteria_heading",
          component: P,
          componentProps: {
            children:
              "Each PMC page should now be scanned and the resulting images zipped into an archive for upload (max. 3MB).",
            margin: "1rem 0 3rem 0"
          },
          skipDataMap: true
        },
        {
          key: "pmc_uploader",
          initialValue: get(data, "journey.pmc", ""),
          component: FileUploader,
          componentProps: {
            validation: {
              types: ["zip"]
            },
            type: "PMC",
            name: "pmc",
            maxFileSize: 3,
            fileSelectLabel:
              "The completed application form pages should now be scanned and the resulting images zipped into an archive for upload."
          },
          skipDataMap: true
        }
      ]
    }
  ]
})
