module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'hhtp://localhost:3001',
        changeOrigin: true
      }
    }
  }
}
