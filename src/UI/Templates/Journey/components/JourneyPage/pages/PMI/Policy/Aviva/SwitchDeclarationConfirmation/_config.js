import { boolean } from "yup"
import { get } from "lodash"
import { Toggle } from "@4cplatform/elements/Forms"
import { P, H3, List, SmallText } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"

export const config = data => ({
  title: "Switch declaration confirmation",
  sections: [
    {
      key: "section_1",
      components: [
        {
          key: "section_1_1",
          component: P,
          componentProps: {
            children:
              "In order for us to determine your underwriting terms, we may contact your doctor(s) for a medical report. If we do approach your doctor, we will tell you that that we have done so. We will not approach your doctor as an alternative to an incomplete form."
          },
          skipDataMap: true
        },
        {
          key: "section_1_2",
          component: P,
          componentProps: {
            children:
              "However, before we can apply for a medical report from you/your dependant’s doctor(s) we need consent to do so. You should be aware that you have certain rights under the Access to Medical Reports Act 1988 or the Access to Personal Files and Medical Reports (Northern Ireland) Order 1991. The main points of the act are:"
          },
          skipDataMap: true
        },
        {
          key: "section_1_3",
          component: List,
          componentProps: {
            type: "ordered",
            name: "information_text",
            children: (
              <>
                <li>
                  We will write to you at the same time as we contact your doctor. If you indicate
                  that you wish to see the report, we will tell your doctor that you have asked to
                  see the report and you will have 21 days to contact your doctor to make
                  arrangements to do so. When you have seen the report the doctor may not send it to
                  us until you have given your consent to do so. If your do not contact your doctor
                  within 21 days the report will be sent to us.
                </li>
                <li>
                  You can ask your doctor if he/she will amend any part of the report which you
                  consider to be incorrect of misleading. If your doctor is not in agreement, you
                  may attach your comments.
                </li>
                <li>
                  During the six months after we have received your report you may ask your doctor
                  for a copy. If you ask for a personal copy of the report the doctor can charge you
                  a fee to cover the cost.
                </li>
                <li>
                  In some circumstances the doctor may decide, in the interest of your health, or to
                  respect the interest of other persons, that you should not see all or part of the
                  report. The doctor will tell you of this and you will have the right to see any
                  remaining part of the report. If your doctor decides that you should not see any
                  of the report, he will not give it to us without your consent
                </li>
                <li>
                  In some circumstances the doctor may decide, in the interest of your health, or to
                  respect the interest of other persons, that you should not see all or part of the
                  report. The doctor will tell you of this and you will have the right to see any
                  remaining part of the report. If your doctor decides that you should not see any
                  of the report, he will not give it to us without your consent.
                </li>
              </>
            )
          },
          skipDataMap: true
        },
        {
          key: "section_1_4",
          component: H3,
          componentProps: {
            children: "Authorisation for the release of medical information"
          },
          skipDataMap: true
        },
        {
          key: "section_1_5",
          component: P,
          componentProps: {
            children:
              "I have read the section about my rights under the Access to Medical Reports Act 1988 (or the Access to Personal Files and Medical Reports (Northern Ireland) Order 1991). I agree to the provision of any and/or all of my records to Aviva in connection with this application."
          },
          skipDataMap: true
        },
        {
          key: "section_1_6",
          component: P,
          componentProps: {
            children:
              "By Signing below, I give my permission to any institute or person (including, but not limited to, hospitals, doctors, nurses and health professionals) who has been involved in my treatment both past and present, to provide Aviva (and third parties acting on its behalf) with any information, including full medical records, reports and notes, concerning my physical or mental health."
          },
          skipDataMap: true
        },
        {
          key: "section_1_7",
          component: P,
          componentProps: {
            children:
              "I also give my permission for any medical exclusions that are applied to my policy as a result of information provided on this form or form my medical records, to be disclosed to my insurance intermediary (if I am using one) for the purposes of advising on or administering the policy."
          },
          skipDataMap: true
        },
        {
          key: "section_1_8",
          component: ComplianceNote,
          componentProps: {
            children: (
              <SmallText margin="0">
                Confirm that you have read the above text and the client understands it.
              </SmallText>
            ),
            type: "error"
          },
          skipDataMap: true
        }
      ]
    },
    {
      key: "section_2",
      components: [
        {
          key: "client_consents_to_obtaining_medical_report",
          initialValue: get(data, "page.data.client_consents_to_obtaining_medical_report", false),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label: "Does the client consent?",
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
        },
        {
          key: "do_any_members_wish_to_see_medical_report",
          initialValue: get(data, "page.data.do_any_members_wish_to_see_medical_report", false),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label:
            "Do you/any members to be covered wish to see a copy of your medical report before being sent to the insurer?",
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
    },
    {
      key: "section_3",
      components: [
        {
          key: "section_3_1",
          component: P,
          componentProps: {
            children: "We’ll use the information you give us to:"
          },
          skipDataMap: true
        },
        {
          key: "section_3_2",
          component: List,
          componentProps: {
            type: "ordered",
            name: "information_text_2",
            children: (
              <>
                <li>Process and underwrite your application</li>
                <li>Decide if we can offer cover and on what terms</li>
                <li>Administer your policy and handle any claims</li>
                <li>Help detect and prevent fraudulent activity</li>
              </>
            )
          },
          skipDataMap: true
        },
        {
          key: "section_3_3",
          component: P,
          componentProps: {
            children:
              "Other companies from across the Aviva group, or third parties who provide services to us, in any country(including those outside the European Economic Area) could also use your information in this way. If they do, we’ll make sure they agree to treat your information with the same level of protection as we would."
          },
          skipDataMap: true
        },
        {
          key: "section_3_4",
          component: P,
          componentProps: {
            children:
              "We may share your information with regulatory bodies, other insurers (directly or using shared databases), your insurance intermediary, or third parties providing services to them."
          },
          skipDataMap: true
        },
        {
          key: "section_3_5",
          component: P,
          componentProps: {
            children:
              "To keep our products and services competitive and suitable for customers’ needs, we may also use your information for research and customer profiling."
          },
          skipDataMap: true
        },
        {
          key: "section_3_6",
          component: P,
          componentProps: {
            children:
              "From time to time, we may tell you about other products or services which may be of interest. Please tick this box if you don’t want us to."
          },
          skipDataMap: true
        },
        {
          key: "section_3_7",
          component: ComplianceNote,
          componentProps: {
            children: (
              <SmallText margin="0">
                Confirm that you have read the above text and the client understands it.
              </SmallText>
            ),
            type: "error"
          },
          skipDataMap: true
        }
      ]
    },
    {
      key: "section_4",
      components: [
        {
          key: "client_consents_to_communications_about_other_products",
          initialValue: get(
            data,
            "page.data.client_consents_to_communications_about_other_products",
            false
          ),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label: "Client consents?",
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
        },
        {
          key: "client_consents_to_marketing",
          initialValue: get(data, "page.data.client_consents_to_marketing", false),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label: "Client consents to marketing?",
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
    },
    {
      key: "section_5",
      components: [
        {
          key: "section_5_1",
          component: P,
          componentProps: {
            children: "I declare that:"
          },
          skipDataMap: true
        },
        {
          key: "section_5_2",
          component: List,
          componentProps: {
            type: "unordered",
            name: "information_text_3",
            children: (
              <>
                <li>I have answered all questions in Section A correctly (if appropriate)</li>
                <li>
                  I have read section 3 on the underwriting options and have chosen the option that
                  is applicable to my policy.
                </li>
                <li>
                  I will advise you if there are any changes in the information given on this form
                  between now and the start date of cover under the policy.
                </li>
                <li>
                  To the best of my knowledge and belief the information given on this form if true
                  and complete. I have checked any answers or statements on this form that are not
                  in my own handwriting and they are correct.
                </li>
                <li>
                  I agree that if my application is accepted, the terms and conditions of the policy
                  will be Aviva's standard at that time. (A copy of the terms and conditions is
                  available on request)
                </li>
                <li>
                  I have received the ABI Guide to Buying Private Medical Insurance, Direct Debit
                  guarantee (if applicable)and the Healthier Solutions Brochure.
                </li>
                <li>
                  For the hospital list that I have chosen I have checked that there is a hospital
                  within reasonable distance from my home.
                </li>
                <li>
                  I agree on behalf of all persons to be covered to Aviva processing all information
                  associated with my application and resulting policy as set out in the 'important
                  notes' section of this application. (You are signing this form on behalf of all
                  persons to be covered. You must inform them how their data, including medical
                  information, will be used).
                </li>
                <li>All persons to be covered permanently live in the UK.</li>
              </>
            )
          },
          skipDataMap: true
        },
        {
          key: "section_5_3",
          component: ComplianceNote,
          componentProps: {
            children: (
              <SmallText margin="0">
                Confirm that you have read the above declarations and the client complies.
              </SmallText>
            ),
            type: "error"
          },
          skipDataMap: true
        }
      ]
    },
    {
      key: "section_6",
      components: [
        {
          key: "client_complies_with_the_switch_declarations",
          initialValue: get(data, "page.data.client_complies_with_the_switch_declarations", false),
          validationSchema: boolean().required("MISSING_REQUIRED_FIELD"),
          label: "Client complies with declarations?",
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
