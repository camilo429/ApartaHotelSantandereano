const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    'http://localhost:5000', // Cambia '/api' por la ruta de tu servidor backend
    createProxyMiddleware({
      target: 'http://localhost:5000', // Cambia 'http://localhost:5000' por la URL de tu servidor backend
      changeOrigin: true,
    })
  );
};