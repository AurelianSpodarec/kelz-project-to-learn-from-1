import { within } from "@testing-library/react"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Helpers
import { fakeSelfServiceResponse, Providers } from "../../UI/Helpers"

import MyAccountTabs from "./myAccount.tabs"

describe("My Account tabs", () => {
  const user = { ...fakeSelfServiceResponse.data }
  const canAccess = roles => roles.includes(user.role.name)
  test("As SYS_ADMIN", () => {
    user.role = {
      name: "SYS_ADMIN"
    }
    const { getByText, getByTestId, container } = renderWithTheme(
      <Providers user={user} canAccess={canAccess}>
        <MyAccountTabs />
      </Providers>
    )
    const [tabsList] = getByTestId("my-account-tabs-wrapper").children

    expect(tabsList.children.length).toBe(2)
    expect(getByText("Details")).toBeInTheDocument()
    expect(getByText("Settings")).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  test("As ORG_ADMIN", () => {
    user.role = {
      name: "ORG_ADMIN"
    }
    const { getByText, getByTestId, container } = renderWithTheme(
      <Providers user={user} canAccess={canAccess}>
        <MyAccountTabs />
      </Providers>
    )
    const [tabsList] = getByTestId("my-account-tabs-wrapper").children

    expect(tabsList.children.length).toBe(3)
    expect(getByText("Details")).toBeInTheDocument()
    expect(getByText("Settings")).toBeInTheDocument()
    expect(within(tabsList).getByText("Agency codes")).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  test("As SALES_ADVISER", () => {
    user.role = {
      name: "SALES_ADVISER"
    }
    const { getByTestId, container } = renderWithTheme(
      <Providers user={user} canAccess={canAccess}>
        <MyAccountTabs />
      </Providers>
    )
    const [tabsList] = getByTestId("my-account-tabs-wrapper").children

    expect(tabsList.children.length).toBe(2)
    expect(within(tabsList).getByText("Details")).toBeInTheDocument()
    expect(within(tabsList).getByText("Settings")).toBeInTheDocument()
    expect(() => within(tabsList).getByText("Agency codes")).toThrowError()

    expect(container.firstChild).toMatchSnapshot()
  })
})
