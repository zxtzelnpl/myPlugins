var record =    {
    title: '次日上涨概率',
    date: ['2017-8-31', '2017-8-31', '2017-8-31', '2017-8-31', '2017-8-31'],
    data: [2, 1, 1, 2, 1]
};

function chart7(){
    var distinguish = '上涨个数',
        title_en_end = 'RISE PROBABILITY',
        remark = '注：推出当时价格为核算的基准价',
        base_width = 300,//设计稿宽度为600
        base_height = 250,//设计稿高度为500
        dpr = Math.max(window.devicePixelRatio || 1, 1),
        delta,
        PI = Math.PI,
        sin = Math.sin,
        cos = Math.cos,
        box={
            y:194,
            radius:98
        },
        little_box={
            radius:35,
            color1:'#f18f68',
            color2:'#b7e4ee',
            fontColor:'#ffffff',
            fontSize:16
        },
        middle={
            y:194,
            radius:37,
            fontSize:25,
            fontColor:'#ffffff',
            startAngle : 0,
            endAngle:2*PI,
            anticlockwise:true,
            color:'#ee7342',
            ring:{
                y:194,
                radius:46,
                startAngle : 0,
                endAngle:2*PI,
                anticlockwise:true,
                width:2,
                color:'#daf0f5'
            }
        }
    ;

    /*tool-中文转英文*/
    function cn_to_en(str) {
        switch (str) {
            case '五日':
                return 'FIVE-DAY';
            case '三日':
                return 'THREE-DAY';
            case '次日':
                return 'NEXT-DAY';
            default:
                return ''
        }
    }

    /*tool-格式化数据*/
    function format_data(record, box, little_box, middle) {
        var A = -PI*9/10,B=PI/5;
        record.total = record.data.reduce(function(prev,next){
            return prev+next
        });
        record.probability = record.total*100/(record.data.length*2) +'%';

        box.x = base_width/2;

        little_box.points = record.data.map(function(_data,i){
            var obj={};
            obj.rotate = A+B*i;
            obj.text = _data + '个';
            obj.x =  box.x+cos(A+B*i)*box.radius;
            obj.y =  box.y+sin(A+B*i)*box.radius;
            obj.color = i%2===0?little_box.color1:little_box.color2;
            obj.r = little_box.radius;
            return obj;
        });

        middle.x = base_width/2;
        middle.ring.x = base_width/2;
    }

    /*tool-Point*/
    function Point(x, y) {
        return {
            x: x, y: y
        }
    }

    /*tool-num*/
    function adapt(num, delta) {
        return parseInt(num * delta)
    }

    /*tool-angle*/
    function evaluation_angle(point,center){
        var a = center.y-point.y;
        var b = center.x-point.x;
        return atan(b/a);
    }

    /*paint-写字*/
    function writeText(ctx, obj) {
        var fontSize = adapt((obj.fontSize || 12), delta);
        var c = obj.color || '#000000';
        var base = obj.base || 'middle';
        var align = obj.align || 'center';
        var fill = obj.fill || false;
        var text = obj.text;
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var weight = obj.weight || 'normal';

        ctx.save();
        ctx.beginPath();
        ctx.font = 'normal normal ' + weight + ' ' + fontSize + "px serif";
        ctx.textBaseline = base;
        ctx.textAlign = align;
        if (fill) {
            ctx.fillStyle = c;
            ctx.fillText(text, x, y);
        }
        else {
            ctx.strokeStyle = c;
            ctx.strokeText(text, x, y);
        }
        ctx.restore();
    }

    /*paint-长方形*/
    function paintReact(ctx, obj) {
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var w = adapt(obj.w, delta);
        var h = adapt(obj.h, delta);
        var c = obj.c;
        var fill = obj.fill;

        ctx.save();
        ctx.beginPath();
        if (fill) {
            ctx.fillStyle = c;
            ctx.fillRect(x, y, w, h);
        } else {
            ctx.lineWidth = delta;
            ctx.strokeStyle = c;
            ctx.strokeRect(x, y, w, h);
        }
        ctx.restore();
    }

    /*paint-五边形*/
    function paintPentagon(ctx,obj,index){
        ctx.save();
        ctx.beginPath();

        var x = obj.x;
        var y = obj.y;
        var r = obj.r;
        var c = obj.color;
        var deg = obj.rotate;

        var A = PI/2 - PI*2/5;
        var B = PI*2/5 - A;

        var ONE=Point(adapt(0,delta),adapt(-r,delta));
        var TWO=Point(adapt(cos(A)*r,delta),adapt(-sin(A)*r,delta));
        var THREE=Point(adapt(cos(B)*r,delta),adapt(sin(B)*r,delta));
        var FOUR =Point(adapt(-cos(B)*r,delta),adapt(sin(B)*r,delta));
        var FIVE = Point(adapt(-cos(A)*r,delta),adapt(-sin(A)*r,delta));
        var X = adapt(x,delta);
        var Y = adapt(y,delta);

        ctx.translate(X,Y);
        if(index===1||index===3){
            console.log(index);
            console.log(deg/PI);
            ctx.rotate(deg+PI/10);
        }

        ctx.moveTo(ONE.x,ONE.y);
        ctx.lineTo(TWO.x,TWO.y);
        ctx.lineTo(THREE.x,THREE.y);
        ctx.lineTo(FOUR.x,FOUR.y);
        ctx.lineTo(FIVE.x,FIVE.y);
        ctx.lineTo(ONE.x,ONE.y);

        ctx.fillStyle = c;
        ctx.fill();

        ctx.restore();
    }

    /*paint-环形*/
    function paintRing(ctx, obj) {
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var radius = adapt(obj.radius, delta);
        var width = adapt(obj.width, delta);
        var startAngle = obj.startAngle;
        var endAngle = obj.endAngle;
        var anticlockwise = obj.anticlockwise;
        var color = obj.color||'#000000';
        var inner_color = obj.inner_color||'#ffffff';

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(x, y, radius+width, startAngle, endAngle, anticlockwise);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(x, y, radius, 0, 2*PI, anticlockwise);
        ctx.fillStyle = inner_color;
        ctx.fill();
        ctx.restore();
    }

    /*paint-圆形*/
    function paintCircle(ctx,obj){
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var radius = adapt(obj.radius, delta);
        var startAngle = obj.startAngle;
        var endAngle = obj.endAngle;
        var anticlockwise = obj.anticlockwise;
        var color = obj.color||'#000000';

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    return function paintCanvas(main, record) {
        format_data(record, box, little_box, middle);
        var CANVAS = document.createElement('canvas');
        var main_width = main.clientWidth;
        var main_height = main.clientHeight;
        var title = record.title;
        var title_en = cn_to_en(title.slice(0, 2)) + ' ' + title_en_end;
        delta = dpr * main_width / base_width;
        CANVAS.width = base_width * delta;
        CANVAS.height = base_height * delta;
        CANVAS.style.width = main_width + 'px';
        CANVAS.style.height = main_height + 'px';
        var CONTEXT = CANVAS.getContext('2d');
        var center = Point(base_width / 2, base_height / 2);

        /*图表标题*/
        paintReact(CONTEXT, {
            x: 90,
            y: 20,
            w: 120,
            h: 22.5,
            c: '#000000'
        });
        paintReact(CONTEXT, {
            x: 110,
            y: 15,
            w: 80,
            h: 15,
            c: '#ffffff',
            fill: true
        });
        writeText(CONTEXT, {
            x: center.x,
            y: 15,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: title,
            fill: true
        });
        writeText(CONTEXT, {
            x: center.x,
            y: 30,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: title_en,
            fontSize: 8,
            fill: true
        });

        /*五个5边形状*/
        little_box.points.forEach(function(point,index){
            paintPentagon(CONTEXT,point,index);
            writeText(CONTEXT, {
                x: point.x,
                y: point.y,
                base: 'middle',
                align: 'center',
                weight: 'bold',
                text: point.text,
                fill: true,
                color:little_box.fontColor,
                fontSize:little_box.fontSize
            });
        });

        paintRing(CONTEXT,middle.ring);
        paintCircle(CONTEXT,middle);
        writeText(CONTEXT, {
            x: middle.x,
            y: middle.y,
            base: 'middle',
            align: 'center',
            weight: 'bold',
            text: record.probability,
            fontSize: middle.fontSize,
            color:'#ffffff',
            fill: true
        });

        /*图表载入*/
        main.appendChild(CANVAS);
    }
}

var main = document.getElementById('main7');
var chart = chart7();
chart(main, record);