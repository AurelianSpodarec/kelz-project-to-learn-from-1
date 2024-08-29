import { boolean } from "yup"
import { get } from "lodash"
import { Toggle } from "@4cplatform/elements/Forms"
import { P, H4 } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"

export const config = data => ({
  title: "Hospital list confirmation",
  sections: [
    {
      key: "section_1",
      components: [
        {
          key: "instruction_text_prompt",
          component: ComplianceNote,
          componentProps: {
            children: (
              <>
                <H4 margin="0 0 1rem">Confirm hospital list</H4>
                <P margin="0">
                  The client's hospital preference is not included on the quoted hospital list.
                  Ensure the client is aware that the hospital list selected does not contain the
                  client’s preferred hospital.
                </P>
              </>
            ),
            type: "warning"
          },
          skipDataMap: true
        },
        {
          key: "confirm_client_happy_with_selected_hospital_list",
          initialValue: get(
            data,
            "page.data.confirm_client_happy_with_selected_hospital_list",
            false
          ),
          validationSchema: boolean()
            .oneOf([true], "MUST_BE_TRUE")
            .required("MISSING_REQUIRED_FIELD"),
          label: "Client happy to proceed?",
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
})
