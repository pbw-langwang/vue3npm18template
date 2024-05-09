import xss from '@/utils/Xss'
import i18n from '@/i18n/i18n'
const { t } = i18n.global

/**
 * 校验邮箱
 * 使用方式
 * import { validateEmail } from "@/utils/regular.js";
 * 表单rules
 * email: [
 *   { required: true, message: "请输入用户邮箱", trigger: "blur" },
 *   { validator: validateEmail, trigger: "blur" },
 * ],
 */
let emailReg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
export function validateEmail(rule, value, callback) {
  if (value !== '' && value !== null && value !== undefined) {
    if (emailReg.test(value)) {
      if (value !== xss.process(value)) {
        callback(new Error(t('email_xss')))
      } else {
        callback()
      }
    } else {
      callback(new Error(t('email_err')))
    }
  } else {
    callback()
  }
}

/**
 * 校验手机号
 * 使用方式
 * import { validatePhone } from "@/utils/regular.js";
 * 表单rules
 * phoneNum: [
 *   { required: true, message: "请输入手机号", trigger: "blur" },
 *   { validator: validatePhone, trigger: "blur" },
 * ],
 */
let phoneReg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
export function validatePhone(rule, value, callback) {
  if (value !== '' && value !== null && value !== undefined) {
    if (phoneReg.test(value)) {
      callback()
    } else {
      callback(new Error('phone_err'))
    }
  } else {
    callback()
  }
}

/**
 * 校验数字
 * 使用方式
 * import { validateNum } from "@/utils/regular.js";
 * 表单rules
 * xxx: [
 *   { required: true, message: "请输入数值", trigger: "blur" },
 *   { validator: validateNum, trigger: "blur" },
 * ],
 */
let numberReg = /^\d*\.?\d+$/
export function validateNum(rule, value, callback) {
  if (value !== '' && value !== null && value !== undefined) {
    console.log(numberReg.test(value))
    if (numberReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入数值'))
    }
  } else {
    callback()
  }
}
