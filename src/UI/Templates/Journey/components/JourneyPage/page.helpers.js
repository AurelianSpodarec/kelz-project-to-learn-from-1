import { DynamicPage, Applicants, MedicalHistory, HospitalPreference } from "./pages"

export const getJourneyPageComponent = key => {
  switch (key) {
    case "APPLICANTS":
      return Applicants
    case "MEDICAL_HISTORY":
      return MedicalHistory
    case "HOSPITAL_PREFERENCE":
      return HospitalPreference
    default:
      return DynamicPage
  }
}
