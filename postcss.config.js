module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not ie <= 8',
        'ios >= 8',
        'android >= 4.0',
        'firefox >= 8',
        'chrome >= 24',
        'Opera>=10'
      ]
    },
    'postcss-pxtorem': {
      rootValue: 14,
      propList: ['*', '.ant-dropdown']
    }
  }
}
