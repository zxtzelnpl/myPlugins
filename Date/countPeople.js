/**
 * 计算每天增加人数
 * @param id {string}
 * @param str {string}
 * @param num {number}
 * @param start {number}
 */

// countPeople('peoNum','2017-05-04 01:10:10',500,805185);
function countPeople(id, str,num,start) {
  var arr = str.split(/[- :.\/]/),
      date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5])//兼容IOS
      start=start===undefined?0:start;
  var count = parseInt((new Date() - date) / (24 * 60 * 60 * 1000/num))+start;
  document.getElementById(id).innerHTML = ('' + count);
}


// 开发微信公众号时，发现iphone中对时间的处理与Android和pc浏览器中的时间处理不同。
// 进行调试发现是new Date("2017-02-05 12:10:10.12")发生错误，函数返回错误是"Invalid Date"。

// new Date();
// new Date(value);
// new Date(dateString);
// new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);