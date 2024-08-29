import { string } from "yup"
import { get } from "lodash"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { SmallText, H3, H4 } from "@4cplatform/elements/Typography"
import { TextArea } from "@4cplatform/elements/Forms"

// Components
import UnderwritingStyleSelects from "./underwritingStyle.selects"

export const config = data => ({
  title: "Underwriting style",
  sections: [
    {
      key: "underwriting_types",
      components: [
        {
          key: "compliance_note",
          component: ComplianceNote,
          componentProps: {
            children: (
              <>
                <H3 margin="0 0 1rem">Description of underwriting types</H3>
                <SmallText margin="0 0 2rem">
                  There are three ways in which the insurer will look to underwrite a policy and
                  provide cover for your client:
                </SmallText>
                <H4 margin="1.5rem 0 1rem">Option 1</H4>
                <SmallText>
                  Full Medical Underwriting (FMU) requires full disclosure of your medical history
                  prior to the policy start date. The application will be underwritten prior to
                  cover commencing, underwriters will review all disclosures made and will submit
                  their terms of acceptance. This form of underwriting lets you know your exclusions
                  if any, prior to the policy start date and exclusions for those stated medical
                  conditions may apply when your policy is set live.
                </SmallText>
                <H4 margin="1.5rem 0 1rem">Option 2</H4>
                <SmallText>
                  Moratorium Underwriting (Mori) does not require you to disclose your full medical
                  history at the point of sale, medical history will only need to be provided at
                  point of claim. Any medical condition that you have had symptoms, treatment,
                  medication or advice on in the 5 years prior to the policy start date is
                  automatically excluded from cover for the first 2 years of the policy. However,
                  provided certain criteria has been met, then that medical condition may be covered
                  in full. This form of underwriting offers the potential for pre-existing
                  conditions to eventually be covered on the policy.
                </SmallText>
                <H4 margin="1.5rem 0 1rem">Option 3</H4>
                <SmallText>
                  Switch Underwriting (Switch/CME) is only available to clients who have previous
                  been insured on a private medical insurance policy within the last 30 days. This
                  option allows you to carry your current underwriting terms from one insurer to
                  another. Switch is subject to set criteria questions, provided this is fulfilled
                  the criteria questions have been answered favourably, this will ensure eligible
                  conditions which were covered by your previous insurer will remain covered.
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
      key: "underwriting_options",
      components: [
        {
          key: "underwriting_options_selects",
          component: UnderwritingStyleSelects,
          skipDataMap: true
        },
        {
          key: "recommended_underwriting_note",
          initialValue: get(data, "page.data.recommended_underwriting_note", ""),
          validationSchema: string().required("MISSING_REQUIRED_FIELD"),
          label: "Notes",
          component: TextArea
        }
      ]
    }
  ],
  modals: {
    submit: [
      {
        fieldKey: "recommended_style",
        fieldValueTrigger: "SWITCH",
        title: "Switch Declarations",
        content:
          "<p>By choosing to proceed with a switch policy, acceptance of your client and any applicants to be covered will be dependent upon the insurer's switch criteria questions and their ability to answer these questions favourably</p> <br /> <p>Each insurer's switch criteria questions can be found on the Quote Comparator with an information marker next to the underwriting style.</p> <br /> <p>I confirm I have read and understand.</p>"
      }
    ]
  }
})
