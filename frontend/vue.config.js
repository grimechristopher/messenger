const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // proxy: 'http://127.0.0.1:3001/'
    '^/api': { 
      target: 'http://127.0.0.1:3001/api/', 
      changeOrigin: false,
      secure: false, 
      pathRewrite: {
        '^/api': '/api'
      }, 
      headers: {
        Connection: 'keep-alive'
      }
    },
  },
  
})