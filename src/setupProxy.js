const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://47.99.170.159/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api",
    }
  }))
}