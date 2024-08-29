/**
 * Pages
 */
import {
  Login,
  ForgottenPassword,
  ResetPassword,
  TwoFactorAuth,
  ActivateUser,
  Register,
  RegistrationConfirmation,
  PasswordChangeConfirmation,
  Dashboard,
  MyAccount,
  Leads,
  LeadAdd,
  Clients,
  DealCodeAdd,
  DealCodes,
  NetworkAdd,
  NetworkManage,
  Networks,
  Policies,
  ProviderAdd,
  ProviderManage,
  OrganisationManage,
  Organisations,
  SystemSettings,
  ApiStatus,
  Providers,
  Users,
  UserAdd,
  Journey,
  Journeys,
  Forbidden,
  NotFound,
  AgencyCodes
} from "../pages"

/**
 * Page definitions
 *
 * Centralised for ease of management and re-usability
 */
import {
  LOGIN,
  FORGOTTEN_PASSWORD,
  RESET_PASSWORD,
  TWO_FACTOR_AUTH,
  ACTIVATE_USER,
  REGISTER,
  REGISTRATION_CONFIRMATION,
  PASSWORD_CHANGE_CONFIRMATION,
  DASHBOARD,
  FORBIDDEN,
  NOT_FOUND,
  MY_ACCOUNT,
  LEAD_ADMIN,
  LEAD_CREATE,
  CLIENT_ADMIN,
  DEAL_CODE_CREATE,
  ORGANISATION_ADMIN,
  ORGANISATION_MANAGE,
  ORGANISATION_USER_CREATE,
  NETWORK_ADMIN,
  NETWORK_MANAGE,
  NETWORK_USER_CREATE,
  NETWORK_CREATE,
  AGENCY_CODE_ADMIN,
  USER_ADMIN,
  USER_CREATE,
  JOURNEY,
  JOURNEY_ADMIN,
  PROVIDER_ADMIN,
  PROVIDER_MANAGE,
  PROVIDER_CREATE,
  PROVIDER_USER_CREATE,
  POLICY_ADMIN,
  POLICY_ADMIN_AWAITING_TERMS,
  POLICY_ADMIN_AWAITING_TERMS_SIMULATED,
  POLICY_ADMIN_AWAITING_ACCEPTANCE,
  POLICY_ADMIN_AWAITING_ACCEPTANCE_SIMULATED,
  POLICY_ADMIN_FAILED,
  POLICY_ADMIN_FAILED_SIMULATED,
  SYSTEM_SETTINGS,
  API_STATUS,
  DEAL_CODE_ADMIN
} from "./pages"

