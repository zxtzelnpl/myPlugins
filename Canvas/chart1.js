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
var axisX = ['1月3日','1月3日','1月3日','1月3日','1月3日'];
var axisY1 = [8.71,12.43,13.95,10.13,7.61];
var axisY2 = [7.64,10.11,10.67,9.46,11.92];
function chart1(wrapID,title,axisX,axisY1,axisY2){
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
  var axisY=[];
  (function(){
    for(var i=0,len=axisX.length;i<len;i++){
      axisY.push(axisY1[i]);
      axisY.push(axisY2[i]);
    }
  })();

  var splitNumX=axisY1.length+axisY2.length;
  var leftGapX=24*dpr;//左边有2个字符，小于24px
  var rightGapX=6*dpr;//右边无字符，但是需要空下距离
  var chartWidth=canvasW-leftGapX-rightGapX;
  var splitGapX=Math.floor(chartWidth/splitNumX/4); //X轴柱状之间的间隔为柱状的1/2的1/2的floor
  var splitLengthX=Math.floor(chartWidth/splitNumX)-splitGapX*2; //柱状的宽度

  var intervalY=3;
  var splitNumY=Math.ceil(Math.max.apply(undefined,axisY1.concat(axisY2))/intervalY);
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
  axisX.forEach(function(value,index){
    (function(){
      var num=value
          ,fontSize=12
          ,x1=leftGapX+splitGapX+Math.floor(splitLengthX/2)+(splitGapX*2+splitLengthX)*(index*2)
          ,x2=leftGapX+splitGapX+Math.floor(splitLengthX/2)+(splitGapX*2+splitLengthX)*(index*2+1)
          ,y=topGapY+chartHeight
          ;
      writeXTick(context,num,fontSize,x1,y);
      writeXTick(context,num,fontSize,x2,y);
    })();
    (function(){
      var x1=leftGapX+splitGapX+(splitGapX*2+splitLengthX)*(index*2)
          ,x2=leftGapX+splitGapX+(splitGapX*2+splitLengthX)*(index*2+1)
          ,y=topGapY
          ,w=splitLengthX
          ,h=chartHeight
          ,c='#e7e7e7'
          ;
      paintCylinder(context,x1,y,w,h,c);
      paintCylinder(context,x2,y,w,h,c);
    })();
  });

  axisY.forEach(function(value,index){
    (function(){
      var x=leftGapX+splitGapX+(splitGapX*2+splitLengthX)*index
          ,y=topGapY+Math.ceil((intervalY*splitNumY-value)/(intervalY*splitNumY)*chartHeight)
          ,w=splitLengthX
          ,h=chartHeight-Math.ceil((intervalY*splitNumY-value)/(intervalY*splitNumY)*chartHeight)
          ,c1='#feb7b6'
          ,c2='#ff7d7b'
          ;
      paintCylinderValue(context,x,y,w,h,c1,c2)
    })();
    (function(){
      var x=leftGapX+splitGapX+Math.floor(splitLengthX/2)+(splitGapX*2+splitLengthX)*index
          ,y=topGapY+Math.ceil((intervalY*splitNumY-value)/(intervalY*splitNumY)*chartHeight)
          ,radius=3*dpr
          ,c='#ff7c7a'
          ;
      paintCircle(context,x,y,radius,c)
    })();
    (function(){
      if(index==0){
        return;
      }
      var x1=leftGapX+splitGapX+Math.floor(splitLengthX/2)+(splitGapX*2+splitLengthX)*(index-1)
          ,y1=topGapY+Math.ceil((intervalY*splitNumY-axisY[index-1])/(intervalY*splitNumY)*chartHeight)
          ,x2=leftGapX+splitGapX+Math.floor(splitLengthX/2)+(splitGapX*2+splitLengthX)*index
          ,y2=topGapY+Math.ceil((intervalY*splitNumY-value)/(intervalY*splitNumY)*chartHeight)
          ,c='#ff7c7a'
          ;
      paintLink(context,x1,y1,x2,y2,c);
    })();
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
    ctx.textAlign='left';
    ctx.fillStyle='#c2c2c2';
    ctx.translate(x, y);
    ctx.rotate(45 * Math.PI / 180);
    ctx.fillText(num,0,0);
    ctx.restore();
  }
  /*画X轴的柱形图*/
  function paintCylinder(ctx,x,y,w,h,c){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle=c;
    ctx.fillRect(x,y,w,h);
    ctx.restore();
  }
  /*取出值开始画柱状图*/
  function paintCylinderValue(ctx,x,y,w,h,c1,c2){
    ctx.save();
    ctx.beginPath();
    var gradient=ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0,c1);
    gradient.addColorStop(1,c2);
    ctx.fillStyle=gradient;
    ctx.fillRect(x,y,w,h);
    ctx.restore();
  }
  /*取出值开始画圆点*/
  function paintCircle(ctx,x,y,radius,c){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle=c;
    ctx.arc(x,y,radius,0,2*Math.PI,false);
    ctx.fill();
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
};

chart1('canvas',6,axisX,axisY1,axisY2);