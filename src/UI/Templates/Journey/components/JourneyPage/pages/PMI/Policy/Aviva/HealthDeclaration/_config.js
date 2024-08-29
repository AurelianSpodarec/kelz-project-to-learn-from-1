import { boolean } from "yup"
import { P, SmallText } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { Toggle } from "@4cplatform/elements/Forms"
import { get } from "lodash"

export const config = data => ({
  title: "Aviva Health Declaration",
  navTitle: "Aviva Health Declaration",
  sections: [
    {
      key: "section_1",
      components: [
        {
          key: "compliance_note",
          component: ComplianceNote,
          componentProps: {
            children: (
              <>
                <P margin="0 0 1rem">Compliance Note</P>
                <SmallText>
                  Your application will now be electronically submitted to Aviva. Your policy will
                  be enrolled and commence from the start date you have chosen. A policy number will
                  be generated, and you will receive your documentation in the post. Within the
                  documentation will be the medical questionnaire I referenced earlier in the call.
                  Please complete the medical questionnaire and return this to Aviva. They will then
                  determine based on your disclosures if any medical conditions will be excluded
                  from cover. Aviva will then issue documents to you confirming if any exclusions
                  have been applied. If any new conditions or symptoms arise in the meantime,
                  providing it is after the start date you have chosen then a claim can be made and
                  will be assessed subject to the benefit options selected and the general Terms &
                  Conditions. If the client would like an indication of terms prior to onboarding,
                  please contact Aviva's underwriting team prior to progressing to the next stage.
                </SmallText>
              </>
            ),
            type: "info"
          },
          skipDataMap: true
        }
      ]
    },
    {
      key: "section_2",
      components: [
        {
          key: "client_confirmed_understood_avivas_health_declaration",
          component: Toggle,
          initialValue: get(
            data,
            "page.data.client_confirmed_understood_avivas_health_declaration",
            false
          ),
          validationSchema: boolean()
            .oneOf(
              [true],
              "It is not possible to continue with the sales journey if the client has not confirmed their understanding of the Health Declaration."
            )
            .required("MISSING_REQUIRED_FIELD"),
          label: "Has the client confirmed they understand?",
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
