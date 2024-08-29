import { boolean } from "yup"
import { get } from "lodash"
import { H4, SmallText, List } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { Toggle } from "@4cplatform/elements/Forms"

export const config = data => ({
  title: "Start application form",
  sections: [
    {
      key: "section_1",
      components: [
        {
          key: "instruction_text",
          component: ComplianceNote,
          componentProps: {
            children: (
              <>
                <H4 margin="0 0 1rem">Processing the application</H4>{" "}
                <SmallText>
                  There are two methods avaliable to proceed past this point and complete the
                  application.
                </SmallText>
                <List type="ordered" name="instruction_text_list">
                  <li>
                    The easiest way to complete the application form is online. Where applicable,
                    the platform will capture all medical questions and allow you the opportunity to
                    submit this to the provider for terms
                  </li>
                  <li>
                    If for any reason an electronic submission is not preferred then you are able to
                    send a paper application form to the client which they can then manually
                    complete.
                  </li>
                </List>
              </>
            ),
            type: "info"
          },
          skipDataMap: true
        },
        {
          key: "complete_application_online",
          name: "complete_application_online",
          initialValue: get(data, "page.data.complete_application_online", true),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label: "Complete form electronically?",
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
    }
  ]
})
