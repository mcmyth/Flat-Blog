// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
// const path = require('path')
const env = require('./src/config/env.config')
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: isProd ? `https://${env.cos.assetsDomain}/${env.cos.remoteBasePath}` : '/',
  chainWebpack: config => {
    if (isProd) {
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
      })
    } else {
    }
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 20000 }))
    // config.module.rule('pug')
    //   .test(/\.pug$/)
    //   .use('pug-html-loader')
    //   .loader('pug-html-loader')
    //   .end()
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.directives = {
          html(node, directiveMeta) {
            (node.props || (node.props = [])).push({
              name: 'innerHTML',
              value: `xss(_s(${directiveMeta.value}))`
            })
          }
        }
        return options
      })
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    // npm install prerender-spa-plugin -S
    // if (process.env.NODE_ENV !== 'production') return
    // config
    //   .plugin('prerender-spa-plugin')
    //   .use(PrerenderSPAPlugin)
    //   .init(Plugin => new Plugin({
    //     staticDir: path.join(__dirname, 'dist'),
    //     routes: [
    //       '/',
    //       '/login'
    //     ],
    //     renderer: new Renderer({
    //       renderAfterDocumentEvent: 'render-event',
    //       renderAfterElementExists: '#app',
    //       timeout: 2000,
    //       // maxConcurrentRoutes: 5,
    //       renderAfterTime: 5000,
    //       headless: false
    //     })
    //   }))
  },
  css: {
    sourceMap: true
  },
  devServer: {
    disableHostCheck: true
  }
}
