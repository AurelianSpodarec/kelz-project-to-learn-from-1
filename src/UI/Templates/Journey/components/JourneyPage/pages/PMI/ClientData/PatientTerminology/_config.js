import { boolean } from "yup"
import { get } from "lodash"

import { P, SmallText } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { Toggle } from "@4cplatform/elements/Forms"

export const config = data => ({
  title: "Explain patient terminology",
  navTitle: "Patient terminology",
  subtitle: "",
  sections: [
    {
      key: "section_1",
      components: [
        {
          key: "compliance_note_1",
          component: ComplianceNote,
          componentProps: {
            children: (
              <>
                <P margin="0 0 1rem">Compliance Note</P>
                <SmallText>
                  Explain the below terminology and confirm the client understands.
                </SmallText>
              </>
            ),
            type: "error"
          },
          skipDataMap: true
        },
        {
          key: "compliance_note_2",
          component: ComplianceNote,
          componentProps: {
            children: (
              <>
                <P margin="0 0 1rem">Out-Patient:</P>
                <SmallText>
                  This is where the patient visits a hospital, clinic or associated facility for
                  diagnosis or treatment however a hospital bed is not required. An example of which
                  would be a blood test or X-Ray.
                </SmallText>
                <P margin="0 0 1rem">Day-Patient:</P>
                <SmallText>
                  This is where the patient visits a hospital, clinic or associated facility for
                  diagnosis or treatment and a hospital bed is required for during the day however
                  is not required for an overnight stay. An example of which would be the client
                  receiving a short course of treatment.
                </SmallText>
                <P margin="0 0 1rem">In-Patient:</P>
                <SmallText>
                  This is where the patient occupies a hospital bed overnight or longer, in order to
                  undergo medical investigations or treatment. An example of which would be the
                  client recovering from surgery.
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
          key: "understood_inpatient_outpatient",
          initialValue: get(data, "page.data.understood_inpatient_outpatient", ""),
          validationSchema: boolean()
            .oneOf([true], "MUST_BE_TRUE")
            .required("MISSING_REQUIRED_FIELD"),
          label: "Has the client confirmed they understand?",
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
