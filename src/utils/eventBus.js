/**
 * 使用：main.js 引入 import "@/utils/eventBus.js";
 *      界面引入 import emitter from "@/utils/eventBus";
 */
import mitt from "mitt"
const emitter = mitt()
export default emitter
