import {callLambda} from '@/lib/api/lambda';

/**
 * 取得房間 list
 * @param {Object} params params
 * @returns {Array} Object
 */
export async function getRooms(params) {
  const res = await callLambda({
    apiName: 'Room/GetRoom',
    method: 'GET',
    params,
  });

  return res.data;
}

/**
 * 取得廠商 list
 * @param {Object} params params
 * @returns {Array} Object
 */
export async function getCompanies(params) {
  const res = await callLambda({
    apiName: 'Room/GetCompanys',
    method: 'GET',
    params,
  });

  return res.data;
}

/**
 * 取得房間資訊
 * @param {Object} params params
 * @returns {Array} Object
 */
export async function getRoom(params) {
  const res = await callLambda({
    apiName: 'Room/GetRoomsFront',
    method: 'GET',
    params,
  });

  return res.data;
}

/**
 * 取得廠商資訊
 * @param {Object} params params
 * @returns {Array} Object
 */
export async function getFirm(params) {
  const res = await callLambda({
    apiName: 'Room/GetRoomslist',
    method: 'GET',
    params,
  });

  return res.data;
}
