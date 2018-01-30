'use strict';

(function compatibility () {
  var str = navigator.userAgent
      , reg = {
        android: /Android ([0-9.]*)/gi,
        iphone: /iPhone/gi
      }
      , result = {}
      ,style


  result.iphone = reg.iphone.exec(str);
  if (result.iphone) {
    style = document.createElement('link')
    style.setAttribute('rel','stylesheet')
    style.setAttribute('href','/mobile/css/iphone.css')
    document.head.appendChild(style)
  }

  result.android = reg.android.exec(str);
  if (result.android) {
    style = document.createElement('link')
    style.setAttribute('rel','stylesheet')
    style.setAttribute('href','/mobile/css/android.css')
    document.head.appendChild(style)
    return true
  }
})()