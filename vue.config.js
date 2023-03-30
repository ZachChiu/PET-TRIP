process.env.VUE_APP_PRODUCT_NAME = 'Pet Trip 寵物寄宿平台';
process.env.VUE_APP_PRODUCT_DESCRIPTION = `${new Date().getFullYear()} 台灣寵物寄宿平台，簡單下訂、流程簡便、空間遍佈全台，廠商合法並附有執照，絕無非法寵物寄宿廠商。`;
process.env.VUE_APP_PRODUCT_URL = 'https://pettrip.ddns.net/';

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Pet Trip 寵物寄宿平台',
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
