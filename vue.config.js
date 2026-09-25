// webpack 4 用到 md4，Node 17 以後的 OpenSSL 3 不支援，改用 sha256 讓新版 Node 也能 build
const crypto = require('crypto');
const createHash = crypto.createHash;
crypto.createHash = (algorithm) =>
  createHash(algorithm === 'md4' ? 'sha256' : algorithm);

process.env.VUE_APP_PRODUCT_NAME = 'Pet Trip 寵物寄宿平台';
process.env.VUE_APP_PRODUCT_DESCRIPTION = `${new Date().getFullYear()} 台灣寵物寄宿平台，簡單下訂、流程簡便、空間遍佈全台，廠商合法並附有執照，絕無非法寵物寄宿廠商。`;
process.env.VUE_APP_PRODUCT_URL = 'https://pettrip.ddns.net/';

module.exports = {
  // 部署在子路徑時（例如 GitHub Pages 的 /PET-TRIP/）用 PUBLIC_PATH 指定
  publicPath: process.env.PUBLIC_PATH || '/',
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
