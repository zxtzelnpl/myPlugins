var record = {
    title: '五日最大涨幅',
    date: ['8.18', '8.21', '8.22', '8.23', '8.24'],
    data1: ['6.61', '10.43', '7.41', '13.13', '4.61'],
    data2: ['5.64', '11.11', '8.46', '20.06', '7.43']
};

function chart4() {
    var distinguish = '最大涨幅',
        title_en_end = 'MAXIMUM',
        remark = '注：推出当时价格为核算的基准价',
        dpr = Math.max(window.devicePixelRatio || 1, 1),
        delta,
        box = {
            top: 62.5,
            left: 30,
            width: 250
        },
        yAxis = {
            line: {
                color: '#eeeff1',
                width: 1,
                space: 35,
                num: 5
            },
            label: {
                top: 62.5,
                left: 17.5,
                space: 35,
                fontSize: 8,
                color: '#c3c8ce'
            }

        },
        xAxis = {
            bar: {
                left: 5,
                color1: '#f18f68',
                color2: '#b7e4ee',
                width: 15,
                space: 10
            },
            label: {
                relative_top: 6,
                fontSize: 8,
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
        var data = record.data1.concat(record.data2);
        var max = Math.max.apply(null, data);
        yAxis.label.increase = Math.ceil(max / (yAxis.line.num - 1));
        yAxis.label.max = yAxis.label.increase * (yAxis.line.num - 1);
        xAxis.bar.totalH = yAxis.line.space * (yAxis.line.num - 1);
        xAxis.bar.bottom = box.top + xAxis.bar.totalH;
        xAxis.label.left = box.left + xAxis.bar.left + xAxis.bar.width + xAxis.bar.space / 2;
        xAxis.label.space = (xAxis.bar.width + xAxis.bar.space) * 2;
        xAxis.label.top = xAxis.label.relative_top + xAxis.bar.bottom;
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

    /*paint-bar*/
    function paintBar(ctx, obj) {
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var w = adapt(obj.w, delta);
        var h = adapt(obj.h, delta);
        var c = obj.c;
        var r = 6;
        var ptA = Point(x + r, y);
        var ptB = Point(x + w, y);
        var ptC = Point(x + w, y + h);
        var ptD = Point(x, y + h);
        var ptE = Point(x, y);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(ptA.x, ptA.y);
        ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
        ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
        ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
        ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);
        ctx.shadowColor = c;
        ctx.shadowBlur = 10;
        ctx.fillStyle = c;
        ctx.fill();
        ctx.restore();
    }

    return function paintCanvas(main, record) {
        format_data(record, box, xAxis, yAxis);
        var CANVAS = document.createElement('canvas');
        var main_width = main.clientWidth;
        var main_height = main.clientHeight;
        var base_width = 300;//设计稿宽度为600
        var base_height = 250;//设计稿高度为500
        var title = record.title;
        var title_en = cn_to_en(title.slice(0, 2)) + ' ' + title_en_end;
        delta = dpr * main_width / base_width;
        CANVAS.width = base_width * delta;
        CANVAS.height = base_height * delta;
        CANVAS.style.width = main_width + 'px';
        CANVAS.style.height = main_height + 'px';
        var CONTEXT = CANVAS.getContext('2d');
        var center = Point(base_width / 2, base_height / 2);

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
            paintBar(CONTEXT, {
                x: box.left + xAxis.bar.left + index * xAxis.label.space,
                y: xAxis.bar.bottom - xAxis.bar.totalH * (parseInt(record.data1[index]) / yAxis.label.max),
                w: xAxis.bar.width,
                h: xAxis.bar.totalH * (parseInt(record.data1[index]) / yAxis.label.max),
                c: xAxis.bar.color1
            });
            paintBar(CONTEXT, {
                x: box.left + xAxis.bar.left + xAxis.bar.width + xAxis.bar.space + index * xAxis.label.space,
                y: xAxis.bar.bottom - xAxis.bar.totalH * (parseInt(record.data2[index]) / yAxis.label.max),
                w: xAxis.bar.width,
                h: xAxis.bar.totalH * (parseInt(record.data2[index]) / yAxis.label.max),
                c: xAxis.bar.color2
            })
        });

        writeText(CONTEXT, {
            x: center.x,
            y: 230,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: remark,
            fontSize: 7,
            fill: true
        });

        main.appendChild(CANVAS);
        console.log(delta, center, CANVAS)
    }
}

var main = document.getElementById('main4');
var chart = chart4();
chart(main, record);