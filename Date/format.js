/*格式化*月*日-->**.***/
(function format(str){
  var reg=/[月日]/g;
  var arr=str
      .split(reg)
      .slice(0,-1)
      .map(function(value){
        if(value.length==1){
          return '0'+value
        }
      });
  return arr.join('.');
})('1月3日');

/*格式化*月*日-->**-***/
(function format(str){
  var reg=/[月日]/g;
  var arr=str
      .split(reg)
      .slice(0,-1)
      .map(function(value){
        if(value.length==1){
          return '0'+value
        }else{
          return value
        }
      });
  return arr.join('-');
})('1月3日');