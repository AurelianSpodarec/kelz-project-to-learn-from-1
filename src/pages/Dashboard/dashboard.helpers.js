/**
 * This takes the user's role and returns an appropriate title for the dashboard.
 * @param role A string representing the user's role
 */
export const getTitle = role => {
  switch (role) {
    case "PROVIDER_ADMIN":
    case "UNDERWRITER":
      return "Provider dashboard"
    case "NETWORK_ADMIN":
    case "NETWORK_MEMBER_ADMIN":
      return "Network dashboard"
    case "ORG_ADMIN":
    case "SALES_ADVISER":
      return "Organisation dashboard"
    case "SYS_ADMIN":
    case "SUPPORT_ADMIN":
    default:
      return "Admin dashboard"
  }
}
