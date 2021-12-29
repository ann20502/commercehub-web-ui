const { createProxyMiddleware } = require('http-proxy-middleware');

function getTarget(port) {
  const PREFIX = "http://";
  const IP = "192.1.1.1";
  return PREFIX + IP + ":" + port;
}

module.exports = function(app) {
    app
        .use(
          '/linker',
          createProxyMiddleware({
            target: getTarget("8081"),
            changeOrigin: true,
          })
        )
        .use(
            '/images',
            createProxyMiddleware({
                target: getTarget("8081"),
                changeOrigin: true,
            })
        )
        .use(
          '/rs',
          createProxyMiddleware({
              target: getTarget("8082"),
              changeOrigin: true,
          })
        );
};
