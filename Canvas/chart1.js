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
var axisY = ['1月3日','1月3日','1月3日','1月3日','1月3日'];
var axisX1 = [8.71,12.43,13.95,10.13,7.61];
var axisX2 = [7.64,10.11,10.67,9.46,11.92];
function chart1(wrapID,title,axisY,axisX1,axisX2){
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

  var splitNumX=axisX1.length+axisX2.length;
  var leftGapX=24*dpr;//左边有2个字符，小于24px
  var rightGapX=6*dpr;//右边无字符，但是需要空下距离
  var chartWidth=canvasW-leftGapX-rightGapX;
  var splitGapX=Math.floor(Math.floor(chartWidth/splitNumX)/3); //X轴柱状之间的间隔为柱状的1/2
  var splitLengthX=Math.floor(chartWidth/splitNumX)-splitGapX; //柱状的宽度

  var splitNumY=Math.ceil(Math.max.apply(undefined,axisX1.concat(axisX2))/3);
  var topGapY=6*dpr;//顶部留高度半个字符6px
  var bottomGapY=54*dpr;//减去四个字符54px
  var chartHeight=canvasH-topGapY-bottomGapY;//图表Y最高轴到最低轴的距离
  var splitLengthY=Math.floor(chartHeight/splitNumY);//Y轴刻度之间的高度





  writeYTick(context,15,12,0,splitLengthY*0);
  writeYTick(context,12,12,0,splitLengthY*1);
  writeYTick(context,9,12,0,splitLengthY*2);
  writeYTick(context,6,12,0,splitLengthY*3);
  writeYTick(context,3,12,0,splitLengthY*4);
  writeYTick(context,0,12,0,splitLengthY*5);
  paintYLine(context,24*dpr,6*dpr);
  paintYLine(context,24*dpr,6*dpr+splitLengthY);
  paintYLine(context,24*dpr,6*dpr+splitLengthY*2);
  paintYLine(context,24*dpr,6*dpr+splitLengthY*3);
  paintYLine(context,24*dpr,6*dpr+splitLengthY*4);
  paintYLine(context,24*dpr,6*dpr+splitLengthY*5);

  function writeYTick(ctx,num,fontSize,x,y){
    ctx.save();
    ctx.beginPath();
    ctx.font = fontSize*dpr+"px serif";
    ctx.textBaseline='top';
    ctx.textAlign='left';
    ctx.fillStyle='#c2c2c2';
    ctx.fillText(num,x,y);
    ctx.restore();
  }

  function writeXTick(ctx,num,fontSize,x,y){
    ctx.save();
    ctx.beginPath();
    ctx.font = fontSize*dpr+"px serif";
    ctx.textBaseline='top';
    ctx.textAlign='left';
    ctx.fillStyle='#c2c2c2';
    ctx.fillText(num,x,y);
    ctx.restore();
  }

  function paintYLine(ctx,x,y){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+10*chartWidth,y);
    ctx.lineWidth=dpr+'px';
    ctx.strokeStyle='#e2e2e2';
    ctx.stroke();
    ctx.restore();
  }



  wrap.appendChild(canvas)
};

chart1('canvas',6,axisY,axisX1,axisX2);

