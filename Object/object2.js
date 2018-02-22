'use strict'

class MyObject{

  constructor (name,age){
    this.name = name;
    this.age = age;
  }

}
MyObject.place = 'shanghai'

var obj1= new MyObject('zxt',12)

console.log(obj1)
console.log(MyObject.place)
