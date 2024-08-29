import {
  USER_ADMIN,
  DASHBOARD,
  ORGANISATION_ADMIN,
  NETWORK_ADMIN,
  PROVIDER_ADMIN
} from "../../../config/pages"

export const getAddUserBreadcrumbs = (url, slug) => {
  switch (url) {
    case "users":
      return [
        { label: "Dashboard", link: DASHBOARD.path },
        { label: "Users", link: USER_ADMIN.path },
        { label: "Add user" }
      ]
    case "organisations":
      return [
        { label: "Dashboard", link: DASHBOARD.path },
        {
          label: "Organisation users",
          link: `${ORGANISATION_ADMIN.path}/${slug}?manage=users`
        },
        { label: "Add user" }
      ]
    case "networks":
      return [
        { label: "Dashboard", link: DASHBOARD.path },
        { label: "Network users", link: `${NETWORK_ADMIN.path}/${slug}?manage=users` },
        { label: "Add user" }
      ]
    case "providers":
      return [
        { label: "Dashboard", link: DASHBOARD.path },
        { label: "Provider users", link: `${PROVIDER_ADMIN.path}/${slug}?manage=users` },
        { label: "Add user" }
      ]
    default:
      return []
  }
}
