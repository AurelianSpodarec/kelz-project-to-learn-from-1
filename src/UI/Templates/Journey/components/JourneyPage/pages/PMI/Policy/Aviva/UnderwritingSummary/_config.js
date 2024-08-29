import { P, H4, SmallText, List } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import moment from "moment"
import { get } from "lodash"

// Helpers
import { isStartDateValid } from "../../../../../../../../../Helpers"

export const config = data => ({
  title: "Underwriting summary",
  sections: [
    {
      key: "aviva_underwriting_summary",
      components: [
        {
          key: "compliance_note_moratorium",
          component: ComplianceNote,
          condition: {
            type: "data",
            path: "recommended_underwriting",
            value: "MORI"
          },
          componentProps: {
            children: (
              <>
                <P margin="0 0 1rem">Compliance Note</P>
                <SmallText>
                  Any medical condition for which you have received treatment, diagnostic tests for,
                  taken medication for, asked advice on or had symptoms of in the last five years
                  will not be covered for the first two years of your policy. If you do not have
                  symptoms of, or receive treatment, medication, tests or advice for that condition
                  or a related condition for two years from your policy start date, this condition
                  may become eligible for cover.
                </SmallText>
              </>
            ),
            type: "info"
          },
          skipDataMap: true
        },
        {
          key: "compliance_note_fmu",
          component: ComplianceNote,
          condition: {
            type: "data",
            path: "recommended_underwriting",
            value: "FMU"
          },
          componentProps: {
            children: (
              <>
                <P margin="0 0 1rem">Compliance Note</P>
                <SmallText>
                  Explain the below terminology and confirm the client understands.
                </SmallText>
              </>
            ),
            type: "info"
          },
          skipDataMap: true
        },
        !isStartDateValid(
          get(data, "journey.selected_quote.start_date"),
          get(data, "journey.selected_quote.provider.name")
        ) && {
          key: "compliance_note_start_date",
          component: ComplianceNote,
          componentProps: {
            children: (
              <>
                <P margin="0 0 1rem">Compliance Note</P>
                <SmallText>
                  You have selected an Aviva policy. Aviva do not support policy start dates on the
                  29th, 30th or 31st of the month, so the selected policy will start on the first
                  day of the next month.
                </SmallText>
              </>
            ),
            type: "info"
          },
          skipDataMap: true
        },
        {
          key: "compliance_note",
          component: ComplianceNote,
          componentProps: {
            children: (
              <>
                <P margin="0 0 1rem">Compliance Note</P>
                <SmallText>Please read the summary below to the client.</SmallText>
              </>
            ),
            type: "info"
          },
          skipDataMap: true
        },
        {
          component: H4,
          componentProps: {
            children: "In summary, you have requested:"
          },
          skipDataMap: true
        },
        {
          key: "additional_data",
          component: List,
          componentProps: {
            listType: "unordered",
            name: "additional_data",
            children: (
              <>
                <li>
                  In summary, you have requested a{" "}
                  {get(data, "journey.selected_quote.product_name")} policy to cover{" "}
                  {get(data, "journey.selected_quote.applicants")?.map(
                    applicant => `${applicant.first_name} ${applicant.last_name}, `
                  )}{" "}
                  with a proposed start date of{" "}
                  {moment(get(data, "journey.selected_quote.start_date")).format("DD/MM/YYYY")}.
                </li>
                <li>
                  The policy selected is a {get(data, "journey.selected_quote.underwriting_style")}{" "}
                  {get(data, "journey.selected_quote.underwriting_type")} supplied by{" "}
                  {get(data, "journey.selected_quote.provider.name")} with{" "}
                  {get(data, "journey.selected_quote.excess")} excess.
                </li>
                <li>
                  Payment will be taken {get(data, "journey.selected_quote.payment_frequency")}.
                </li>
                <li>The contract for this insurance policy is for a 12 month period.</li>
              </>
            )
          },
          skipDataMap: true
        }
      ]
    }
  ]
})
