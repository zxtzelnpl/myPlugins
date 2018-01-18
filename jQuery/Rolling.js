/**
 * 名单垂直滚动
 * @param rollData {object}
 * object.showBox
 * object.moveBox
 * object.box
 * object.speed
 */

function rolling (rollData) {
  var $showBox = $(rollData.showBox); //Box
  var $moveBox = $showBox.find(rollData.moveBox);  //内部包裹
  var $box = $moveBox.find(rollData.box);  //每个Item
  var showHeight = $showBox.height();  // Box高度
  var boxHeight = $box.height();  //每个Item高度
  var boxNumbers = $box.length;  // Item的个数

  /**
   * 如果高度不满，则不滚动
   * */
  if(boxNumbers*boxHeight<=showHeight){
    return false
  }

  var repeatNumber = Math.ceil(showHeight / boxHeight);
  var clones = $moveBox.find(rollData.box + ":lt(" + repeatNumber + ")").clone();

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