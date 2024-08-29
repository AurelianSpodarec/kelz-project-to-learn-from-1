import { ORGANISATION_ADMIN, NETWORK_ADMIN, PROVIDER_ADMIN } from "../../../config/pages"
import { getAddUserBreadcrumbs } from "."

describe("generate breadcrumb trail", () => {
  test("get users breadcrumbs", () => {
    const trail = getAddUserBreadcrumbs("users")

    expect(trail.length).toBe(3)
    expect(trail[0].label).toBe("Dashboard")
    expect(trail[2].link).toBe(undefined)
  })

  test("get organisations breadcrumbs", () => {
    const slug = "organisation-1"
    const trail = getAddUserBreadcrumbs("organisations", slug)

    expect(trail.length).toBe(3)
    expect(trail[0].label).toBe("Dashboard")
    expect(trail[1].label).toBe("Organisation users")
    expect(trail[1].link).toBe(`${ORGANISATION_ADMIN.path}/${slug}?manage=users`)
    expect(trail[2].link).toBe(undefined)
  })

  test("get networks breadcrumbs", () => {
    const slug = "network-1"
    const trail = getAddUserBreadcrumbs("networks", slug)

    expect(trail.length).toBe(3)
    expect(trail[0].label).toBe("Dashboard")
    expect(trail[1].label).toBe("Network users")
    expect(trail[1].link).toBe(`${NETWORK_ADMIN.path}/${slug}?manage=users`)
    expect(trail[2].link).toBe(undefined)
  })

  test("get providers breadcrumbs", () => {
    const slug = "provider-1"
    const trail = getAddUserBreadcrumbs("providers", slug)

    expect(trail.length).toBe(3)
    expect(trail[0].label).toBe("Dashboard")
    expect(trail[1].label).toBe("Provider users")
    expect(trail[1].link).toBe(`${PROVIDER_ADMIN.path}/${slug}?manage=users`)
    expect(trail[2].link).toBe(undefined)
  })
})
