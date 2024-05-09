import { request } from "./request"

/**
 * url?id=
 * export function getdescbyid(id) {
 *   const params = {
 *     id: id,
 *   };
 *   return request({
 *     url: `/bena/description/getbyid`,
 *     method: "GET",
 *     params,
 *   });
 * }
 */

/**
 * url/id/
 * export function getdescbyid(id) {
 *   return request({
 *     url:  `/bena/description/getbyid/${id}`,
 *     method: "GET",
 *   });
 * }
 */

/**
 * post 请求
 * export function loginApi(params) {
 *   return request({
 *     url:  `/api/user/login`,
 *     method: "POST",
 *     data: params,
 *   });
 * }
 */

// 文件记得加上 responseType: "blob | arraybuffer",
