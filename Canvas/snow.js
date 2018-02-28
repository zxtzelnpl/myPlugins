/**
 * 雪花效果
 * @param {object} snowData
 * */
function snowFlake(snowData) {
  var snowWrap = document.getElementById(snowData.container);
  var dpr = window.devicePixelRatio;
  var WIDTH = snowWrap.scrollWidth*dpr;
  var HEIGHT = snowWrap.scrollHeight*dpr;

  var snowCanvas = document.createElement('canvas');
  snowCanvas.width = WIDTH;
  snowCanvas.height = HEIGHT;
  snowWrap.appendChild(snowCanvas);
  var snowContext = snowCanvas.getContext('2d');
  snowCanvas.width = WIDTH;
  snowCanvas.height = HEIGHT;

  /**
   * 屏幕自适应
   * 函数节流
   */
  window.addEventListener('resize',function(){
    clearTimeout(window.restrictSnowFlake);
    window.restrictSnowFlake = setTimeout(function(){
      WIDTH = snowWrap.scrollWidth*dpr;
      HEIGHT = snowWrap.scrollHeight*dpr;
      snowCanvas.width = WIDTH;
      snowCanvas.height = HEIGHT;
    },300)
  });

  var count = snowData.count;
  var snowImages = snowData.snowImages;
  var snowInCanvas = [];
  var snowImgEle = [];
  var loadCount = 0;
  var d = 0;

  /**
   * 绘制雪花
   * 动画开始
   */
  function snowing() {
    snowContext.clearRect(0, 0, WIDTH, HEIGHT);
    snowContext.beginPath();
    for (var i = 0; i < count; i++) {
      var snow = snowInCanvas[i];
      if (snow.img) {
        snowContext.drawImage(snow.img, snow.x, snow.y, snow.r * 2, snow.r * 2)
      }
    }
    flow();
    requestAnimationFrame(function () {
      snowing()
    })
  }

  /**
   * 雪花移动
   */
  function flow() {
    d += 0.01;
    for (var i = 0; i < count; i++) {
      var snow = snowInCanvas[i];
      snow.y += Math.cos(d + snow.d) + 1 + snow.r / 10;
      snow.x += Math.sin(d) * 2;
      if (snow.x > WIDTH + 5 || snow.x < -5 || snow.y > HEIGHT) {
        if (i % 3 > 0) {
          snowInCanvas[i] = {
            img: snowImgEle[Math.floor(Math.random() * snowImgEle.length)],
            x: Math.random() * WIDTH,
            y: -10,
            r: snow.r,
            d: snow.d,
            a: snow.a
          }
        } else {
          if (Math.sin(d) > 0) {
            snowInCanvas[i] = {
              img: snowImgEle[Math.floor(Math.random() * snowImgEle.length)],
              x: -5,
              y: Math.random() * HEIGHT,
              r: snow.r,
              d: snow.d,
              a: snow.a
            }
          } else {
            snowInCanvas[i] = {
              img: snowImgEle[Math.floor(Math.random() * snowImgEle.length)],
              x: WIDTH + 5,
              y: Math.random() * HEIGHT,
              r: snow.r,
              d: snow.d,
              a: snow.a
            }
          }
        }
      }
    }
  }

  /**
   * 依次生成image元素然后添加进数组
   * */
  for (var i = 0; i < snowImages.length; i++) {
    var snowImage = new Image();
    snowImage.onload = function () {
      snowImgEle.push(this);
      loadCount++;
      if (loadCount === snowImages.length) {
        for (var j = 0; j < count; j++) {
          snowInCanvas.push({
            img: snowImgEle[Math.floor(Math.random() * snowImgEle.length)],
            x: Math.random() * WIDTH,
            y: Math.random() * HEIGHT,
            r: Math.random() * (snowData.snowRadius[1]-snowData.snowRadius[0]) + snowData.snowRadius[0],        //雪花半径
            d: Math.random() * count,
            a: Math.random() + 0.5
          })
        }
        snowing()
      }
    };
    snowImage.src = snowImages[i];
  }
};