const routes = [
  /**
   * Authentication Gate
   */
  {
    isExact: true,
    component: Login,
    isAuthenticatedRoute: false,
    ...LOGIN
  },
  {
    isExact: true,
    component: ForgottenPassword,
    isAuthenticatedRoute: false,
    ...FORGOTTEN_PASSWORD
  },
  {
    isExact: true,
    component: ResetPassword,
    isAuthenticatedRoute: false,
    ...RESET_PASSWORD
  },
  {
    isExact: true,
    component: TwoFactorAuth,
    isAuthenticatedRoute: false,
    ...TWO_FACTOR_AUTH
  },
  {
    isExact: true,
    component: ActivateUser,
    isAuthenticatedRoute: false,
    ...ACTIVATE_USER
  },
  {
    isExact: true,
    component: Register,
    isAuthenticatedRoute: false,
    ...REGISTER
  },
  {
    isExact: true,
    component: RegistrationConfirmation,
    isAuthenticatedRoute: false,
    ...REGISTRATION_CONFIRMATION
  },
  {
    isExact: false,
    component: PasswordChangeConfirmation,
    isAuthenticatedRoute: false,
    ...PASSWORD_CHANGE_CONFIRMATION
  },
  /**
   * Self-service
   */
  {
    isExact: true,
    component: MyAccount,
    isAuthenticatedRoute: true,
    ...MY_ACCOUNT
  },
  /**
   * System Administration
   */
  {
    isExact: true,
    component: SystemSettings,
    isAuthenticatedRoute: true,
    ...SYSTEM_SETTINGS
  },
  {
    isExact: true,
    component: ApiStatus,
    isAuthenticatedRoute: true,
    ...API_STATUS
  },
  /**
   * Provider Administration
   */
  {
    isExact: true,
    component: UserAdd,
    isAuthenticatedRoute: true,
    ...PROVIDER_USER_CREATE
  },
  {
    isExact: true,
    component: ProviderAdd,
    isAuthenticatedRoute: true,
    ...PROVIDER_CREATE
  },
  {
    isExact: true,
    component: ProviderManage,
    isAuthenticatedRoute: true,
    ...PROVIDER_MANAGE
  },
  {
    isExact: true,
    component: Providers,
    isAuthenticatedRoute: true,
    ...PROVIDER_ADMIN
  },

  /**
   * Network Administration
   */
  {
    isExact: true,
    component: NetworkAdd,
    isAuthenticatedRoute: true,
    ...NETWORK_CREATE
  },
  {
    isExact: true,
    component: UserAdd,
    isAuthenticatedRoute: true,
    ...NETWORK_USER_CREATE
  },
  {
    isExact: true,
    component: NetworkManage,
    isAuthenticatedRoute: true,
    ...NETWORK_MANAGE
  },
  {
    isExact: true,
    component: Networks,
    isAuthenticatedRoute: true,
    ...NETWORK_ADMIN
  },
  /**
   * Organisation Administration
   */
  {
    isExact: true,
    component: UserAdd,
    isAuthenticatedRoute: true,
    ...ORGANISATION_USER_CREATE
  },
  {
    isExact: true,
    component: OrganisationManage,
    isAuthenticatedRoute: true,
    ...ORGANISATION_MANAGE
  },
  {
    isExact: true,
    component: Organisations,
    isAuthenticatedRoute: true,
    ...ORGANISATION_ADMIN
  },
  /**
   * User Administration
   */
  {
    isExact: true,
    component: UserAdd,
    isAuthenticatedRoute: true,
    ...USER_CREATE
  },
  {
    isExact: true,
    component: Users,
    isAuthenticatedRoute: true,
    ...USER_ADMIN
  },
  /**
   * Lead Administration
   */
  {
    isExact: true,
    component: LeadAdd,
    isAuthenticatedRoute: true,
    ...LEAD_CREATE
  },
  {
    isExact: true,
    component: Leads,
    isAuthenticatedRoute: true,
    ...LEAD_ADMIN
  },
  /**
   * Client Administration
   */
  {
    isExact: true,
    component: Clients,
    isAuthenticatedRoute: true,
    ...CLIENT_ADMIN
  },
  /**
   * Agency Codes and Commision Rates
   */
  {
    isExact: true,
    component: AgencyCodes,
    isAuthenticatedRoute: true,
    ...AGENCY_CODE_ADMIN
  },
  /**
   * Deal Codes
   */
  {
    isExact: true,
    component: DealCodeAdd,
    isAuthenticatedRoute: true,
    ...DEAL_CODE_CREATE
  },
  {
    isExact: true,
    component: DealCodes,
    isAuthenticatedRoute: true,
    ...DEAL_CODE_ADMIN
  },
  /**
   * Client Journey
   */
  {
    isExact: true,
    component: Journey,
    isAuthenticatedRoute: true,
    ...JOURNEY
  },
  {
    isExact: true,
    component: Journeys,
    isAuthenticatedRoute: true,
    ...JOURNEY_ADMIN
  },
  /**
   * Policies
   */
  {
    isExact: true,
    component: Policies,
    isAuthenticatedRoute: true,
    ...POLICY_ADMIN
  },
  {
    isExact: true,
    component: Policies,
    isAuthenticatedRoute: true,
    ...POLICY_ADMIN_AWAITING_TERMS
  },
  {
    isExact: true,
    component: Policies,
    isAuthenticatedRoute: true,
    ...POLICY_ADMIN_AWAITING_TERMS_SIMULATED
  },
  {
    isExact: true,
    component: Policies,
    isAuthenticatedRoute: true,
    ...POLICY_ADMIN_AWAITING_ACCEPTANCE
  },
  {
    isExact: true,
    component: Policies,
    isAuthenticatedRoute: true,
    ...POLICY_ADMIN_AWAITING_ACCEPTANCE_SIMULATED
  },
  {
    isExact: true,
    component: Policies,
    isAuthenticatedRoute: true,
    ...POLICY_ADMIN_FAILED
  },
  {
    isExact: true,
    component: Policies,
    isAuthenticatedRoute: true,
    ...POLICY_ADMIN_FAILED_SIMULATED
  },
  /**
   * Something Went Wrong
   */
  {
    isExact: true,
    component: Forbidden,
    isAuthenticatedRoute: false,
    ...FORBIDDEN
  },
  /**
   * Dashboard
   */
  {
    isExact: true,
    isStrict: true,
    component: Dashboard,
    isAuthenticatedRoute: true,
    ...DASHBOARD
  },
  {
    component: NotFound,
    isAuthenticatedRoute: false,
    ...NOT_FOUND
  }
]

export default routes
