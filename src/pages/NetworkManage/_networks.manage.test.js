import React from "react"
import "jest-styled-components"
import { renderWithTheme } from "@4cplatform/elements/Helpers/tests"
import { nullFunc } from "@4cplatform/elements/Helpers"
import { Container } from "@4cplatform/elements/Atoms"

// Components
import NetworkManageProvider from "./context/manage.provider"
import NetworkManageTabs from "./manage.tabs"

// Helpers
import { Providers } from "../../UI/Helpers"
import { getDefaultSearch, getDefaultFilter } from "./manage.helpers"

describe("Manage Network", () => {
  test("getDefaultSearch", () => {
    expect(getDefaultSearch({ organisation_name: "Excelsior" })).toBe("Excelsior")
    expect(getDefaultSearch({ superhero_name: "Excelsior" })).toBe("")
    expect(getDefaultSearch()).toBe("")
    expect(getDefaultSearch(null)).toBe("")
    expect(getDefaultSearch("")).toBe("")
    expect(getDefaultSearch(undefined)).toBe("")
    expect(getDefaultSearch(12323)).toBe("")
    expect(getDefaultSearch(nullFunc)).toBe("")
  })
  test("getDefaultFilter", () => {
    expect(getDefaultFilter({ organisation_name: "Excelsior" })).toBe("organisation_name")
    expect(getDefaultFilter({ superhero_name: "Excelsior" })).toBe("client_name")
    expect(getDefaultFilter()).toBe("client_name")
    expect(getDefaultFilter(null)).toBe("client_name")
    expect(getDefaultFilter("")).toBe("client_name")
    expect(getDefaultFilter(undefined)).toBe("client_name")
    expect(getDefaultFilter(12323)).toBe("client_name")
    expect(getDefaultFilter(nullFunc)).toBe("client_name")
  })
})

test("Manage Network", () => {
  const { container } = renderWithTheme(
    <Providers>
      <NetworkManageProvider>
        <Container width="80%">
          <NetworkManageTabs />
        </Container>
      </NetworkManageProvider>
    </Providers>
  )

  expect(container.firstChild).toMatchSnapshot()
})
