'use strict'

function compatibility (fun) {
  var str = navigator.userAgent
      , reg = {
          edge: /Edge\/([0-9.]*)/gi,
          firefox: /Firefox\/([0-9.]*)/gi,
          safari: /Safari\/([0-9.]*)/gi,
          version: /Version\/([0-9.]*)/gi,
          chrome: /Chrome\/([0-9.]*)/gi,
          ie11:/Trident\/([0-9.]*)/gi
        }
      , result = {}
      , num;
  result.edge = reg.edge.exec(str);
  if (result.edge) {  //Edge 所有的版本
    return true
  }
  result.firefox = reg.firefox.exec(str);
  if (result.firefox) {
    num = parseInt(result.firefox[1].split('.')[0]);
    if (num >= 57) {  //FireFox 大于57的版本
      return true
    }
  }

  result.safari = reg.safari.exec(str);
  result.version = reg.version.exec(str);
  if (result.safari && result.version) {  //Safari 大于7的版本
    num = parseInt(result.version[1].split('.')[0]);
    if (num >= 7) {
      return true
    }
  }

  result.chrome = reg.chrome.exec(str);
  if (result.chrome) {  //Chrome 大于49的版本
    num = parseInt(result.chrome[1].split('.')[0]);
    if (num >= 49) {
      return true
    }
  }

  result.ie11 = reg.ie11.exec(str);
  if(result.ie11){  //IE 大于IE11的版本
    num = parseInt(result.ie11[1].split('.')[0]);
    if(num>=7){
      return true
    }
  }

  /**如果都不满足则进入函数**/
  fun()
}