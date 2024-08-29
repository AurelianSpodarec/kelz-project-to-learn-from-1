import { get } from "lodash"

// Configs
import {
  consentConfig,
  clientDetailsConfig,
  applicantsConfig,
  currentPolicyDetailsConfig,
  currentPolicyOptionsConfig,
  claimsHistoryConfig,
  medicalHistoryConfig,
  patientTerminologyConfig,
  hospitalPreferenceConfig,
  underwritingStyleConfig,
  startDateAndBudgetConfig,
  hospitalListConfirmationConfig,
  quoteOverBudgetConfig,
  avivaPolicyWithinPastYearConfig,
  avivaRenewalCommissionConfig,
  avivaPolicyDetailsConfig,
  avivaUnderwritingSummaryConfig,
  avivaHealthDeclarationConfig,
  avivaRequestPmcConfig,
  avivaStartApplicationFormConfig,
  avivaCompleteApplicationFormConfig,
  avivaSwitchDisclosuresConfig,
  avivaSwitchDeclarationConfirmationConfig,
  avivaPaymentSetUpConfig,
  avivaThirdPartyPayerAccountTypeConfig,
  avivaThirdPartyPayerApprovalConfig,
  avivaThirdPartyPayerDetailsConfig
} from "../../Templates/Journey/components/JourneyPage/pages/PMI"

/**
 * This function maps the page key to its corresponding page config.
 *
 * @param {*} data
 *
 * @returns
 */
export const getPageData = (data, t) => {
  const key = get(data, "page.key", null)
  switch (key) {
    case "CONSENT_TO_PERSONAL_INFO":
      return consentConfig(data)
    case "CLIENT_DETAILS":
      return clientDetailsConfig(data)
    case "APPLICANTS":
      return applicantsConfig(data)
    case "CURRENT_POLICY_DETAILS":
      return currentPolicyDetailsConfig(data, t)
    case "CURRENT_POLICY_OPTIONS":
      return currentPolicyOptionsConfig(data)
    case "CLAIMS_HISTORY":
      return claimsHistoryConfig(data)
    case "MEDICAL_HISTORY":
      return medicalHistoryConfig(data)
    case "INPATIENT_OUTPATIENT":
      return patientTerminologyConfig(data)
    case "HOSPITAL_PREFERENCE":
      return hospitalPreferenceConfig(data)
    case "UNDERWRITING_STYLE":
      return underwritingStyleConfig(data)
    case "START_DATE_AND_BUDGET":
      return startDateAndBudgetConfig(data)
    case "HOSPITAL_LIST_CONFIRMATION":
      return hospitalListConfirmationConfig(data)
    case "QUOTE_OVER_BUDGET":
      return quoteOverBudgetConfig(data)
    case "AVIVA_PMI_POLICY_WITHIN_PAST_YEAR":
      return avivaPolicyWithinPastYearConfig(data)
    case "AVIVA_RENEWAL_COMMISSION":
      return avivaRenewalCommissionConfig(data)
    case "AVIVA_POLICY_DETAILS":
      return avivaPolicyDetailsConfig(data)
    case "AVIVA_UNDERWRITING_SUMMARY":
      return avivaUnderwritingSummaryConfig(data)
    case "AVIVA_HEALTH_DECLARATION":
      return avivaHealthDeclarationConfig(data)
    case "AVIVA_INSURER_REQUEST_CERTIFICATE_OF_INSURANCE":
      return avivaRequestPmcConfig(data)
    case "AVIVA_START_APPLICATION_FORM":
      return avivaStartApplicationFormConfig(data)
    case "AVIVA_COMPLETE_APPLICATION_FORM":
      return avivaCompleteApplicationFormConfig(data)
    case "AVIVA_SWITCH_DISCLOSURES":
      return avivaSwitchDisclosuresConfig(data)
    case "AVIVA_SWITCH_DECLARATION":
      return avivaSwitchDeclarationConfirmationConfig(data)
    case "AVIVA_PAYMENT_SETUP":
      return avivaPaymentSetUpConfig(data)
    case "AVIVA_THIRD_PARTY_PAYER_ACCOUNT_TYPE":
      return avivaThirdPartyPayerAccountTypeConfig(data)
    case "AVIVA_THIRD_PARTY_PAYER_APPROVAL":
      return avivaThirdPartyPayerApprovalConfig(data)
    case "AVIVA_THIRD_PARTY_PAYER_DETAILS":
      return avivaThirdPartyPayerDetailsConfig(data)
    default:
      return {}
  }
}
