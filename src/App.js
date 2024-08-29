import React from "react"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { Router, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import Theme from "@4cplatform/elements/Global/Theme"
import Normalise from "@4cplatform/elements/Global/Normalise"
import GlobalStyles from "@4cplatform/elements/Global/GlobalStyles"
import { AuthProvider, AuthRoute } from "@4cplatform/elements/Auth"
import { AlertsProvider, AlertsContainer } from "@4cplatform/elements/Alerts"
import { TranslationsProvider } from "@4cplatform/elements/Translations"
import { ConfigProvider } from "@4cplatform/elements/Config"
import { PusherProvider } from "@4cplatform/elements/Api"

// Helpers
import CONFIG, { pusherConfig } from "./config"
import routes from "./config/routes"

// Components
import { Page } from "./UI/Organisms"

const App = () => (
  <ConfigProvider config={CONFIG}>
    <HelmetProvider>
      <TranslationsProvider>
        <Theme>
          <Normalise />
          <GlobalStyles />
          <Helmet titleTemplate="%s | 4C Platform" />
          <Router history={createBrowserHistory()}>
            <AlertsProvider>
              <AuthProvider>
                <PusherProvider {...pusherConfig}>
                  <AlertsContainer />
                  <Page>
                    <Switch>
                      {routes.map(route => (
                        <AuthRoute key={route.path} {...route} />
                      ))}
                    </Switch>
                  </Page>
                </PusherProvider>
              </AuthProvider>
            </AlertsProvider>
          </Router>
        </Theme>
      </TranslationsProvider>
    </HelmetProvider>
  </ConfigProvider>
)

export default App
