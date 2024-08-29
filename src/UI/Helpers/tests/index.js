/* eslint-disable react/prop-types */
import React from "react"
import { get } from "lodash"
import { HelmetProvider } from "react-helmet-async"
import { Router, Route } from "react-router-dom"
import { createMemoryHistory } from "history"
import { ConfigProvider } from "@4cplatform/elements/Config"
import { TranslationsProvider } from "@4cplatform/elements/Translations"
import { AlertsProvider, AlertsContainer } from "@4cplatform/elements/Alerts"
import { renderWithTheme, colours } from "@4cplatform/elements/Helpers"
import { Provider } from "@4cplatform/elements/Auth/auth.context"
import CONFIG from "../../../config"
import { Page } from "../../Organisms"
import {
  fakeAuthSelfServiceResponse,
  fakeSelfServiceResponse,
  fakeUnreadNotificationsGetResponse,
  fakeTitlesResponse
} from "../responses/users"

/**
 * This is a sample dashboard array that can be used to build the menu.
 * It is useful for testing purposes only.
 */
export const testDash = [
  {
    title: "Leads",
    links: [
      {
        title: "Quick quote",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      },
      {
        title: "Create new lead",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      },
      {
        title: "Clients",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      },
      {
        title: "Reports",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      }
    ],
    colour: colours.peopleGreen,
    icon: "clipboard-account-outline",
    route: "/"
  },
  {
    title: "Quotes",
    links: [
      {
        title: "Quotes completed",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      },
      {
        title: "Quotes in-progress",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      }
    ],
    colour: colours.quotesBlue,
    icon: "map-marker-path",
    route: "/"
  },
  {
    title: "Policies",
    links: [
      {
        title: "All policies",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      },
      {
        title: "Quotes awaiting terms",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      },
      {
        title: "Awaiting acceptance",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      }
    ],
    colour: colours.policiesPurple,
    icon: "format-list-checks",
    route: "/"
  },
  {
    title: "Admin",
    links: [
      {
        title: "My account",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      },
      {
        title: "User administration",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      },
      {
        title: "Mail log",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      },
      {
        title: "Organisation settings",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        route: "/"
      }
    ],
    colour: colours.adminBlue,
    icon: "cog",
    route: "/"
  }
]

/**
 * This is a fake API URL
 */
export const fakeApiUrl = `${CONFIG.API_URL}/${CONFIG.API_SCOPE}`

/**
 * This is a simple AuthProvider instance that provides a logged-in user for use in stories that require it.
 */
export const FakeAuthProvider = ({
  children,
  canAccess = () => true,
  authUser = fakeAuthSelfServiceResponse,
  user = fakeSelfServiceResponse
}) => (
  <Provider
    value={{
      authUser: get(authUser, "data", {}),
      user: get(user, "data", {}),
      isLoggedIn: true,
      canAccess
    }}
  >
    {children}
  </Provider>
)

/**
 * This exports a set of commonly-used providers with default configuration.
 * It is useful for creating consistent unit testing.
 * If a mockAxios adapter is passed as a prop, the responses for requests made by the providers will be mocked
 * @param {children, config} param0
 */
export const Providers = ({
  children,
  config = CONFIG,
  mockAxios = null,
  hasMocks = true,
  canAccess = () => true,
  authUser = fakeAuthSelfServiceResponse,
  user = fakeSelfServiceResponse
}) => {
  if (hasMocks && !!mockAxios) {
    // Return correct value for self service request
    mockAxios.onGet(`${config.API_URL}/auth/self-service`).reply(200, authUser)
    mockAxios.onGet(`${config.API_URL}/${config.API_SCOPE}/self-service`).reply(200, user)
    // Return correct value for unread notifications request
    mockAxios
      .onGet(`${config.API_URL}/${config.API_SCOPE}/notifications/unread`)
      .reply(200, fakeUnreadNotificationsGetResponse)
    mockAxios.onGet(`${fakeApiUrl}/dmz/titles`).replyOnce(200, fakeTitlesResponse)
  }
  return (
    <ConfigProvider config={config}>
      <HelmetProvider>
        <TranslationsProvider>
          <FakeAuthProvider canAccess={canAccess} user={user} authUser={authUser}>
            <AlertsProvider>
              <Page>
                <AlertsContainer />
                {children}
              </Page>
            </AlertsProvider>
          </FakeAuthProvider>
        </TranslationsProvider>
      </HelmetProvider>
    </ConfigProvider>
  )
}

/**
 * This is a helper function which allows you to mock the router and the match object for unit tests.
 * This is useful for components which rely on URL params to function.
 * @param {*} ui A react component to be rendered.
 * @param {*} param1 The route information to be utilized.
 */
export const renderWithMockedRouter = (
  ui,
  {
    path = "/", // e.g. "/providers/:slug"
    route = "/", // e.g. "/providers/aviva"
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => ({
  ...renderWithTheme(
    <Router history={history}>
      <Route path={path} component={ui} />
    </Router>
  )
})
