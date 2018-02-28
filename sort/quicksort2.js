'use strict'

function makeArray (num) {
  var array = [];
  for (var i = 0; i < num; i++) {
    array.push(i)
  }
  array.sort(function () {
    return Math.random() - 0.5
  })
  console.log('The array is maked')
  return array
}

function quickSort (array) {
  let i, j, k, stack = [{
        i: 0,
        j: array.length - 1
      }],
      temp;

  do {
    temp = stack.shift()
    i = temp.i
    j = temp.j
    k = array[i]
    while (i < j) {
      for (; i < j; j--) {
        if (array[j] < k) {
          array[i++] = array[j]
          break
        }
      }

      for (; i < j; i++) {
        if (array[i] > k) {
          array[j--] = array[i]
          break;
        }
      }
    }
    // console.log(i,j)
    array[i] = k;

    if(temp.j - i >1){
      stack.unshift({
        i:i+1,
        j:temp.j
      })
    }

    if(i-temp.i>1){
      stack.unshift({
        i:temp.i,
        j:i-1
      })
    }
  }
  while (stack.length > 0)

}

let array = makeArray(5000000);
// let _array = [...array]
// console.log(_array)
// let array = [5, 7, 3, 1, 9, 8, 2, 4, 6];
let time1 = new Date()
quickSort(array)
let time2 = new Date()
console.log(array)
console.info(Math.ceil((time2-time1)))
