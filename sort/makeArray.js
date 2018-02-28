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

console.log(makeArray(1000000))
