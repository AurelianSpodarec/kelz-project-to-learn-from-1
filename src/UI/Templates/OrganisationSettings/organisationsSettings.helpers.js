import { capitalize } from "lodash"

export const salesSettingsLabels = {
  buy_sales_leads: "Do you currently buy sales leads?",
  critical_illness_cover: "Critical illness cover",
  general_insurance: "General insurance",
  income_protection_insurance: "Income protection insurance",
  investments: "Investments",
  life_insurance: "Life insurance",
  mortgages: "Mortgages",
  pensions: "Pensions",
  group_pmi: "Group private medical insurance",
  individual_pmi: "Individual private medical insurance"
}

export const resolveValueNames = name => {
  let output = name
  if (output.slice(0, 6) === "GLOBAL") {
    const [, , newName] = output.split("_")
    output = newName
  }
  return capitalize(output)
}
