export const paymentFrequency = ["Monthly", "Yearly", "Don’t know", "Other"]

export const underwriting = ["Don’t know", "MORI", "FMU", "CMORI", "CME", "CPME", "MHD"]

export const excess = [
  "Don’t know",
  "No",
  "£0",
  "£100",
  "£250",
  "£500",
  "£750",
  "£1000",
  "£2000",
  "£2500",
  "£3000",
  "£5000",
  "Other"
]

export const excessType = ["Don’t know", "Per Claim", "Per Year", "Other"]

export const inpatient = ["Don’t know", "NIL", "Elite", "Essential", "Full", "Premier", "Other"]

export const outpatient = [
  "Don’t know",
  "NIL",
  "Essentials",
  "Full",
  "Standard",
  "£500",
  "£750",
  "£1000",
  "£1250",
  "£1500",
  "Other"
]

export const outpatientDiagnostics = ["Don’t know", "NIL", "Full", "OP Limit", "Unlimited", "Other"]

export const therapies = [
  "Don’t know",
  "Yes",
  "No",
  "Full",
  "£500",
  "£750",
  "£1000",
  "£1500",
  "Other"
]

export const mentalHealth = ["Don’t know", "Yes", "No", "Other"]

export const protectedNcd = ["Don’t know", "Yes", "No", "Other"]

export const sixWeek = ["Don’t know", "Yes", "No", "Other"]

export const dentalOptical = [
  "Don’t know",
  "Yes",
  "No",
  "Dental - Major only",
  "Dental - Major & Routine",
  "Dental - Cover 10",
  "Dental - Cover 20",
  "Other"
]

export const cancerCover = ["Don’t know", "Full", "NHS Support", "NHS Cancer Plus", "Other"]

export const travelCover = [
  "Don’t know",
  "Yes",
  "No",
  "Worldwide",
  "Worldwide + Adventure Sports",
  "Europe",
  "Europe + Adventure Sports",
  "Other"
]

export const privateGp = ["Don’t know", "Yes", "No", "Private GP + Dental & Optical", "Other"]

export const extendedCover = ["Don’t know", "Yes", "No", "Other"]

export const hospitalList = [
  "Don’t know",
  "Consultant Select",
  "Core",
  "Countrywide",
  "Essential",
  "Essential Access",
  "Essential Access with Guided Care",
  "Expert Select",
  "Extended",
  "Extended and London",
  "Extended Choice",
  "Extended Choice with Central London",
  "Extended Choice with Guided Care",
  "Extended Choice with Central London and Guided Care",
  "Fixed List",
  "Guided Option",
  "Local",
  "London Care",
  "Premium",
  "Standard",
  "Trust",
  "Other"
]

export const getOptions = key => {
  let list = []
  switch (key) {
    case "cp_payment_frequency":
      list = paymentFrequency
      break
    case "cp_underwriting":
      list = underwriting
      break
    case "cp_excess":
      list = excess
      break
    case "cp_excess_type":
      list = excessType
      break
    case "cp_in_day_patient_treatment":
      list = inpatient
      break
    case "cp_outpatient":
      list = outpatient
      break
    case "cp_outpatient_diagnostics":
      list = outpatientDiagnostics
      break
    case "cp_therapies":
      list = therapies
      break
    case "cp_mental_health":
      list = mentalHealth
      break
    case "cp_protected_no_claims":
      list = protectedNcd
      break
    case "cp_six_week":
      list = sixWeek
      break
    case "cp_dental_and_optical":
      list = dentalOptical
      break
    case "cp_cancer_cover":
      list = cancerCover
      break
    case "cp_travel_cover":
      list = travelCover
      break
    case "cp_private_gp":
      list = privateGp
      break
    case "cp_extended_cover":
      list = extendedCover
      break
    case "cp_hospital_list":
      list = hospitalList
      break

    default:
      list = []
      break
  }

  return list.map((value, i) => ({ order: i, label: value, value }))
}
