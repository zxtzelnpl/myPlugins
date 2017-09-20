var record = {
    title: '五日平均涨幅',
    date: ['12.1', '12.1', '12.1', '12.1', '12.1', '12.1', '12.1', '12.1', '12.1', '12.1'],
    data: ['7.71', '15.64', '12.66', '9.12', '14.05', '19.67', '7.73', '5.41', '10.61', '14.16']
};

function chart5() {
    var distinguish = '平均涨幅',
        title_en_end = 'AVERAGE',
        remark = '注：推出当时价格为核算的基准价',
        dpr = Math.max(window.devicePixelRatio || 1, 1),
        delta,
        PI = Math.PI,
        box = {
            top: 65,
            left: 30,
            width: 250
        },
        yAxis = {
            line: {
                color: '#eeeff1',
                width: 1,
                space: 35,
                num: 4
            },
            label: {
                top: 65,
                left: 18,
                space: 35,
                fontSize: 7,
                color: '#c3c8ce'
            }

        },
        xAxis = {
            line: {
                color: '#65d3e3',
                width: 3
            },
            point: {
                relative_left: 10,
                color: '#f18f68',
                radius: 3,
                space: 25
            },
            label: {
                relative_top: 6,
                fontSize: 7,
                color: '#c3c8ce'
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
    function format_data(record, box, xAxis, yAxis) {
        var data = record.data;
        var max = Math.max.apply(null, data);
        yAxis.label.increase = Math.ceil(max / (yAxis.line.num - 1));
        yAxis.label.max = yAxis.label.increase * (yAxis.line.num - 1);
        xAxis.point.totalH = yAxis.line.space * (yAxis.line.num - 1);
        xAxis.point.bottom = box.top + xAxis.point.totalH;
        xAxis.point.left = box.left + xAxis.point.relative_left;
        xAxis.label.left = xAxis.point.left;
        xAxis.label.space = xAxis.point.space;
        xAxis.label.top = xAxis.label.relative_top + xAxis.point.bottom;

        xAxis.point.array = [];
        data.forEach(function (_data, _index) {
            var x = xAxis.point.left + xAxis.point.space * _index,
                y = xAxis.point.bottom - (_data / yAxis.label.max ) * xAxis.point.totalH;
            xAxis.point.array.push(Point(x, y))
        })
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

    /*paint-Y轴坐标*/
    function paintYLine(ctx, obj) {
        ctx.save();
        ctx.beginPath();

        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var width = adapt(obj.width, delta);
        var lineWidth = adapt(obj.line.width, delta);
        var color = obj.line.color || '#ffffff';

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.restore();
    }

    /*paint-折线*/
    function paintLine(ctx, obj) {
        ctx.save();
        ctx.beginPath();

        var points = obj.points.map((function(_point){
            var x = adapt(_point.x,delta);
            var y = adapt(_point.y,delta);
            return Point(x,y)
        }));
        var width = adapt(obj.width,delta);
        var color = obj.color;

        ctx.moveTo(points[0].x,points[0].y);
        points.forEach(function(_point,index){
            if(index===0){return}
            ctx.lineTo(_point.x,_point.y)
        });
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.restore();
    }

    /*paint-画点*/
    function paintPoint(ctx,obj){
        ctx.save();
        ctx.beginPath();

        var x = adapt(obj.x,delta);
        var y = adapt(obj.y,delta);
        var radius = adapt(obj.radius,delta);
        var color = obj.color||'#000000';

        ctx.arc(x,y,radius,0,2*PI,true);
        ctx.fillStyle = color;

        ctx.fill();

        ctx.restore();
    }

    return function paintCanvas(main, record) {
        format_data(record, box, xAxis, yAxis);
        var CANVAS = document.createElement('canvas');
        var main_width = main.clientWidth;
        var main_height = main.clientHeight;
        var base_width = 300;//设计稿宽度为600
        var base_height = 200;//设计稿高度为400
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

        /*画Y坐标轴*/
        for (var i = 0; i < yAxis.line.num; i++) {
            paintYLine(CONTEXT, {
                x: box.left,
                y: box.top + i * yAxis.line.space,
                width: box.width,
                line: yAxis.line,
                label: yAxis.label
            });
            writeText(CONTEXT, {
                x: yAxis.label.left,
                y: yAxis.label.top + i * yAxis.label.space,
                base: 'middle',
                align: 'left',
                fontSize: yAxis.label.fontSize,
                color: yAxis.label.color,
                text: yAxis.label.increase * (yAxis.line.num - 1 - i),
                fill: true
            })

        }

        /*画折现*/
        paintLine(CONTEXT,
            {
                points: xAxis.point.array,
                width: xAxis.line.width,
                color: xAxis.line.color
            }
        );

        xAxis.point.array.forEach(function(_point){
            var obj = {
                x:_point.x,
                y:_point.y,
                color:xAxis.point.color,
                radius:xAxis.point.radius
            };
            paintPoint(CONTEXT,obj)
        });

        /*写坐标*/
        record.date.forEach(function (_date, index) {
            writeText(CONTEXT, {
                x: xAxis.label.left + index * xAxis.label.space,
                y: xAxis.label.top,
                base: 'top',
                align: 'center',
                fontSize: xAxis.label.fontSize,
                color: xAxis.label.color,
                text: _date,
                fill: true
            });
        });

        main.appendChild(CANVAS);
        console.log(delta, center, CANVAS)
    }
}

var main = document.getElementById('main5');
var chart = chart5();
chart(main, record);
