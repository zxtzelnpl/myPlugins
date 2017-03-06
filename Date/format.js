/**
 * Created by Administrator on 2017/3/6 0006.
 */
var str='1月3日';

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
})(str);