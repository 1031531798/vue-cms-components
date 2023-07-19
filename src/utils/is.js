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

// 密码强度判断
export function checkPasswordLevel (rule, value, callback) {
  let pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')
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
