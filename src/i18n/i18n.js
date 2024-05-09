/**
 * 使用： setup 中
 *       import { useI18n } from "vue-i18n"
 *       const { t } = useI18n()
 *       script 中
 *       import i18n from "@/i18n/i18n"
 *       const { t } = i18n.global
 */
import { createI18n } from "vue-i18n"
import EN from "./en/en"
import CN from "./cn/cn"
import CNF from "./cnF/cnF"

const message = {
  cn: {
    ...CN,
  },
  en: {
    ...EN,
  },
  cnF: {
    ...CNF,
  },
}

const i18n = createI18n({
  locale: "cn", // 设置语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages: message,
})

export default i18n
