'use strict'

function compatibility (fun) {
  var str = navigator.userAgent
      , reg = {
          edge: /Edge\/([0-9.]*)/gi,
          firefox: /Firefox\/([0-9.]*)/gi,
          safari: /Safari\/([0-9.]*)/gi,
          version: /Version\/([0-9.]*)/gi,
          chrome: /Chrome\/([0-9.]*)/gi
        }
      , result = {}
      , num;
  result.edge = reg.edge.exec(str);
  if (result.edge) {
    return true
  }
  result.firefox = reg.firefox.exec(str);
  if (result.firefox) {
    num = parseInt(result.firefox[1].split('.')[0]);
    if (num > 55) {
      return true
    }
  }

  result.safari = reg.safari.exec(str);
  result.version = reg.version.exec(str);
  if (result.safari && result.version) {
    num = parseInt(result.version[1].split('.')[0]);
    if (num >= 7) {
      return true
    }

  }

  result.chrome = reg.chrome.exec(str);
  if (result.chrome) {
    num = parseInt(result.chrome[1].split('.')[0]);
    if (num >= 49) {
      return true
    }
  }

  console.warn('不兼容');
  fun()
}