var chartsArray = [
  '图表'
  , '五日平均涨幅'//1
  , '次日上涨个数'//2
  , '三日上涨个数'//3
  , '五日上涨个数'//4
  , '次日最大涨幅'//5
  , '三日最大涨幅'//6
  , '五日最大涨幅'//7
  , '次日上涨概率'//8
  , '三日上涨概率'//9
  , '五日上涨概率'//10
];
// var axisX = ['1月3日','1月3日','1月3日','1月3日','1月3日'];
var srcBg = '../public/images/bg.jpg';
var axisY = [37, 7];
chart4('canvas', axisY);

function chart4(wrapID, axisY) {
  var dpr = Math.max(window.devicePixelRatio || 1, 1);//2
  var wrap = document.getElementById(wrapID);
  var canvas = document.createElement('canvas');
  var width = wrap.scrollWidth;
  var height = wrap.scrollHeight;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  var canvasW = canvas.width = width * dpr;
  var canvasH = canvas.height = height * dpr;

  var context = canvas.getContext('2d');

  paintPicture(context,0,0,canvasW,150*dpr,srcBg,function(){
    var up=axisY[0];
    var down=axisY[1];
    var sum=axisY[0]+axisY[1];
    var startAngle = 3/4*Math.PI;
    var endAngle = 9/4*Math.PI;
    var intervalAngle=(endAngle-startAngle)/sum;

    var x1=canvasW/2+Math.cos(startAngle+intervalAngle*down)*50*dpr
        ,y1=75*dpr+Math.sin(startAngle+intervalAngle*down)*50*dpr
        ,x2=canvasW/2+Math.cos(startAngle+intervalAngle*down)*10*dpr
        ,y2=75*dpr+Math.sin(startAngle+intervalAngle*down)*10*dpr
        ;
    console.log(x1,y1,x2,y2);

    paintSectorRing(context,canvasW/2,75*dpr,50*dpr,startAngle,startAngle+intervalAngle*down,'#57e27a');
    paintSectorRing(context,canvasW/2,75*dpr,50*dpr,startAngle+intervalAngle*down,endAngle,'#f15d53');
    paintLink(context,x1,y1,x2,y2,'#f15d53');
    writeText(context,16*dpr,down,24*dpr,160*dpr,'#000','middle','left');
    writeText(context,10*dpr,'个',40*dpr,160*dpr,'#000','middle','left');
    writeText(context,10*dpr,'下跌个数',0,160*dpr+24*dpr,'#000','middle','left');

    writeText(context,16*dpr,sum,canvasW/2-6*dpr,160*dpr,'#000','middle','center');
    writeText(context,10*dpr,'个',canvasW/2+20*dpr,160*dpr,'#000','middle','center');
    writeText(context,10*dpr,'总个数',canvasW/2,160*dpr+24*dpr,'#000','middle','center');

    writeText(context,16*dpr,up,canvasW-30*dpr,160*dpr,'#000','middle','right');
    writeText(context,10*dpr,'个',canvasW-12*dpr,160*dpr,'#000','middle','right');
    writeText(context,10*dpr,'上涨个数',canvasW,160*dpr+24*dpr,'#000','middle','right');
  });



  /*画一个圆形*/
  function paintCircle(ctx, x, y, r, c) {
    var gradient;
    ctx.save();
    ctx.beginPath();
    if (typeof c === 'string') {
      ctx.fillStyle = c;
    } else {
      gradient = ctx.createLinearGradient(0, 0, r, 0);
      gradient.addColorStop(0, c[0]);
      gradient.addColorStop(1, c[1]);
      ctx.fillStyle = gradient;
    }

    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();
  };

  /*画扇形*/
  function paintSectorRing(ctx, x, y, r, startAngle, endAngle, c) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 10 * dpr;
    ctx.strokeStyle = c;
    ctx.arc(x, y, r, startAngle, endAngle, false);
    ctx.stroke();
  }

  /*画图片*/
  function paintPicture(ctx, dx, dy, dwidth, dheight, src,next) {
    var img = new Image();
    ctx.beginPath();
    img.src = src;
    img.onload = function () {
      ctx.drawImage(img, dx, dy, dwidth, dheight);
      next();
    }
  }

  /*画矩形*/
  function paintReact(ctx, x, y, w, h, c) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
  }

  /*画之间的连线*/
  function paintLink(ctx,x1,y1,x2,y2,c){
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2 * dpr;
    ctx.strokeStyle=c;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.restore();
  }

  /*描大字*/
  function writeText(ctx, fontSize, text, x, y,c,base,align) {
    ctx.save();
    ctx.beginPath();
    ctx.font = 'normal normal bold ' + (fontSize * dpr) + "px serif";
    ctx.textBaseline = base;
    ctx.textAlign = align;
    ctx.fillStyle = c;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  wrap.appendChild(canvas)
}