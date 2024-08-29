module.exports = {
  stories: ["../src/UI/**/*.story.@(js|mdx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-jest",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ]
}
