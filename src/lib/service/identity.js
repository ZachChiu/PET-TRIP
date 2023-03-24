import {callLambda} from '@/lib/api/lambda';

/**
 * 取得身分資料
 * @returns {Object} Object
 */
export async function getIdentity() {
  const res = await callLambda({
    apiName: 'GetIdentity',
    method: 'GET',
  });

  return res.data;
}
