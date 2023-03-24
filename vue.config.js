module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://pettrip.ddns.net/',
        secure: true,
        changeOrigin: true,
      },
    },
  },
};
