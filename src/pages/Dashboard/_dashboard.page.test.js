/* eslint-disable react/prop-types */
import { within } from "@testing-library/react"

// Helpers
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { fakeSelfServiceResponse, Providers } from "../../UI/Helpers"

// Components
import Dashboard from "."
import { getTitle } from "./dashboard.helpers"

test("getTitle helper function", () => {
  expect(getTitle("NETWORK_ADMIN")).toBe("Network dashboard")
  expect(getTitle("NETWORK_MEMBER_ADMIN")).toBe("Network dashboard")
  expect(getTitle("ORG_ADMIN")).toBe("Organisation dashboard")
  expect(getTitle("SALES_ADVISER")).toBe("Organisation dashboard")
  expect(getTitle("PROVIDER_ADMIN")).toBe("Provider dashboard")
  expect(getTitle("UNDERWRITER")).toBe("Provider dashboard")
  expect(getTitle("SYS_ADMIN")).toBe("Admin dashboard")
  expect(getTitle("SUPPORT_ADMIN")).toBe("Admin dashboard")
})

describe("Dashboard page", () => {
  describe("Policies sold links", () => {
    // Policies sold links need to be in specific places on the Dashboard for user types
    const TestComponent = ({ canAccess, name }) => (
      <Providers
        canAccess={canAccess}
        user={{ data: { ...fakeSelfServiceResponse.data, role: { name } } }}
      >
        <Dashboard />
      </Providers>
    )

    // System admin and Support admin, under Sales title
    test("Logged in as System Admin", () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent canAccess={roles => roles.includes("SYS_ADMIN")} name="SYS_ADMIN" />
      )
      const salesPanel = getByTestId("dash-category-sales")
      expect(within(salesPanel).getByText("Policies sold")).toBeInTheDocument()
    })

    test("Logged in as Support Admin", () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent canAccess={roles => roles.includes("SUPPORT_ADMIN")} name="SUPPORT_ADMIN" />
      )
      const salesPanel = getByTestId("dash-category-sales")
      expect(within(salesPanel).getByText("Policies sold")).toBeInTheDocument()
    })

    // Network admin, Network Member admin, Provider admin, Organisation admin
    // and Sales adivser under Policies title
    test("Logged in as Network Admin", () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent canAccess={roles => roles.includes("NETWORK_ADMIN")} name="NETWORK_ADMIN" />
      )
      const salesPanel = getByTestId("dash-category-policies")
      expect(within(salesPanel).getByText("Policies sold")).toBeInTheDocument()
    })

    test("Logged in as Network Member Admin", () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent
          canAccess={roles => roles.includes("NETWORK_MEMBER_ADMIN")}
          name="NETWORK_MEMBER_ADMIN"
        />
      )
      const salesPanel = getByTestId("dash-category-policies")
      expect(within(salesPanel).getByText("Policies sold")).toBeInTheDocument()
    })

    test("Logged in as Provider Admin", () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent
          canAccess={roles => roles.includes("PROVIDER_ADMIN")}
          name="PROVIDER_ADMIN"
        />
      )
      const salesPanel = getByTestId("dash-category-policies")
      expect(within(salesPanel).getByText("Policies sold")).toBeInTheDocument()
    })

    test("Logged in as Organisation Admin", () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent canAccess={roles => roles.includes("ORG_ADMIN")} name="ORG_ADMIN" />
      )
      const salesPanel = getByTestId("dash-category-policies")
      expect(within(salesPanel).getByText("All policies")).toBeInTheDocument()
    })

    test("Logged in as Sales Advisor", () => {
      const { getByTestId } = renderWithTheme(
        <TestComponent canAccess={roles => roles.includes("SALES_ADVISER")} name="SALES_ADVISER" />
      )
      const salesPanel = getByTestId("dash-category-policies")
      expect(within(salesPanel).getByText("All policies")).toBeInTheDocument()
    })
  })

  test("Logged in as Sales Adviser", () => {
    const canAccess = roles => roles.includes("SALES_ADVISER")
    const { container, getByTestId } = renderWithTheme(
      <Providers
        canAccess={canAccess}
        user={{ data: { ...fakeSelfServiceResponse.data, role: { name: "SALES_ADVISER" } } }}
      >
        <Dashboard />
      </Providers>
    )
    const adminPanel = getByTestId("dash-category-admin")
    expect(() => within(adminPanel).getByText("Manage organisation")).toThrowError()
    expect(() => within(adminPanel).getByText("User administration")).toThrowError()

    expect(container.firstChild).toMatchSnapshot()
  })

  test("Logged in as Underwriter", () => {
    const canAccess = roles => roles.includes("UNDERWRITER")
    const { getByTestId } = renderWithTheme(
      <Providers
        canAccess={canAccess}
        user={{ data: { ...fakeSelfServiceResponse.data, role: { name: "UNDERWRITER" } } }}
      >
        <Dashboard />
      </Providers>
    )
    const adminPanel = getByTestId("dash-category-admin")
    expect(() => within(adminPanel).getByText("Manage provider")).toThrowError()
  })
})
