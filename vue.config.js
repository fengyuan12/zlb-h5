const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '临安巡检'
        return args
      })
  },
  configureWebpack: {
    entry: {
      app: './src/main.js'
    },
    externals: {
      AMap: 'AMap'
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        components: resolve('src/components'),
        utils: resolve('src/utils')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/scss/index.scss";'
      },
      less: {
        lessOptions: {
          // antdv自定义主题的样式覆盖
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: './',
  assetsDir: 'static',
  outputDir: 'build',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: true
}
