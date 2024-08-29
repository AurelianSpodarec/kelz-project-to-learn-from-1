import { renderWithTheme } from "@4cplatform/elements/Helpers/tests"
import { Providers } from "../../UI/Helpers"
import Users from "./users"

test("Users", () => {
  const { container, getByTestId } = renderWithTheme(
    <Providers>
      <Users />
    </Providers>
  )
  const dashboardBreadcrumb = getByTestId("Dashboard")
  const breadcrumbs = dashboardBreadcrumb.parentNode.children
  const [, usersBreadcrumb] = breadcrumbs

  expect(breadcrumbs.length).toBe(2)
  expect(dashboardBreadcrumb.textContent).toBe("Dashboard/")
  expect(usersBreadcrumb.textContent).toBe("Users")

  expect(container.firstChild).toMatchSnapshot()
})
