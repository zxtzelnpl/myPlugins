'use strict'

function compatibility(fun){
  // var reg={
  //   test:/texta/gi,
  //   edge:/Edge\/([0-9]*)\.([0-9]*)/gi,
  //   firefox:/Firefox\/([0-9]*)\.([0-9]*)/gi,
  //   safari:/Safari\/([0-9]*)\.([0-9]*)\.([0-9]*)/gi,
  //   version:/Version\/([0-9]*)\.([0-9]*)\.([0-9]*)/gi,
  //   chrome:/Chrome\/([0-9]*)/gi
  // };
  // var str = navigator.userAgent
  var str =__str.s360.ie;
  var reg={
    edge:/Edge\/([0-9.]*)/gi,
    firefox:/Firefox\/([0-9.]*)/gi,
    safari:/Safari\/([0-9.]*)/gi,
    version:/Version\/([0-9.]*)/gi,
    chrome:/Chrome\/([0-9.]*)/gi
  };

  var result={},num;
  result.edge = reg.edge.exec(str);
  if(result.edge){
    console.info('edge is true')
    return true
  }
  result.firefox = reg.firefox.exec(str);
  if(result.firefox){
    num = parseInt(result.firefox[1].split('.')[0]);
    if(num>55){
      console.log('firefox is true')
      return true
    }
  }

  result.safari = reg.safari.exec(str);
  result.version = reg.version.exec(str);
  if(result.safari&&result.version){
    num = parseInt(result.version[1].split('.')[0]);
    if(num>5){
      console.log('safari is true')
      return true
    }

  }

  result.chrome = reg.chrome.exec(str);
  if(result.chrome){
    num = parseInt(result.chrome[1].split('.')[0]);
    if(num>=49){
      console.log('chrome is true')
      return true
    }
  }

}