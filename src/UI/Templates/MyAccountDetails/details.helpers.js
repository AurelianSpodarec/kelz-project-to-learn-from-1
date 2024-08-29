import { object, string } from "yup"

export const getReadableSettingLabel = name => {
  switch (name) {
    case "SIMULATION_MODE":
      return "Switch on Simulation Mode"
    case "SKIP_AFFORDABLE_BUDGET_CHECK":
      return "Affordable budget fact-find"
    case "RECEIVE_PASSWORD_EXPIREY_EMAIL":
      return "Password expiry email"
    default:
      return name
  }
}

export const EditDetailsModel = object({
  first_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  middle_names: string().nullable(),
  last_name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  email: string().email().required("MISSING_REQUIRED_FIELD").nullable()
})
