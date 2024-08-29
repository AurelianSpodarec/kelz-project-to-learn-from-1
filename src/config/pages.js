/**
 * Authentication Gate
 */
export const LOGIN = {
  path: "/login"
}

export const FORGOTTEN_PASSWORD = {
  path: "/forgotten-password"
}

export const RESET_PASSWORD = {
  path: "/reset-password"
}

export const TWO_FACTOR_AUTH = {
  path: "/two-factor-authentication"
}

export const ACTIVATE_USER = {
  path: "/activate-user"
}

export const REGISTER = {
  path: "/register"
}

export const REGISTRATION_CONFIRMATION = {
  path: "/registration-confirmation"
}

export const PASSWORD_CHANGE_CONFIRMATION = {
  path: "/password-change-confirmation"
}

/**
 * Self-service
 */
export const MY_ACCOUNT = {
  path: "/my-account"
}

/**
 * System Administration
 */
export const SYSTEM_SETTINGS = {
  path: "/system-settings",
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN"]
}

export const API_STATUS = {
  path: "/api-status",
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN"]
}

/**
 * User Administration
 */
export const USER_ADMIN = {
  path: "/users",
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN", "NETWORK_ADMIN", "PROVIDER_ADMIN"]
}

export const USER_CREATE = {
  path: `${USER_ADMIN.path}/add`,
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN", "NETWORK_ADMIN", "PROVIDER_ADMIN"]
}

/**
 * Provider Administration
 */
export const PROVIDER_ADMIN = {
  path: "/providers",
  roles: [
    "SYS_ADMIN",
    "SUPPORT_ADMIN",
    "ORG_ADMIN",
    "SALES_ADVISER",
    "NETWORK_ADMIN",
    "NETWORK_MEMBER_ADMIN"
  ]
}

export const PROVIDER_CREATE = {
  path: `${PROVIDER_ADMIN.path}/add`,
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN"]
}

export const PROVIDER_MANAGE = {
  path: `${PROVIDER_ADMIN.path}/:slug`,
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "PROVIDER_ADMIN"]
}

export const PROVIDER_USER_CREATE = {
  path: `${PROVIDER_ADMIN.path}/:slug${USER_CREATE.path}`,
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "PROVIDER_ADMIN"]
}

/**
 * Network Administration
 */
export const NETWORK_ADMIN = {
  path: "/networks",
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN"]
}

export const NETWORK_CREATE = {
  path: `${NETWORK_ADMIN.path}/add`,
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN"]
}

export const NETWORK_MANAGE = {
  path: `${NETWORK_ADMIN.path}/:slug`,
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "NETWORK_ADMIN", "NETWORK_MEMBER_ADMIN"]
}

export const NETWORK_USER_CREATE = {
  path: `${NETWORK_ADMIN.path}/:slug${USER_CREATE.path}`,
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "NETWORK_ADMIN"]
}

/**
 * Organisation Administration
 */
export const ORGANISATION_ADMIN = {
  path: "/organisations",
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN"]
}

export const ORGANISATION_MANAGE = {
  path: `${ORGANISATION_ADMIN.path}/:slug`,
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"]
}

export const ORGANISATION_USER_CREATE = {
  path: `${ORGANISATION_ADMIN.path}/:slug${USER_CREATE.path}`,
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"]
}

/**
 * Lead Administration
 */
export const LEAD_ADMIN = {
  path: "/leads",
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN", "SALES_ADVISER"]
}

export const LEAD_CREATE = {
  path: `${LEAD_ADMIN.path}/add`,
  roles: ["ORG_ADMIN", "SALES_ADVISER"]
}

/**
 * Client Administration
 */
export const CLIENT_ADMIN = {
  path: "/clients",
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN", "SALES_ADVISER"]
}

/**
 * Agency Codes and Commission Rates
 */
export const AGENCY_CODE_ADMIN = {
  path: "/agency-codes",
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "PROVIDER_ADMIN"]
}

/**
 * Deal Codes
 */
export const DEAL_CODE_ADMIN = {
  path: "/deal-codes",
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN"]
}

