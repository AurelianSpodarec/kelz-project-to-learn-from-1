import { boolean } from "yup"
import { get } from "lodash"
import { Toggle } from "@4cplatform/elements/Forms"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { P, H4 } from "@4cplatform/elements/Typography"

export const config = data => ({
  title: "Third Party Payer Approval",
  subtitle: "",
  sections: [
    {
      key: "third_party_payer_approval",
      components: [
        {
          key: "compliance_note",
          component: ComplianceNote,
          componentProps: {
            children: (
              <>
                <H4 margin="0 0 1rem">Compliance note</H4>
                <P margin="0">
                  As the policy holder is not paying the premiums on the policy, approval is
                  required from the third party payer before you can proceed. By answering yes to
                  the below question you are confirming that you have spoken to the third party
                  payer, with the appropriate authority, who in turn has authorised payments to be
                  debited from the account.
                </P>
              </>
            ),
            type: "info"
          },
          skipDataMap: true
        },
        {
          key: "third_party_payer_approval",
          initialValue: get(data, "page.data.third_party_payer_approval", false),
          validationSchema: boolean()
            .oneOf([true], "MUST_BE_TRUE")
            .required(
              "It is not possible to continue with the sales journey if the client has not confirmed that the third party payer approves payments to be debited from their account"
            ),
          label: "Approval by third party payer is required",
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
            labelWidth: "50rem"
          }
        }
      ]
    }
  ]
})
