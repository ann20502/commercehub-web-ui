const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app
        .use(
            '/logo-shopee.png',
            createProxyMiddleware({
                target: 'http://192.168.152.105:8082',
                changeOrigin: true,
            })
        )
        // Below is not in use ~
        .use(
            '/link/login/shopee',
            createProxyMiddleware({
                target: 'http://192.168.152.105:8082',
                changeOrigin: true,
            })
        );
};