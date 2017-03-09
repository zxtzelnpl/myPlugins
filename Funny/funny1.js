/*生成1~100个不重复的随机数*/
function funny1(){
  var i
      ,arr=[]
      ;
  for(i=1;i<=100;i++){
    arr.push(i)
  }
  arr.sort(function(){
    return Math.random()-.5
  });
  console.log(arr);
}

/*生成数组有n个数，为1~100的不重复的随机数,当需要生成的数和最大值很相似的时候*/
function funny2(n){
  var i
      ,min=1
      ,max=100000
      ,arr=[]
      ,num
      ,random=function (){return Math.floor(Math.random()*(max-min+1))}
      ;
  for(i=min;i<=max;i++){
    arr.push(i);
    count++;
  }
  for(i=0;i<n;i++){
    count++;
    num=random();
    arr[i]^=arr[num];
    arr[num]^=arr[i];
    arr[i]^=arr[num];
  }
  console.log(arr.slice(0,n).length);
}

/*生成数组有n个数，为1~100的不重复的随机数,当分母很大，分子很小*/
function stupid(n){
  var i
      ,min=1
      ,max=100000
      ,arr=[]
      ,num
      ,random=function (){return Math.floor(Math.random()*(max-min+1))}
      ;
  for(i=0;i<n;i++){
    num=random();
    if(arr.indexOf(num)>-1){
      i--;
    }else{
      arr.push(num);
    }
    count++;
  }
  console.log(arr.length);
}

var start=new Date();
var count=0;
funny2(100000);
var end=new Date();
console.log(end-start,count);