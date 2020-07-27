const presets = [
  [
    "@babel/preset-env",
    {
      "targets": {
        "node": "current",
        "browsers": [
          ">0.25%",
          "not ie 11",
          "not op_mini all"
        ]
      }
    }
  ],
  [
    "@babel/preset-react"
  ]
];

const plugins = [
  "@babel/plugin-proposal-class-properties",
  "react-hot-loader/babel",
  "@babel/plugin-transform-runtime",
  "@babel/plugin-syntax-dynamic-import",
  [
    'babel-plugin-import',
    {
      'libraryName': '@material-ui/core',
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      'libraryDirectory': 'esm',
      'camel2DashComponentName': false
    },
    'core'
  ],
  [
    'babel-plugin-import',
    {
      'libraryName': '@material-ui/icons',
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      'libraryDirectory': 'esm',
      'camel2DashComponentName': false
    },
    'icons'
  ]
];

module.exports = { presets, plugins };