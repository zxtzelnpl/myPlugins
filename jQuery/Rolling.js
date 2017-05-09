
/**
 * 计算每天增加人数
 * @param rollData {object}
 * object.showBox
 * object.moveBox
 * object.box
 * object.speed
 */

function rolling(rollData) {
    var $showBox = $(rollData.showBox);
    var $moveBox = $showBox.find(rollData.moveBox);
    var $box = $moveBox.find(rollData.box);
    var showHeight=$showBox.height();
    var boxHeight = $box.height();
    var boxNumbers = $box.length;
    var repeatNumber = Math.ceil(showHeight / boxHeight);
    var clones = $moveBox.find(rollData.box+":lt(" + repeatNumber + ")").clone();

    $moveBox.append(clones);

    $moveBox.css({
        '-webkit-transition': 'all ' + rollData.speed + 'ms linear',
        'transition': 'all ' + rollData.speed + 'ms linear',
        '-webkit-transform': 'translateY(-' + boxHeight * boxNumbers + 'px)',
        'transform': 'translateY(-' + boxHeight * boxNumbers + 'px)'
    });

    $moveBox.on('transitionend webkitTransitionEnd', function () {
        $moveBox.css({
            '-webkit-transition': '',
            'transition': '',
            'transform': '',
            '-webkit-transform': ''
        });
        setTimeout(function () {
            $moveBox.css({
                '-webkit-transition': 'all ' + rollData.speed + 'ms linear',
                'transition': 'all ' + rollData.speed + 'ms linear',
                '-webkit-transform': 'translateY(-' + boxHeight * boxNumbers + 'px)',
                'transform': 'translateY(-' + boxHeight * boxNumbers + 'px)'
            });
        })
    });
}