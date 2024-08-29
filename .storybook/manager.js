import { addons } from "@storybook/addons"
import themes from "./themes"

addons.setConfig({
  theme: themes.dark,
  showPanel: true,
  panelPosition: "right"
})
