/**
 * 跨标签通信
 * 使用：import { listenMsg, sendMsg } from "@/utils/crossTagMsg.js";
 *      listenMsg((data) => {}
 *      sendMsg({});
 */
const channal = new BroadcastChannel("Refresh")

export function sendMsg(type, content) {
  channal.postMessage({
    type,
    content,
  })
}

export function listenMsg(callback) {
  channal.addEventListener("message", (e) => {
    callback && callback(e)
  })
}
