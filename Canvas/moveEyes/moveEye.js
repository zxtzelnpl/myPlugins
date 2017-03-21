'use strict';
var myPencil = {
  circle: function (ctx, x, y, r, c) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore()
  }
  , ring: function (ctx, x, y, r, w, c) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = c;
    ctx.lineWidth = w;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore()
  }
  , sectorFill: function (ctx, x, y, r, s, e, c) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(x, y, r, s, e);
    ctx.fill();
    ctx.restore()
  }
  , fillRect: function (ctx, x, y, w, h, c) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }
  , distance: function (A, B) {
    return Math.sqrt(Math.pow((A.x - B.x), 2) + Math.pow((A.y - B.y), 2))
  }
};

(function () {
  var canvas = document.getElementById('canvas');

  var WIDTH = canvas.scrollWidth;
  var HEIGHT = canvas.scrollHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  var context = canvas.getContext('2d');
  var bob = {
    face: {
      width: 480
      , height: 320
      , bottom: 100
      , left: 0.5
      // ,color:'#dac82c'
      , color: '#fff'
    }
    , mouth: {
      radius: 100
      , bottom: 20
      , left: 0.5
      , s: 0
      , e: Math.PI
      // ,color:'#e55b30'
      , color: '#fff'
    }
    , eye: {
      top: 20
      , radius: 75
      , ballRadius: 30
      , socket: 5
      , original: {
        left: {
          x: 0
          , y: 0
        }
        , right: {
          x: 0
          , y: 0
        }
      }
      , now: {
        left: {
          x: 0
          , y: 0
        }
        , right: {
          x: 0
          , y: 0
        }
      }
      , to: {
        left: {
          x: 0
          , y: 0
        }
        , right: {
          x: 0
          , y: 0
        }
      }
      , step: {
        left: {
          x: 0
          , y: 0
        }
        , right: {
          x: 0
          , y: 0
        }
      }
    }
  };
  var animate = {
    throttle: null

  };

  /**paintFace*/
  function paintFace() {
    var x, y;
    x = WIDTH * bob.face.left - bob.face.width / 2;
    y = HEIGHT - bob.face.height - bob.face.bottom;
    myPencil.fillRect(context, x, y, bob.face.width, bob.face.height, bob.face.color);
  }

  /**paintMouse*/
  function paintMouth() {
    var x, y;
    x = WIDTH * bob.face.left - bob.face.width / 2 + bob.face.width * bob.mouth.left;
    y = HEIGHT - bob.face.bottom - bob.mouth.bottom - bob.mouth.radius;
    myPencil.sectorFill(context, x, y, bob.mouth.radius, bob.mouth.s, bob.mouth.e, bob.mouth.color)
  }

  /**paintEye*/
  function paintEye(Point){
    var x=Point.x
        ,y=Point.y;
    myPencil.circle(context, x, y, bob.eye.radius, '#fff');
    myPencil.ring(context, x, y, bob.eye.radius, bob.eye.socket, '#fff');
    myPencil.circle(context, x, y, bob.eye.ballRadius, '#000');
  }

  /**paintLeftEye*/
  function paintLeftEye() {
    bob.eye.original.left.x = bob.eye.now.left.x = (WIDTH - bob.face.width) / 2 + bob.face.width / 2 / 2;
    bob.eye.original.left.x = bob.eye.now.left.y = HEIGHT - bob.face.height - bob.face.bottom + bob.eye.top + bob.eye.radius;
    paintEye(bob.eye.now.left)
  }

  /**paintRightEye*/
  function paintRightEye() {
    bob.eye.original.right.x = bob.eye.now.right.x = WIDTH / 2 + bob.face.width / 2 / 2;
    bob.eye.original.right.y = bob.eye.now.right.y = HEIGHT - bob.face.height - bob.face.bottom + bob.eye.top + bob.eye.radius;

    paintEye(bob.eye.now.right)
  }

  /**mouseMove*/
  function mouseMove(e) {
    if (animate.throttle) {
      clearTimeout(animate.throttle);
    }
    animate.throttle = setTimeout(function () {
      var mx
          , my
          , x
          , y
          , X
          , Y
          , dx
          , dy
          , dR = bob.eye.radius-bob.eye.ballRadius-bob.eye.socket
          ;
      e.stopPropagation();
      mx = e.clientX;
      my = e.clientY;

      if (mx < bob.eye.original.left.x) {
        x = mx - (WIDTH - bob.face.width) / 2;
        y = my - (HEIGHT - bob.face.height - bob.face.bottom);
        X = 0-(WIDTH - bob.face.width) / 2;
        Y = 0-(HEIGHT - bob.face.height - bob.face.bottom);
        dx=x/X*dR;
        dy=y/Y*dR;

        console.log(mx,bob.eye.original.left.x);


      } else if (mx < WIDTH / 2) {

      } else if (mx < bob.eye.original.right.x) {

      } else {

      }
      bob.eye.to.left.x=bob.eye.now.left.x-dx;
      bob.eye.to.left.y=bob.eye.now.left.y-dy;
      bob.eye.to.right.x=bob.eye.now.right.x-dx;
      bob.eye.to.right.y=bob.eye.now.right.y-dy;
      context.clearRect(0,0,WIDTH,HEIGHT);
      paintFace();
      paintMouth();
      paintEye(bob.eye.to.left);
      paintEye(bob.eye.to.right);


    }, 300);

  }


  paintFace();
  paintMouth();
  paintRightEye();
  paintLeftEye();


  canvas.addEventListener('mousemove', mouseMove, false)
}());