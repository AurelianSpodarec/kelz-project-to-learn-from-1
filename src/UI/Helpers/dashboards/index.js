import { getSystemAdminDash, getSystemSupportAdminDash } from "./system"
import { getProviderAdminDash, getUnderwriterDash } from "./provider"
import { getNetworkAdminDash, getNetworkMemberAdminDash } from "./network"
import { getOrganisationAdminDash, getSalesAdviserDash } from "./organisation"

export {
  getSystemAdminDash,
  getSystemSupportAdminDash,
  getProviderAdminDash,
  getUnderwriterDash,
  getNetworkAdminDash,
  getNetworkMemberAdminDash,
  getOrganisationAdminDash,
  getSalesAdviserDash
}

/**
 * This accepts a single parameter of the user's role and returns the appropriate dashboard object.
 * For use in the Navigation subcomponent within the Page Organism and within the Dashboard page.
 * @param role The user's role
 */
export const getUserDashboard = (role, slug = "") => {
  switch (role) {
    case "NETWORK_ADMIN":
      return getNetworkAdminDash(slug)
    case "NETWORK_MEMBER_ADMIN":
      return getNetworkMemberAdminDash(slug)
    case "ORG_ADMIN":
      return getOrganisationAdminDash(slug)
    case "SALES_ADVISER":
      return getSalesAdviserDash(slug)
    case "PROVIDER_ADMIN":
      return getProviderAdminDash(slug)
    case "UNDERWRITER":
      return getUnderwriterDash(slug)
    case "SYS_ADMIN":
      return getSystemAdminDash(slug)
    case "SUPPORT_ADMIN":
      return getSystemSupportAdminDash(slug)
    default:
      return []
  }
}

/**
 * This takes the raw dashboard object and flattens it into an array with only one dimension.
 * @param {*} dashboard The raw dashboard object, which can be a two-dimensional array
 * @returns A single-dimensional array
 */
export const getNavLinks = dashboard =>
  dashboard.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return [...acc, ...val]
    }
    return [...acc, val]
  }, [])