export const DEAL_CODE_CREATE = {
  path: `${DEAL_CODE_ADMIN.path}/add`,
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN"]
}

/**
 * Client Journey
 */
export const JOURNEY_ADMIN = {
  path: "/journeys",
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN", "SALES_ADVISER"]
}

export const JOURNEY = {
  path: "/journeys/:reference/:stage",
  roles: ["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN", "SALES_ADVISER"]
}

/**
 * Policies
 */
export const POLICY_ADMIN = {
  path: "/policies",
  roles: [
    "SYS_ADMIN",
    "SUPPORT_ADMIN",
    "ORG_ADMIN",
    "SALES_ADVISER",
    "NETWORK_ADMIN",
    "NETWORK_MEMBER_ADMIN",
    "PROVIDER_ADMIN",
    "UNDERWRITER"
  ]
}

export const POLICY_ADMIN_AWAITING_TERMS = {
  path: `${POLICY_ADMIN.path}?status=AWAITING_TERMS`,
  roles: [
    "SYS_ADMIN",
    "SUPPORT_ADMIN",
    "ORG_ADMIN",
    "SALES_ADVISER",
    "NETWORK_ADMIN",
    "NETWORK_MEMBER_ADMIN",
    "PROVIDER_ADMIN",
    "UNDERWRITER"
  ]
}

export const POLICY_ADMIN_AWAITING_TERMS_SIMULATED = {
  path: `${POLICY_ADMIN.path}?status=AWAITING_TERMS&simulated=true`,
  roles: [
    "SYS_ADMIN",
    "SUPPORT_ADMIN",
    "ORG_ADMIN",
    "SALES_ADVISER",
    "NETWORK_ADMIN",
    "NETWORK_MEMBER_ADMIN",
    "PROVIDER_ADMIN",
    "UNDERWRITER"
  ]
}

export const POLICY_ADMIN_AWAITING_ACCEPTANCE = {
  path: `${POLICY_ADMIN.path}?status=AWAITING_ACCEPTANCE`,
  roles: [
    "SYS_ADMIN",
    "SUPPORT_ADMIN",
    "ORG_ADMIN",
    "SALES_ADVISER",
    "NETWORK_ADMIN",
    "NETWORK_MEMBER_ADMIN",
    "PROVIDER_ADMIN",
    "UNDERWRITER"
  ]
}

export const POLICY_ADMIN_AWAITING_ACCEPTANCE_SIMULATED = {
  path: `${POLICY_ADMIN.path}?status=AWAITING_ACCEPTANCE&simulated=true`,
  roles: [
    "SYS_ADMIN",
    "SUPPORT_ADMIN",
    "ORG_ADMIN",
    "SALES_ADVISER",
    "NETWORK_ADMIN",
    "NETWORK_MEMBER_ADMIN",
    "PROVIDER_ADMIN",
    "UNDERWRITER"
  ]
}

export const POLICY_ADMIN_FAILED = {
  path: `${POLICY_ADMIN.path}?status=FAILED_ONBOARDING`,
  roles: [
    "SYS_ADMIN",
    "SUPPORT_ADMIN",
    "ORG_ADMIN",
    "SALES_ADVISER",
    "NETWORK_ADMIN",
    "NETWORK_MEMBER_ADMIN",
    "PROVIDER_ADMIN",
    "UNDERWRITER"
  ]
}

export const POLICY_ADMIN_FAILED_SIMULATED = {
  path: `${POLICY_ADMIN.path}?status=FAILED_ONBOARDING&simulated=true`,
  roles: [
    "SYS_ADMIN",
    "SUPPORT_ADMIN",
    "ORG_ADMIN",
    "SALES_ADVISER",
    "NETWORK_ADMIN",
    "NETWORK_MEMBER_ADMIN",
    "PROVIDER_ADMIN",
    "UNDERWRITER"
  ]
}

/**
 * Dashboard
 */
export const DASHBOARD = {
  path: "/"
}

/**
 * Something Went Wrong
 */
export const FORBIDDEN = {
  path: "/403"
}

export const NOT_FOUND = {
  path: "*"
}
