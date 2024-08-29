import React from "react"
import { BrowserRouter } from "react-router-dom"
import { withTests } from "@storybook/addon-jest"
import { TranslationsProvider } from "@4cplatform/elements/Translations"
import { ConfigProvider } from "@4cplatform/elements/Config"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"
import GlobalStyles from "@4cplatform/elements/Global/GlobalStyles"
import Normalise from "@4cplatform/elements/Global/Normalise"
import Theme from "@4cplatform/elements/Global/Theme"
import CONFIG from "../src/config"

// Components
import results from "./jest-test-results.json"
import themes from "./themes"

export const parameters = {
  layout: "centered",
  viewMode: "canvas",
  actions: {
    disable: true,
    argTypesRegex: "^on[A-Z].*"
  },
  docs: {
    theme: themes.dark
  },
  controls: {
    expanded: true,
    hideNoControlsWarning: true
  },
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: colours.white
      },
      {
        name: "dark",
        value: colours.darkBlue
      },
      {
        name: "blue",
        value: colours.blue
      }
    ]
  },
  options: {
    showPanel: true,
    panelPosition: "right",
    storySort: {
      method: "alphabetical",
      order: ["Info", ["README"]]
    }
  }
}

export const decorators = [
  StoryFn => (
    <ConfigProvider config={CONFIG}>
      <TranslationsProvider>
        <BrowserRouter>
          <Theme>
            <Normalise />
            <GlobalStyles />
            {StoryFn()}
          </Theme>
        </BrowserRouter>
      </TranslationsProvider>
    </ConfigProvider>
  ),
  withTests({
    results
  })
]
