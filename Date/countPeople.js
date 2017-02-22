/**
 * 计算每天增加人数
 * @param id {string}
 * @param str {string}
 */
function countPeople(id, str) {

  var arr = str.split(/[- : \/]/),date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
  var num = parseInt((new Date() - date) / (60 * 60 * 24 * 2));
  document.getElementById(id).innerHTML = ('' + num);
}