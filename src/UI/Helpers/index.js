/**
 * Tests
 */
export { testDash, FakeAuthProvider, Providers, fakeApiUrl, renderWithMockedRouter } from "./tests"

/**
 * Breadcrumbs
 */
export { getAddUserBreadcrumbs } from "./breadcrumbs"

/**
 * Dashboards
 */
export {
  getSystemAdminDash,
  getProviderAdminDash,
  getUnderwriterDash,
  getNetworkAdminDash,
  getNetworkMemberAdminDash,
  getOrganisationAdminDash,
  getSalesAdviserDash,
  getUserDashboard,
  getNavLinks
} from "./dashboards"

/**
 * Forms
 */
export {
  renderProductTypeOptions,
  renderProviderOptions,
  renderProviderProductOptions,
  requiredIfFalse
} from "./forms"

/**
 * Journey
 */
export {
  getPageData,
  mapDataToFormik,
  mapDataToYup,
  getNavigation,
  renderSectionComponent,
  getStageParam,
  getNextStage,
  getPreviousStage,
  getPageAudit,
  isStartDateValid
} from "./journey"

/**
 * Icons
 */
export { getTwoFactorAuthIcon } from "./icons"

/**
 * Strings
 */
export { getName, getOrderBy, alphanumericRegex } from "./strings"

/**
 * providers
 */
export { renderA } from "./providers"

/**
 * Responses
 */
// Self-service and User Administration
export {
  fakeUsersGetResponse,
  fakeUsersPostResponse,
  fakeSelfServiceResponse,
  fakeTitlesResponse,
  fakeOccupationsResponse,
  fakeRolesResponse,
  fakeUnreadNotificationsGetResponse
} from "./responses/users"

// System Administration
export {
  fakeSystemSettingsGetResponse,
  fakeDueDiligencesGetResponse,
  fakeApiStatusGetResponse
} from "./responses/system"

// Provider Administration
export {
  fakeAvailableProvidersGetResponse,
  fakeProvidersGetResponse,
  fakeProviderGetResponse
} from "./responses/providers"
export { fakeProductTypesGetResponse } from "./responses/products"

// Network Administration
export {
  fakeNetworksPostResponse,
  fakeNetworkGetResponse,
  fakeNetworksGetResponse,
  fakeNetworkDocumentsGetResponse,
  fakeNetworkDocumentsOrganisationsGetResponse,
  fakeNetworkInvitationsGetResponse,
  fakeNetworkApplicationsGetResponse,
  fakeNetworkOrganisationsGetResponse
} from "./responses/networks"

// Organisation Administration
export {
  fakeOrganisationsGetResponse,
  fakeOrganisationGetResponse,
  fakeOrganisationNotesGetResponse,
  fakeOrganisationSalesSettingsGetResponse,
  fakeOrganisationJourneySettingsGetResponse,
  fakeOrganisationQQSettingsDefaultsGetResponse,
  fakeOrganisationQQSettingsGetResponse,
  fakeOrganisationDueDiligencesGetResponse,
  fakeOrganisationNetworkApplicationsGetResponse,
  fakeOrganisationNetworkInvitationsGetResponse,
  fakeOrganisationDocumentsGetResponse
} from "./responses/organisations"

// Lead Administration
export {
  fakeLeadConfigGetResponse,
  fakeLeadsGetResponse,
  fakeLeadGetResponse,
  fakeLeadNotesGetResponse
} from "./responses/leads"

// Agency Codes
export {
  fakeAgencyCodesGetResponse,
  fakeAgencyCodeGetResponse,
  fakeAgencyCodesRequestsGetResponse,
  fakeOrganisationsSharedWithResponse,
  fakeUsersSharedWithResponse,
  fakeSharedAgencyCodesGetResponse
} from "./responses/agencyCodes"

// Deal Codes
export { fakeDealCodesGetResponse } from "./responses/deals"

// Client Journey
export { fakeJourneysGetResponse, fakeJourneyGetResponse } from "./responses/journeys"
// Fact Find stage
export { fakeConsentGetResponse } from "./responses/journeys/pages/PMI/ClientData/Consent"
export { fakeClientDetailsGetResponse } from "./responses/journeys/pages/PMI/ClientData/ClientDetails"
export {
  fakeApplicantsPageGetResponse,
  fakeApplicantsGetResponse,
  fakeAliasGetResponse
} from "./responses/journeys/pages/PMI/ClientData/Applicants"
export { fakeCurrentPolicyDetailsGetResponse } from "./responses/journeys/pages/PMI/ClientData/CurrentPolicyDetails"
export { fakeCurrentPolicyOptionsGetResponse } from "./responses/journeys/pages/PMI/ClientData/CurrentPolicyOptions"
export { fakeClaimsHistoryGetResponse } from "./responses/journeys/pages/PMI/ClientData/ClaimsHistory"
export {
  fakeMedicalHistoryGetResponse,
  fakeMedicalHistoryApplicantsResponse,
  fakeMedicalHistoryNotesGetResponse
} from "./responses/journeys/pages/PMI/ClientData/MedicalHistory"
export { fakePatientTerminologyGetResponse } from "./responses/journeys/pages/PMI/ClientData/PatientTerminology"
export { fakeAvivaSwitchDeclarationConfirmationGetResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/SwitchDeclarationConfirmation"
export {
  fakeHospitalPreferenceClientDetailsGetResponse,
  fakeHospitalsGetResponse
} from "./responses/journeys/pages/PMI/ClientData/HospitalPreference"
export { fakeUnderwritingStyleGetResponse } from "./responses/journeys/pages/PMI/ClientData/UnderwritingStyle"
export { fakeStartDateAndBudgetGetResponse } from "./responses/journeys/pages/PMI/ClientData/StartDateAndBudget"

// Quotes
export { fakeQuotesGetResponse, fakeQuoteGetResponse } from "./responses/quotes"
// Quote stage
export { fakeHospitalListConfirmationGetResponse } from "./responses/journeys/pages/PMI/Quote/HospitalListConfirmation"
export { fakeJourneyQuoteOverBudgetPageGetResponse } from "./responses/journeys/pages/PMI/Quote/QuoteOverBudget"

// Policy stage

// Aviva
export { fakeAvivaPolicyWithinPastYearGetResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/PolicyWithinPastYear"
export { fakeAvivaRenewalCommissionResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/RenewalCommission"
export { fakeAvivaPolicyDetailsGetResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/PolicyDetails"
export { fakeAvivaUnderwritingSummaryGetResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/UnderwritingSummary"
export { fakeAvivaHealthDeclarationPageGetResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/HealthDeclaration"
export { fakeAvivaRequestPmcGetResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/RequestPmc"
export { fakeAvivaStartApplicationFormPageGetResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/StartApplicationForm"
export { fakeAvivaCompleteApplicationFormGetResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/CompleteApplicationForm"
export { fakeAvivaPaymentSetUpGetResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/PaymentSetUp"
export { fakeAvivaThirdPartyPayerAccountTypePageResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/ThirdPartyPayerAccountType"
export { fakeAvivaThirdPartyPayerApprovalGetResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/ThirdPartyPayerApproval"
export { fakeAvivaThirdPartyPayerDetailsGetResponse } from "./responses/journeys/pages/PMI/Policy/Aviva/ThirdPartyPayerDetails"

// Policies
export {
  fakePoliciesGetResponse,
  fakePolicyGetResponse,
  fakePolicyExclusionsGetResponse
} from "./responses/policies"
