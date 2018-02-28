'use strict';
console.log(document.cookie);
function setCookie(key,value,deadLine)
{
  var expire=new Date();
  expire.setDate(expire.getDate()+deadLine);
  document.cookie=key+ "=" +encodeURIComponent(value)+
      ((deadLine===undefined) ? "" : ";expires="+expire.toString())
}


setCookie('zxt1','1x我',1);
setCookie('zxt2','2xx我',2);
setCookie('zxt3','3xxx我',3);
console.log(document.cookie.length);


function getCookie(key){
  var start
      ,end
      ;
  if(document.cookie.length>0){
    start=document.cookie.indexOf(key+'=');
    if(start!==-1){
      end=document.cookie.indexOf(';',start);
      if(end===-1){
        end=document.cookie.length;
      }
      return decodeURIComponent(document.cookie.substring(start,end))
    }
  }
  return ''
}