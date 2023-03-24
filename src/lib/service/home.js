import {callLambda} from '@/lib/api/lambda';

/**
 * 取得首頁相關資料
 * @returns {Object} Object
 */
export async function getHomeAllInfo() {
  const res = await callLambda({
    apiName: 'Home/GetAllInfo',
    method: 'GET',
  });

  return res.data;
}
