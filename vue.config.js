module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Pet Trip 寵物寄宿',
    },
  },
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
