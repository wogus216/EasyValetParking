const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://101.101.219.176:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
