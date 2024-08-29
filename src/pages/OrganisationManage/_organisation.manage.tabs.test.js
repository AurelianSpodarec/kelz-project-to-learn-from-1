import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { waitFor, within } from "@testing-library/react"
import { renderWithTheme } from "@4cplatform/elements/Helpers/tests"
import { api } from "@4cplatform/elements/Api/fetchData"

// Component
import OrganisationManageTabs from "./manage.tabs"

// Helpers
import OrganisationManageProvider from "./context/manage.provider"
import {
  Providers,
  fakeApiUrl,
  renderWithMockedRouter,
  fakeOrganisationGetResponse
} from "../../UI/Helpers"

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("Manage my organisation tabs", () => {
  describe("Logged in as SYS_ADMIN", () => {
    test("Only two breadcrumbs should be added, Dashboard and organisation name", () => {
      const canAccess = roles => roles.includes("SYS_ADMIN")
      const { getByTestId } = renderWithTheme(
        <Providers canAccess={canAccess}>
          <OrganisationManageProvider>
            <OrganisationManageTabs />
          </OrganisationManageProvider>
        </Providers>
      )

      const dashboardBreadcrumb = getByTestId("Dashboard")
      const breadcrumbs = dashboardBreadcrumb.parentNode.children
      expect(breadcrumbs.length).toBe(3)
      const [, organisationsBreadcrumb, organisationBreadcrumb] = breadcrumbs
      expect(dashboardBreadcrumb.textContent).toBe("Dashboard/")
      expect(organisationsBreadcrumb.textContent).toBe("Organisations/")
      expect(organisationBreadcrumb.textContent).toBe("Organisation")
    })
  })

  describe("Logged in as SALES_ADVISER", () => {
    test("Should not have Users tab", () => {
      const canAccess = roles => roles.includes("SALES_ADVISER")
      const { getByTestId } = renderWithTheme(
        <Providers canAccess={canAccess}>
          <OrganisationManageProvider>
            <OrganisationManageTabs />
          </OrganisationManageProvider>
        </Providers>
      )

      const tabsWrapper = getByTestId("manage-tabs-wrapper")
      expect(tabsWrapper.firstChild.children.length).toBe(4)
      expect(within(tabsWrapper.firstChild).getByText("Details")).toBeInTheDocument()
      expect(within(tabsWrapper.firstChild).getByText("Client journeys")).toBeInTheDocument()
      expect(within(tabsWrapper.firstChild).getByText("Policies")).toBeInTheDocument()
      expect(within(tabsWrapper.firstChild).getByText("Simulated policies")).toBeInTheDocument()
      expect(() => within(tabsWrapper.firstChild).getByText("Documents")).toThrowError()
      expect(() => within(tabsWrapper.firstChild).getByText("Settings")).toThrowError()
      expect(() => within(tabsWrapper.firstChild).getByText("Users")).toThrowError()
    })
  })

  describe("Documents tab", () => {
    test("Organisation with Network", async () => {
      mockAxios
        .onGet(`${fakeApiUrl}/organisations/organisation-1`)
        .replyOnce(200, fakeOrganisationGetResponse)

      const { getByText } = renderWithMockedRouter(
        () => (
          <Providers>
            <OrganisationManageProvider>
              <OrganisationManageTabs />
            </OrganisationManageProvider>
          </Providers>
        ),
        { path: "/organisations/:slug", route: "/organisations/organisation-1" }
      )

      await waitFor(() => {
        expect(getByText("Documents")).toBeInTheDocument()
      })
    })

    test("Organisation with no Network", async () => {
      const data = { data: { ...fakeOrganisationGetResponse.data, network: undefined } }
      mockAxios.onGet(`${fakeApiUrl}/organisations/organisation-1`).replyOnce(200, data)

      const { getByText } = renderWithMockedRouter(
        () => (
          <Providers>
            <OrganisationManageProvider>
              <OrganisationManageTabs />
            </OrganisationManageProvider>
          </Providers>
        ),
        { path: "/organisations/:slug", route: "/organisations/organisation-1" }
      )

      await waitFor(() => {
        expect(() => getByText("Documents")).toThrow()
      })
    })
  })
})
