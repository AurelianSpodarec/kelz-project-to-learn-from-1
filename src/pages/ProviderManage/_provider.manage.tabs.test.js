import React from "react"
import "jest-styled-components"
import { fireEvent, waitFor } from "@testing-library/react"
import { renderWithTheme } from "@4cplatform/elements/Helpers/tests"
import userEvent from "@testing-library/user-event"

// Component
import ProviderManageTabs from "./manage.tabs"

// Helpers
import ProviderManageProvider from "./context/manage.provider"
import { Providers } from "../../UI/Helpers"

describe("Network Breadcrumbs logged in as system admin", () => {
  test("Only two breadcrumbs should be added, Dashboard and network name", () => {
    const canAccess = roles => roles.includes("SYS_ADMIN")
    const { getByTestId } = renderWithTheme(
      <Providers canAccess={canAccess}>
        <ProviderManageProvider>
          <ProviderManageTabs />
        </ProviderManageProvider>
      </Providers>
    )

    const dashboardBreadcrumb = getByTestId("Dashboard")
    const breadcrumbs = dashboardBreadcrumb.parentNode.children
    expect(breadcrumbs.length).toBe(3)
    const [, providersBreadcrumb, providerBreadcrumb] = breadcrumbs
    expect(dashboardBreadcrumb.textContent).toBe("Dashboard/")
    expect(providersBreadcrumb.textContent).toBe("Providers/")
    expect(providerBreadcrumb.textContent).toBe("Provider")
  })
})

describe("Network Breadcrumbs logged in as provider admin", () => {
  test("Only two breadcrumbs should be added, Dashboard and network name", () => {
    const canAccess = roles => roles.includes("PROVIDER_ADMIN")
    const { getByTestId } = renderWithTheme(
      <Providers canAccess={canAccess}>
        <ProviderManageProvider>
          <ProviderManageTabs />
        </ProviderManageProvider>
      </Providers>
    )

    const dashboardBreadcrumb = getByTestId("Dashboard")
    const breadcrumbs = dashboardBreadcrumb.parentNode.children
    expect(breadcrumbs.length).toBe(2)
    const [, providerBreadcrumb] = breadcrumbs
    expect(dashboardBreadcrumb.textContent).toBe("Dashboard/")
    expect(providerBreadcrumb.textContent).toBe("Provider")
  })
})

describe("Policies tabs (Policies, Simulated policies)", () => {
  test("Changing tabs should reset Filter status by dropdown", async () => {
    const { getByTestId } = renderWithTheme(
      <Providers>
        <ProviderManageProvider>
          <ProviderManageTabs />
        </ProviderManageProvider>
      </Providers>
    )

    const [policies] = getByTestId("tab-policies").children
    userEvent.click(policies)
    await waitFor(() => {
      expect(policies).toHaveStyleRule("color", "#00272E")
    })

    {
      const filterByStatusSelect = getByTestId("filter_status-select")
      fireEvent.change(filterByStatusSelect, { target: { value: "ONBOARDED" } })
      await waitFor(() => {
        expect(filterByStatusSelect.value).toBe("ONBOARDED")
      })
    }

    const [simulatedPolicies] = getByTestId("tab-simulated_policies").children
    userEvent.click(simulatedPolicies)
    await waitFor(() => {
      expect(simulatedPolicies).toHaveStyleRule("color", "#00272E")
    })

    {
      const filterByStatusSelect = getByTestId("filter_status-select")
      await waitFor(() => {
        expect(filterByStatusSelect.value).toBe("ACCEPTED")
      })
    }
  })
})
