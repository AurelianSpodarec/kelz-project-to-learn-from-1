import React from "react"
import "jest-styled-components"
import { renderWithTheme } from "@4cplatform/elements/Helpers/tests"
import { Container } from "@4cplatform/elements/Atoms"

// Component
import ProviderManageTabs from "./manage.tabs"

// Helpers
import ProviderManageProvider from "./context/manage.provider"
import { Providers } from "../../UI/Helpers"

test("Manage Provider", () => {
  const { container } = renderWithTheme(
    <Providers>
      <ProviderManageProvider>
        <Container width="80%">
          <ProviderManageTabs />
        </Container>
      </ProviderManageProvider>
    </Providers>
  )

  expect(container.firstChild).toMatchSnapshot()
})
