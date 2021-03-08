const path = require("path");

const {
  override,
  addBabelPlugins,
  babelInclude,
  addWebpackAlias,
  addBabelPresets,
} = require("customize-cra");

const newConf = override(
  ...addBabelPresets("@babel/preset-react"),
  ...addBabelPlugins(
    "@babel/plugin-proposal-class-properties",
    "react-native-reanimated/plugin",
    "babel-plugin-react-native-web",
    "@babel/plugin-syntax-jsx"
  ),

  babelInclude([
    path.resolve(__dirname, "node_modules/react-native-reanimated"),
    path.resolve(__dirname, "src"),
  ]),
  addWebpackAlias({
    "react-native": "react-native-web",
  })
);

module.exports = newConf;
