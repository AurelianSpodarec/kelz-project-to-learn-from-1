import { boolean } from "yup"
import { get } from "lodash"

import { Toggle } from "@4cplatform/elements/Forms"
import { P, H4 } from "@4cplatform/elements/Typography"
import { ComplianceNote, RenderHTML } from "@4cplatform/elements/Molecules"

export const config = data => ({
  title: "Consent to use personal information",
  navTitle: "Consent",
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
                <H4 margin="0 0 1rem">Compliance note</H4>
                <P margin="0">Please read out the consent text below to the client.</P>
              </>
            ),
            type: "error"
          },
          skipDataMap: true
        },
        {
          key: "consent_text",
          component: ComplianceNote,
          componentProps: {
            children: (
              <>
                <H4 margin="0 0 1rem">Consent text</H4>
                <RenderHTML
                  content={get(
                    data,
                    "journey.network.settings.consent_text",
                    get(data, "journey.organisation.journey_setting.consent_text")
                  )}
                />
              </>
            ),
            type: "info"
          },
          skipDataMap: true
        },
        {
          key: "confirmation_text_prompt",
          component: P,
          componentProps: {
            children:
              "Confirm that you have client consent and/or confirm that you have complied with your network regulations."
          },
          skipDataMap: true
        }
      ]
    },
    {
      key: "section_2",
      components: [
        {
          key: "consent_to_personal_information",
          initialValue: get(data, "page.data.consent_to_personal_information", ""),
          validationSchema: boolean()
            .oneOf([true], "MUST_BE_TRUE")
            .required("MISSING_REQUIRED_FIELD"),
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
})
