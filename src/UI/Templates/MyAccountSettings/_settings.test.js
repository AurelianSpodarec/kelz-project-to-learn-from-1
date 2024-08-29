/* eslint-disable react/prop-types */
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { Providers } from "../../Helpers"
import MyAccountSettingsStoryProvider from "./story/settings.story.provider"

// Components
import MyAccountSettings from "."

const TestComponent = ({ value = {} }) => (
  <Providers>
    <MyAccountSettingsStoryProvider value={value}>
      <MyAccountSettings />
    </MyAccountSettingsStoryProvider>
  </Providers>
)

describe("<MyAccountSettings />", () => {
  test("", () => {
    const { container } = renderWithTheme(<TestComponent />)

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
})
