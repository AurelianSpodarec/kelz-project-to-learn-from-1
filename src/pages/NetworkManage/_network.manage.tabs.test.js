import React from "react"
import "jest-styled-components"
import { within } from "@testing-library/react"
import { renderWithTheme } from "@4cplatform/elements/Helpers/tests"

// Component
import NetworkManageTabs from "./manage.tabs"

// Helpers
import NetworkManageProvider from "./context/manage.provider"
import { Providers, renderWithMockedRouter } from "../../UI/Helpers"

describe("Network tabs Breadcrumbs ", () => {
  test("While logged in as system admin; only two breadcrumbs should be added, Dashboard and network name", () => {
    // Mock
    const canAccess = roles => roles.includes("SYS_ADMIN")

    // Render
    const { getByTestId } = renderWithTheme(
      <Providers canAccess={canAccess}>
        <NetworkManageProvider>
          <NetworkManageTabs />
        </NetworkManageProvider>
      </Providers>
    )

    const dashboardBreadcrumb = getByTestId("Dashboard")
    const breadcrumbs = dashboardBreadcrumb.parentNode.children
    expect(breadcrumbs.length).toBe(3)
    const [, networksBreadcrumb, networkBreadcrumb] = breadcrumbs
    expect(dashboardBreadcrumb.textContent).toBe("Dashboard/")
    expect(networksBreadcrumb.textContent).toBe("Networks/")
    expect(networkBreadcrumb.textContent).toBe("Network")
  })

  test("While logged in as provider admin; only two breadcrumbs should be added, Dashboard and network name", () => {
    // Mock
    const canAccess = roles => roles.includes("PROVIDER_ADMIN")

    // Render
    const { getByTestId } = renderWithTheme(
      <Providers canAccess={canAccess}>
        <NetworkManageProvider>
          <NetworkManageTabs />
        </NetworkManageProvider>
      </Providers>
    )

    const dashboardBreadcrumb = getByTestId("Dashboard")
    const breadcrumbs = dashboardBreadcrumb.parentNode.children
    expect(breadcrumbs.length).toBe(2)
    const [, networkBreadcrumb] = breadcrumbs
    expect(dashboardBreadcrumb.textContent).toBe("Dashboard/")
    expect(networkBreadcrumb.textContent).toBe("Network")
  })
})

describe("Network tabs", () => {
  test("While logged in as Network Member admin", () => {
    // Mock
    const canAccess = roles => roles.includes("SYS_ADMIN")

    // Render
    const { getByTestId } = renderWithMockedRouter(
      () => (
        <Providers canAccess={canAccess}>
          <NetworkManageProvider>
            <NetworkManageTabs />
          </NetworkManageProvider>
        </Providers>
      ),

      { path: "/networks/network-1", route: "/networks/network-1?manage=quotes" }
    )

    const tabsWrapper = getByTestId("manage-tabs-wrapper")
    expect(tabsWrapper.firstChild.children.length).toBe(10)
    expect(within(tabsWrapper.firstChild).getByText("Details")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Settings")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Users")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Members")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Invitations")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Applications")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Documents")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Agency codes")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Quotes")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Policies")).toBeInTheDocument()
  })

  test("While logged in as Network Member admin", () => {
    // Mock
    const canAccess = roles => roles.includes("NETWORK_MEMBER_ADMIN")

    // Render
    const { getByTestId } = renderWithMockedRouter(
      () => (
        <Providers canAccess={canAccess}>
          <NetworkManageProvider>
            <NetworkManageTabs />
          </NetworkManageProvider>
        </Providers>
      ),

      { path: "/networks/network-1", route: "/networks/network-1?manage=quotes" }
    )

    const tabsWrapper = getByTestId("manage-tabs-wrapper")
    expect(tabsWrapper.firstChild.children.length).toBe(8)
    expect(within(tabsWrapper.firstChild).getByText("Details")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Members")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Invitations")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Applications")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Documents")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Agency codes")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Quotes")).toBeInTheDocument()
    expect(within(tabsWrapper.firstChild).getByText("Policies")).toBeInTheDocument()
  })
})
