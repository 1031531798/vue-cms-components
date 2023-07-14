import { enumApproveStatus } from '@/config/enum'
import website from '@/config/website'
import store from '@/store/index.js'
export function is (val, type) {
  return toString.call(val) === `[object ${type}]`
}

export function isEmpty (val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}
export function isObject (val) {
  return val !== null && is(val, 'Object')
}

export function isArray (val) {
  return val && Array.isArray(val)
}
export function isNumber (val) {
  return is(val, 'Number')
}
export function isString (val) {
  return is(val, 'String')
}

export function isShipServeRole () {
  try {
    if (store.getters.roles[0].roleType === website.roleType.shipServeCompany) {
      return true
    }
  } catch {
    return false
  }
  return false
}
// 密码强度判断
export function checkPasswordLevel (rule, value, callback) {
  var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')
  if (pwdRegex.test(value)) {
    callback()
  } else {
    callback(new Error('密码中必须包含字母（不区分大小写）、数字，至少8个字符，最多30个字符；'))
  }
}

/**
 * @description 查找数组中是否包含某个值
 * @param {查找的值} value
 * @param {被查找的数组} arr
 * @returns
 */
export function hasFindIndex (value, arr) {
  if (value !== undefined && Array.isArray(arr)) {
    const flag = arr.findIndex(num => {
      return num === value
    })
    return flag >= 0
  }
  return false
}
/**
 * @description 判断当前用户是否属于传入的权限
 * @param {检验的权限} roles
 * @returns
 */
export function isUserRoles (roles) {
  if (Array.isArray(roles)) {
    const flag = roles.findIndex(item => {
      return Number(item) === Number(store.getters.roles[0].roleType)
    })
    return flag >= 0
  } else {
    return Number(roles) === Number(store.getters.roles[0].roleType)
  }
}

// 判断船代是否显示审核意见
export function hasShipCompnayShowReason (row) {
  return [enumApproveStatus.pass, enumApproveStatus.reject].includes(row.applystatus)
}
