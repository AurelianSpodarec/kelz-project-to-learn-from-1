import { boolean } from "yup"
import { get } from "lodash"
import { Toggle } from "@4cplatform/elements/Forms"
import { P } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"

export const config = data => ({
  title: "Quote over budget",
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
                <P margin="0 0 1rem">
                  The client's stated budget:{" "}
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP"
                  }).format(get(data, "page.data.affordable_budget", 0))}
                </P>
                <P margin="0 0 1rem">
                  The quoted amount:{" "}
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP"
                  }).format(get(data, "journey.selected_quote.monthly_premium", 0))}
                </P>
                <P margin="0 0 1rem">
                  Over budget by:{" "}
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP"
                  }).format(
                    Math.abs(
                      parseInt(get(data, "page.data.affordable_budget", 0)) -
                        parseInt(get(data, "journey.selected_quote.monthly_premium", 0))
                    )
                  )}
                </P>
              </>
            ),
            type: "error"
          },
          skipDataMap: true
        },
        {
          key: "confirmed_quote_over_budget",
          initialValue: get(data, "page.data.confirmed_quote_over_budget", false),
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
