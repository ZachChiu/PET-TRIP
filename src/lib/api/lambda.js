/* eslint-disable require-jsdoc */
import axios from 'axios';
import Cookies from 'js-cookie';
const url = '/'; //  'https://pettrip.ddns.net/api/'

const apiErrorHandlers = [];

function onApiError(callback) {
  apiErrorHandlers.push(callback);
}

/**
 * 呼叫lambda函式，並可以將資料存在 APP 內(但是不包含讀取)
 * @param {String} category lambda的API類別
 * @param {String} apiName 該API的名稱
 * @param {Object} data 傳入該API的資料
 * @param {Object} method [post,get] API的方法等
 * @param {Object} headers request的header
 *
 * @returns {Promise<Object>} API回傳結果
 */
async function callLambda({apiName = '', data, params, headers = {}, method}) {
  try {
    method = method.toLowerCase();
    const sendHeaders = Object.assign(headers, {
      Authorization: Cookies.get('jwt'),
      Accept: 'application/json',
    });

    // #endregion
    return await axios({
      method,
      url: url + apiName,
      data,
      params,
      headers: sendHeaders,
    });
  } catch (error) {
    for (const handler of apiErrorHandlers) {
      handler(error, {apiName, data, params, headers, method});
    }

    return Promise.reject(error);
  }
}

export {callLambda, onApiError};
