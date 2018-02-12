var arr=[]
for(var i=0;i<5;i++){
  setTimeout(function(){
    var j = i ;
    return function(){
      console.log(j)
    }
  }())
}

console.log('first',i);

setTimeout(function(){
  console.log('last',i)
})
