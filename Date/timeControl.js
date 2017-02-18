function timeControl (timeSlots, week, funIn, funOut) {

    function strToTime(timeSlot) {
        var _timeSlot = timeSlot.split(':');
        var timeH = parseInt(_timeSlot[0]);
        var timeM = parseInt(_timeSlot[1]);
        var _time = timeH * 60 + timeM;
        return _time;
    }

    //星期判断
    var today = new Date().getDay();
    if (week === undefined) {
        if (today === 0 || today === 6) {
            return;
        }
    } else if (week !== today) {
        return;
    }

    var _now = new Date();
    var now = _now.getHours() * 60 + _now.getMinutes();
    //var now =17*60+10;
    var gaps = timeSlots.length * 2 + 1;
    var points = [];
    timeSlots.forEach(function (timeSlot) {
        points.push(strToTime(timeSlot.start));
        points.push(strToTime(timeSlot.end));
    });

    //console.log(now);
    //console.log(points);
    points.every(function (time, index) {
        if (now < time) {
            //console.log('every',index);
            var fun = null;
            if (index % 2 == 1) {
                funIn();
                //console.log('funIn')
            } else {
                funOut();
            }
            for (var i = index; i < gaps - 1; i++) {
                fun = i % 2 == 1 ? funOut : funIn;

                console.log(i, points[i] - now + "minutes", fun);

                setTimeout(fun, (points[i] - now) * 1000 * 60);
            }
            return false
        } else {
            return true;
        }
    })
};