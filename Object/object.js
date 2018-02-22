'use strict'


function doSomething(){
  console.log('do something')
}

function MyObject(name,age){
  this.name = name;
  this.age = age;
}

MyObject.prototype={
  type:'person'
}
MyObject.place='shanghai';


var obj1 = new MyObject('zxt',28);

console.log(obj1.type);
console.log(MyObject)
console.log(MyObject.place)
console.log(MyObject.constructor)


/*
这边会报错
var MyObject2 = {
  type:'animal'
}
MyObject2.constructor = function(name,age){
  this.name = name;
  this.age = age;
}

var obj2 = new MyObject2(name,age)
console.log(obj2)
*/



