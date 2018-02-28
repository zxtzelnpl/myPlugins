'use strict'

function compatibility () {
  // var str = navigator.userAgent
  // var str = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Mobile Safari/537.36"
  var str = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1"
      , reg = {
    android: /Android ([0-9.]*)/gi,
    iphone: /iPhone/gi
  }
      , result = {}


  result.iphone = reg.iphone.exec(str);
  if (result.iphone) {
    console.log('this is iphone')
    return true

  }

  result.android = reg.android.exec(str);
  if (result.android) {
    console.log('this is android')
    return true
  }
}

compatibility()