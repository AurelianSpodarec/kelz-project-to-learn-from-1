import { create } from "@storybook/theming/create"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"

export default {
  light: create({
    // Base theme
    base: "light",
    // Colours
    colorPrimary: colours.blue,
    colorSecondary: colours.blue,
    // Brand
    brandTitle: "4C Platform Frontend",
    brandImage: "./logo-short.svg"
  }),
  dark: create({
    // Base theme
    base: "dark",
    // Colours
    colorPrimary: colours.blue,
    colorSecondary: colours.blue,
    // UI
    appBg: colours.shades.secondary.darkBlue.s10,
    appContentBg: colours.darkBlue,
    appBorderColor: colours.white,
    appBorderRadius: 4,
    // Typography
    fontBase: '"Sofia Pro", sans-serif',
    fontCode: "monospace",
    // Text colors
    textColor: colours.white,
    textInverseColor: colours.black,
    // Toolbar default and active colors
    barTextColor: colours.white,
    barSelectedColor: colours.blue,
    barBg: colours.shades.secondary.darkBlue.s10,
    // Form colors
    inputBg: colours.shades.secondary.darkBlue.s10,
    inputBorder: colours.white,
    inputTextColor: colours.white,
    inputBorderRadius: 4,
    // Brand
    brandTitle: "4C Platform Frontend",
    brandImage: "./logo-short.svg"
  })
}
