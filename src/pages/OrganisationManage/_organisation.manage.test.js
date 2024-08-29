/* eslint-disable react/prop-types */
import React from "react"
import { within } from "@testing-library/react"
import "jest-styled-components"
import { renderWithTheme } from "@4cplatform/elements/Helpers/tests"
import { Container } from "@4cplatform/elements/Atoms"

// Component
import OrganisationManageTabs from "./manage.tabs"

// Helpers
import OrganisationManageProvider from "./context/manage.provider"
import { Providers } from "../../UI/Helpers"

const TestComponent = ({ accessRole }) => {
  const canAccess = roles => roles.includes(accessRole)
  return (
    <Providers canAccess={canAccess}>
      <OrganisationManageProvider>
        <OrganisationManageTabs />
      </OrganisationManageProvider>
    </Providers>
  )
}

describe("<OrganisationManage />", () => {
  test("Page snapshot", () => {
    const { container } = renderWithTheme(
      <Providers>
        <OrganisationManageProvider>
          <Container width="80%">
            <OrganisationManageTabs />
          </Container>
        </OrganisationManageProvider>
      </Providers>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  describe("Logged in as SYS_ADMIN", () => {
    test("Only two breadcrumbs should be added, Dashboard and organisation name", () => {
      const { getByTestId } = renderWithTheme(<TestComponent accessRole="SYS_ADMIN" />)

      const dashboardBreadcrumb = getByTestId("Dashboard")
      const breadcrumbs = dashboardBreadcrumb.parentNode.children
      expect(breadcrumbs.length).toBe(3)
      const [, organisationsBreadcrumb, organisationBreadcrumb] = breadcrumbs
      expect(dashboardBreadcrumb.textContent).toBe("Dashboard/")
      expect(organisationsBreadcrumb.textContent).toBe("Organisations/")
      expect(organisationBreadcrumb.textContent).toBe("Organisation")
    })

    test("Should not have Notes tab", () => {
      const { getByTestId } = renderWithTheme(<TestComponent accessRole="SYS_ADMIN" />)

      const [tabs] = getByTestId("manage-tabs-wrapper").children
      expect(within(tabs).getByText("Notes")).toBeInTheDocument()
    })
  })

  test("Logged in as SALES_ADVISER", () => {
    const canAccess = roles => roles.includes("SALES_ADVISER")
    const { getByText } = renderWithTheme(
      <Providers canAccess={canAccess}>
        <OrganisationManageProvider>
          <OrganisationManageTabs />
        </OrganisationManageProvider>
      </Providers>
    )

    expect(() => getByText("Users")).toThrow()
  })

  test("Should not have Notes tab", () => {
    const { getByTestId } = renderWithTheme(<TestComponent accessRole="SALES_ADVISER" />)

    const [tabs] = getByTestId("manage-tabs-wrapper").children
    expect(() => within(tabs).getByText("Notes")).toThrowError()
  })
})
