'use strict'

function makeArray(num){
  var array = [];
  for(var i=0;i<num;i++){
    array.push(i)
  }
  array.sort(function(){return Math.random()-0.5})
  console.log('The array is maked')
  return array
}


function quickSort (array) {
  function sort (prev, numsize) {
    let nonius = prev;
    let j = numsize - 1;
    let flag = array[prev];
    if ((numsize - prev) > 1) {
      while (nonius < j) {
        for (; nonius < j; j--) {
          if (array[j] < flag) {
            array[nonius++] = array[j];　//a[i] = a[j]; i += 1;
            break;
          }
        }
        for (; nonius < j; nonius++) {
          if (array[nonius] > flag) {
            array[j--] = array[nonius];
            break;
          }
        }
      }
      array[nonius] = flag;
      sort(0, nonius-1);
      sort(nonius + 1, numsize);
    }
  }

  sort(0, array.length);
  return array;
}

let array = makeArray(100);

quickSort(array)
console.log(array)
