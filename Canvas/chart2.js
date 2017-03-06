var chartsArray=[
  '图表'
  ,'五日平均涨幅'//1
  ,'次日上涨个数'//2
  ,'三日上涨个数'//3
  ,'五日上涨个数'//4
  ,'次日最大涨幅'//5
  ,'三日最大涨幅'//6
  ,'五日最大涨幅'//7
  ,'次日上涨概率'//8
  ,'三日上涨概率'//9
  ,'五日上涨概率'//10
];
var axisX = ['1月9日','1月9日','1月10日','1月10日','1月11日','1月11日','1月12日','1月12日','1月13日','1月13日'];
var axisY = [6.23,4.17,9.66,8.34,7.07,5.69,13.16,9.36,10.10,8.19];

chart2('canvas',6,axisX,axisY);

/*格式化*月*日-->**-***/
function format(str){
  var reg=/[月日]/g;
  var arr=str
      .split(reg)
      .slice(0,-1)
      .map(function(value){
        if(value.length==1){
          return '0'+value
        }else{
          return value
        }
      });
  return arr.join('-');
}
/*如何画图表*/
function chart2(wrapID,title,axisX,axisY){
  var dpr = Math.max(window.devicePixelRatio || 1, 1);//2
  var wrap=document.getElementById(wrapID);
  var canvas=document.createElement('canvas');
  var width=wrap.scrollWidth;
  var height=wrap.scrollHeight;

  canvas.style.width=width+'px';
  canvas.style.height=height+'px';
  var canvasW=canvas.width=width*dpr;
  var canvasH=canvas.height=height*dpr;

  var context=canvas.getContext('2d');
  /*处理X轴数据*/
  var _axisX=[0];
  (function(){
    for(var i=0,len=axisX.length/2;i<len;i++){
      _axisX.push(format(axisX[i*2]))
    }
  })();
  /*处理Y轴数据*/
  var _axisY=[];
  (function(){
    for(var i=0,len=axisY.length/2;i<len;i++){
      var num=(axisY[i*2]*100+axisY[i*2+1]*100)/200;
      _axisY.push(num);
    }
  })();

  var splitNumX=_axisX.length-1;
  var leftGapX=24*dpr;//左边有2个字符，小于24px
  var rightGapX=24*dpr;//右边无字符，但是需要空下距离
  var chartWidth=canvasW-leftGapX-rightGapX;
  var splitLengthX=Math.floor(chartWidth/splitNumX);//间隔的距离

  var splitNumY=5;
  var intervalY=Math.ceil(Math.max.apply(undefined,_axisY)/5);
  var topGapY=6*dpr;//顶部留高度半个字符6px
  var bottomGapY=54*dpr;//减去四个字符54px
  var chartHeight=canvasH-topGapY-bottomGapY;//图表Y最高轴到最低轴的距离
  var splitLengthY=Math.floor(chartHeight/splitNumY);//Y轴刻度之间的高度

  /*先布置基本框架*/
  /*Y轴方向布置*/
  for(var i=0;i<=splitNumY;i++){
    (function(){
      var num=(splitNumY-i)*intervalY
          ,fontSize=12
          ,x=0
          ,y=topGapY+splitLengthY*i
          ;
      writeYTick(context,num,fontSize,x,y);
    })();

    (function(){
      var y=topGapY+splitLengthY*i;
      paintYLine(context,y)
    })();

  }
  /*X轴方向布置*/
  _axisX.forEach(function(value,index){

    (function(){
      if(index==0){
        return
      }
      var num=value
          ,fontSize=12
          ,x=leftGapX+splitLengthX*index
          ,y=topGapY+chartHeight
          ;
      writeXTick(context,num,fontSize,x,y);
    })();
    (function(){
      var x=leftGapX+splitLengthX*index;
      paintXLine(context,x);
    })();
  });

  /*根据值画图表*/
  _axisY.forEach(function(value,index){
    (function(){
      var x=leftGapX+splitLengthX*(index+1)
          ,y=topGapY+Math.ceil((intervalY*splitNumY-value)/(intervalY*splitNumY)*chartHeight)
          ,r1=2*dpr
          ,r2=5*dpr
          ,c='#ff8e8c'
          ;
      paintCircle(context,x,y,r1,r2,c)
    })();
    // (function(){
    //   if(index==0){
    //     return;
    //   }
    //   var x1=leftGapX+splitGapX+Math.floor(splitLengthX/2)+(splitGapX*2+splitLengthX)*(index-1)
    //       ,y1=topGapY+Math.ceil((intervalY*splitNumY-axisY[index-1])/(intervalY*splitNumY)*chartHeight)
    //       ,x2=leftGapX+splitGapX+Math.floor(splitLengthX/2)+(splitGapX*2+splitLengthX)*index
    //       ,y2=topGapY+Math.ceil((intervalY*splitNumY-value)/(intervalY*splitNumY)*chartHeight)
    //       ,c='#ff7c7a'
    //       ;
    //   paintLink(context,x1,y1,x2,y2,c);
    // })();
  });

  /*写Y轴刻度*/
  function writeYTick(ctx,num,fontSize,x,y){
    ctx.save();
    ctx.beginPath();
    ctx.font = fontSize*dpr+"px serif";
    ctx.textBaseline='middle';
    ctx.textAlign='left';
    ctx.fillStyle='#c2c2c2';
    ctx.fillText(num,x,y);
    ctx.restore();
  }
  /*画Y轴横线*/
  function paintYLine(ctx,y){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(leftGapX,y);
    ctx.lineTo(leftGapX+chartWidth,y);
    ctx.lineWidth=dpr+'px';
    ctx.strokeStyle='#e2e2e2';
    ctx.stroke();
    ctx.restore();
  }
  /*写X轴刻度*/
  function writeXTick(ctx,num,fontSize,x,y){
    ctx.save();
    ctx.beginPath();
    ctx.font = fontSize*dpr+"px serif";
    ctx.textBaseline='top';
    ctx.textAlign='center';
    ctx.fillStyle='#c2c2c2';
    // ctx.translate(x, y);
    // ctx.rotate(45 * Math.PI / 180);
    ctx.fillText(num,x,y+12*dpr);
    ctx.restore();
  }
  /*画X轴的竖线*/
  function paintXLine(ctx,x){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x,topGapY);
    ctx.lineTo(x,topGapY+chartHeight);
    ctx.lineWidth=dpr+'px';
    ctx.strokeStyle='#e2e2e2';
    ctx.stroke();
    ctx.restore();
  }
  /*取出值开始画圆点*/
  function paintCircle(ctx,x,y,r1,r2,c){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle=c;
    ctx.arc(x,y,r1,0,2*Math.PI,false);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle=c;
    ctx.arc(x,y,r2,0,2*Math.PI,false);
    ctx.stroke();
    ctx.restore();
  }
  /*画之间的连线*/
  function paintLink(ctx,x1,y1,x2,y2,c){
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle=c;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.restore();
  }

  wrap.appendChild(canvas)
}

