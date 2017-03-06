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
var axisY = [2, 2, 2, 1, 2];
chart3('canvas3', axisY);


function chart3(wrapID, axisY) {
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

    var sectors = [
        {
            color:'#ec657f'
            , radius: 55 * dpr
        }
        , {
            color:'#ec657f'
            , radius: 85 * dpr
        }
        ,{
            color:'#ec657f'
            , radius: 70 * dpr
        }
        ,{
            color:'#ec657f'
            , radius: 60 * dpr
        }
        ,{
            color:'#ec657f'
            , radius: 50 * dpr
        }
        ,{
            color:'#ec657f'
            , radius: 40 * dpr
        }
        ,{
            color:'#ec657f'
            , radius: 75 * dpr
        }
        ,{
            color:'#ec657f'
            , radius: 80 * dpr
        }
        ,{
            color:'#ec657f'
            , radius: 63 * dpr
        }
    ];
    var angle=2*Math.PI/sectors.length;
    var startAngle=2*Math.PI/sectors.length;
    var rings = [
        {
            x: 70 * dpr
            , y: 36 * dpr
            , outerR: 36 * dpr
            , innerR: 20 * dpr
            , innerC: '#fff'
            , outerC: ['#f4bcb8', '#ed859f']
            , triPoints: [
            {x:102*dpr, y:40*dpr}
            , {x:106*dpr, y:63*dpr}
            , {x:96*dpr, y:50*dpr}
        ],
            triC:'#ed859f'
        }
        , {
            x: 240 * dpr
            , y: 45 * dpr
            , outerR: 36 * dpr
            , innerR: 20 * dpr
            , innerC: '#fff'
            , outerC: ['#aed9ef', '#88d5eb']
            , triPoints: [
                {x:205*dpr, y:50*dpr}
                , {x:200*dpr, y:75*dpr}
                , {x:210*dpr, y:60*dpr}
            ],
            triC:'#aed9ef'
        }
        , {
            x: 264 * dpr
            , y: 170 * dpr
            , outerR: 36 * dpr
            , innerR: 20 * dpr
            , innerC: '#fff'
            , outerC: ['#f0b983', '#f7c981']
            , triPoints: [
                {x:230*dpr, y:170*dpr}
                , {x:220*dpr, y:170*dpr}
                , {x:231*dpr, y:182*dpr}
            ],
            triC:'#f0b983'
        }
        , {
            x: 160 * dpr
            , y: 245 * dpr
            , outerR: 36 * dpr
            , innerR: 20 * dpr
            , innerC: '#fff'
            , outerC: '#f9f482'
            , triPoints: [
                {x:173*dpr, y:211*dpr}
                , {x:175*dpr, y:200*dpr}
                , {x:182*dpr, y:217*dpr}
            ],
            triC:'#f9f482'
        }
        , {
            x: 36 * dpr
            , y: 165 * dpr
            , outerR: 36 * dpr
            , innerR: 20 * dpr
            , innerC: '#fff'
            , outerC: '#f4a988'
            , triPoints: [
                {x:60*dpr, y:139*dpr}
                , {x:77*dpr, y:142*dpr}
                , {x:64*dpr, y:145*dpr}
            ],
            triC:'#f4a988'
        }
    ];

    /*处理Y轴数据,获得概率*/
    var sum = axisY.reduce(function (pre, cur) {
        return pre + cur;
    });
    var probability = parseInt(sum * 100 / axisY.length / 2) + '%';

    sectors.sort(function(a,b){
        return b.radius-a.radius;
    });
    sectors.forEach(function(sector,index){

    });
    axisY.forEach(function(value,index){
        var r=rings[index];
        paintTriangle(context,r.triPoints,r.triC);
        paintCircle(context,r.x,r.y,r.outerR,r.outerC);
        paintCircle(context,r.x,r.y,r.innerR,r.innerC);
        writeText(context,18,value+'个',r.x,r.y);
    });
    /*画一个圆形*/
    function paintCircle(ctx,x,y,r,c){
        var gradient;
        ctx.save();
        ctx.beginPath();
        if(typeof c==='string'){
            ctx.fillStyle = c;
        }else{
            gradient=ctx.createLinearGradient(0,0,r,0);
            gradient.addColorStop(0,c[0]);
            gradient.addColorStop(1,c[1]);
            ctx.fillStyle=gradient;
        }

        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    /*画途中的三角形*/
    function paintTriangle(ctx,points,c){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle=c;
        ctx.moveTo(points[0].x,points[0].y);
        ctx.lineTo(points[1].x,points[1].y);
        ctx.lineTo(points[2].x,points[2].y);
        ctx.closePath();
        ctx.fill();
        ctx.restore()
    }

    /*写大字*/
    function writeText(ctx,fontSize,text,x,y){
        ctx.save();
        ctx.beginPath();
        ctx.font ='normal normal bold '+ (fontSize * dpr) + "px serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#c2c2c2';
        ctx.fillText(text, x, y);
        ctx.restore();
    }

    wrap.appendChild(canvas)
}