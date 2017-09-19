var record = {
    title: '五日上涨个数',
    data: [38, 6]
};

function chart6() {
    var distinguish = '上涨个数',
        title_en_end = 'RISE',
        remark = '注：推出当时价格为核算的基准价',
        base_width = 300,//设计稿宽度为600
        base_height = 230,//设计稿高度为460
        dpr = Math.max(window.devicePixelRatio || 1, 1),
        delta,
        PI = Math.PI,
        sin = Math.sin,
        cos = Math.cos,
        atan = Math.atan,
        box = {
            y: 175,
            radius1: 107,
            radius2: 77,
            width: 30,

            fall_color: '#51db71',
            rise_color: '#f18f68',
            inner_color:'#ffffff'
        },
        pointer = {
            y: 165,
            angle:PI/3,
            d_angle:6/180*PI,
            color: '#c9c9c9',
            length:68,
            distance:6,
            wrap_color: '#838383',
            inner_radius: 11,
            outer_radius: 16,
            ring_width:5
        },
        label = {
            color: '#c3c8ce',
            fontSize: 9,
            start: {
                relative_left: 25,
                y: 175,
                text: ' 0'
            },
            middle: {
                y: 55,
                text: '22'
            },
            end: {
                relative_right: 25,
                y: 175,
                text: '44'
            }
        },
        data = {
            color: '#c3c8ce',
            fontSize: 9,
            fall: {
                relative_left: 40,
                relative_bottom: 20
            },
            total: {
                relative_bottom: 20
            },
            rise: {
                relative_right: 40,
                relative_bottom: 20
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
    function format_data(record, box, label, data) {
        record.rise = record.data[0];
        record.fall = record.data[1];
        record.total = record.rise + record.fall;

        box.x = base_width / 2;

        label.start.x = label.start.relative_left;
        label.middle.x = base_width / 2;
        label.end.x = base_width - label.end.relative_right;

        data.fall.x = data.fall.relative_left;
        data.fall.y = base_height - data.fall.relative_bottom;
        data.fall.text = '下跌个数：' + record.fall;
        data.fall.startAngle = -PI;
        data.fall.endAngle = data.fall.startAngle + PI * (record.fall / record.total);
        data.total.x = base_width / 2;
        data.total.y = base_height - data.total.relative_bottom;
        data.total.text = '总个数：' + record.total;
        data.rise.x = base_width - data.rise.relative_right;
        data.rise.y = base_height - data.rise.relative_bottom;
        data.rise.text = '上涨个数：' + record.rise;
        data.rise.startAngle = data.fall.startAngle + PI * (record.fall / record.total);
        data.rise.endAngle = 0;

        pointer.x = base_width/2;
        pointer.actor= Point(
            pointer.x-pointer.length * cos((record.fall / record.total)*PI),
            pointer.y-pointer.length * sin((record.fall / record.total)*PI)
        );
        pointer.one = Point(
            pointer.x,
            pointer.y-pointer.length
        );
        pointer.two = Point(
            pointer.x-pointer.inner_radius*cos((PI-pointer.angle)/2),
            pointer.y-pointer.inner_radius*sin((PI-pointer.angle)/2)
        );
        pointer.three = Point(
            pointer.x+pointer.inner_radius*cos((PI-pointer.angle)/2),
            pointer.y-pointer.inner_radius*sin((PI-pointer.angle)/2)
        );

    }

    /*toll-Point*/
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

    /*paint-指针*/
    function paintPointer(ctx,obj){
        var P = Point(adapt(obj.x,delta),adapt(obj.y,delta));
        var P_ONE = Point(adapt(obj.one.x-obj.x,delta),adapt(obj.one.y-obj.y,delta));
        var P_TWO = Point(adapt(obj.two.x-obj.x,delta),adapt(obj.two.y-obj.y,delta));
        var P_THREE = Point(adapt(obj.three.x-obj.x,delta),adapt(obj.three.y-obj.y,delta));
        var P_ACTOR = Point(adapt(obj.actor.x-obj.x,delta),adapt(obj.actor.y-obj.y,delta));
        var color = obj.color||'#000000';
        var d_angle = pointer.d_angle;
        var angle =evaluation_angle(P_ACTOR,{x:0,y:0});
        console.log(angle/PI);

        ctx.save();
        ctx.beginPath();
        ctx.translate(P.x,P.y);
        ctx.rotate(-angle-d_angle);
        ctx.moveTo(0,0);
        ctx.lineTo(P_TWO.x,P_TWO.y);
        ctx.lineTo(P_ONE.x,P_ONE.y);
        ctx.lineTo(P_THREE.x,P_THREE.y);

        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    }

    return function paintCanvas(main, record) {
        format_data(record, box, label, data);
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

        /*环形坐标*/
        writeText(CONTEXT, {
            x: label.start.x,
            y: label.start.y,
            text: label.start.text,
            color: label.color,
            fontSize: label.fontSize,
            base: 'bottom',
            align: 'left',
            fill: true
        });
        writeText(CONTEXT, {
            x: label.middle.x,
            y: label.middle.y,
            text: label.middle.text,
            color: label.color,
            fontSize: label.fontSize,
            base: 'top',
            align: 'center',
            fill: true
        });
        writeText(CONTEXT, {
            x: label.end.x,
            y: label.end.y,
            text: label.end.text,
            color: label.color,
            fontSize: label.fontSize,
            base: 'bottom',
            align: 'right',
            fill: true
        });

        paintRing(CONTEXT, {
            x: box.x,
            y: box.y,
            radius: box.radius2,
            width: box.width,
            startAngle: data.fall.startAngle,
            endAngle: data.fall.endAngle,
            anticlockwise: false,
            color: box.fall_color,
            inner_color:box.inner_color
        });
        paintRing(CONTEXT, {
            x: box.x,
            y: box.y,
            radius: box.radius2,
            width: box.width,
            startAngle: data.rise.startAngle,
            endAngle: data.rise.endAngle,
            anticlockwise: false,
            color: box.rise_color,
            inner_color:box.inner_color
        });

        /*环形数值*/
        writeText(CONTEXT, {
            x: data.fall.x,
            y: data.fall.y,
            text: data.fall.text,
            color: data.color,
            fontSize: data.fontSize,
            base: 'bottom',
            align: 'left',
            fill: true
        });
        writeText(CONTEXT, {
            x: data.total.x,
            y: data.total.y,
            text: data.total.text,
            color: data.color,
            fontSize: data.fontSize,
            base: 'bottom',
            align: 'center',
            fill: true
        });
        writeText(CONTEXT, {
            x: data.rise.x,
            y: data.rise.y,
            text: data.rise.text,
            color: data.color,
            fontSize: data.fontSize,
            base: 'bottom',
            align: 'right',
            fill: true
        });

        /*指针*/
        paintRing(CONTEXT,{
            x:pointer.x,
            y:pointer.y,
            radius:pointer.inner_radius,
            width:pointer.ring_width,
            startAngle:0,
            endAngle:2*PI,
            anticlockwise: false,
            color:pointer.wrap_color,
            inner_color:pointer.color,
        });
        paintPointer(CONTEXT,pointer);

        /*图表载入*/
        main.appendChild(CANVAS);
        console.log(delta, center, CANVAS)
    }
}

var main = document.getElementById('main6');
var chart = chart6();
chart(main, record);