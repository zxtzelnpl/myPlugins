'use strict'

function phoneCheck(phone) {
  const mobile = /^[1][3,4,5,7,8][0-9]{9}$/
  return mobile.test(phone)
}