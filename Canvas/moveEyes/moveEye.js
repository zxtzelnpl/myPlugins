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
            , color: '#dac82c'
            // , color: '#fff'
        }
        , mouth: {
            radius: 100
            , bottom: 20
            , left: 0.5
            , s: 0
            , e: Math.PI
            , color: '#e55b30'
            // , color: '#fff'
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
        ,count:10
        ,i:0
    };

    /**init*/
    function init(){

    }

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
    function paintEyeBall(Point) {
        var x = Point.x
            , y = Point.y;
        myPencil.circle(context, x, y, bob.eye.ballRadius, '#000');
    }

    /**paintLeftEye*/
    function paintLeftEye() {
        bob.eye.original.left.x = bob.eye.now.left.x = (WIDTH - bob.face.width) / 2 + bob.face.width / 2 / 2;
        bob.eye.original.left.y = bob.eye.now.left.y = HEIGHT - bob.face.height - bob.face.bottom + bob.eye.top + bob.eye.radius;
        myPencil.circle(context, bob.eye.original.left.x, bob.eye.original.left.y, bob.eye.radius, '#fff');
        myPencil.ring(context, bob.eye.original.left.x, bob.eye.original.left.y, bob.eye.radius, bob.eye.socket, '#000');
    }

    /**paintRightEye*/
    function paintRightEye() {
        bob.eye.original.right.x = bob.eye.now.right.x = WIDTH / 2 + bob.face.width / 2 / 2;
        bob.eye.original.right.y = bob.eye.now.right.y = HEIGHT - bob.face.height - bob.face.bottom + bob.eye.top + bob.eye.radius;
        myPencil.circle(context, bob.eye.original.right.x, bob.eye.original.right.y, bob.eye.radius, '#fff');
        myPencil.ring(context, bob.eye.original.right.x, bob.eye.original.right.y, bob.eye.radius, bob.eye.socket, '#000');
    }

    /**animate*/
    function loop(){
        animate.i++;
        bob.eye.now.left.x+=bob.eye.step.left.x;
        bob.eye.now.left.y+=bob.eye.step.left.y;
        bob.eye.now.right.x+=bob.eye.step.right.x;
        bob.eye.now.right.y+=bob.eye.step.right.y;
        context.clearRect(0, 0, WIDTH, HEIGHT);
        paintFace();
        paintMouth();
        paintRightEye();
        paintLeftEye();
        paintEyeBall(bob.eye.now.left);
        paintEyeBall(bob.eye.now.right);
        console.log(bob.eye.now.left.x,bob.eye.to.left.x);
        if(animate.i<animate.count){
            requestAnimationFrame(loop)
        }
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
                , dR = bob.eye.radius - bob.eye.ballRadius - bob.eye.socket
                ;
            e.stopPropagation();
            mx = e.clientX;
            my = e.clientY;
            animate.i=0;

            if (mx < bob.eye.original.left.x) {
                x = mx - bob.eye.original.left.x;
                y = my - bob.eye.original.left.y;
                X = 0 - bob.eye.original.left.x;
                Y = 0 - bob.eye.original.left.y;
                dx = x / X * dR;
                dy = y / Y * dR;
                bob.eye.to.left.x = bob.eye.original.left.x - dx;
                bob.eye.to.left.y = bob.eye.original.left.y - dy;
                bob.eye.to.right.x = bob.eye.original.right.x - dx;
                bob.eye.to.right.y = bob.eye.original.right.y - dy;
            } else if (mx < WIDTH / 2) {
                x = mx - bob.eye.original.left.x;
                y = my - bob.eye.original.left.y;
                X = 0 - bob.eye.original.left.x;
                Y = 0 - bob.eye.original.left.y;
                dx = x / X * dR;
                dy = y / Y * dR;
                bob.eye.to.left.x = bob.eye.original.left.x - dx;
                bob.eye.to.left.y = bob.eye.original.left.y - dy;
                bob.eye.to.right.x = bob.eye.original.right.x + dx;
                bob.eye.to.right.y = bob.eye.original.right.y - dy;
            } else if (mx < bob.eye.original.right.x) {
                x = mx - bob.eye.original.right.x;
                y = my - bob.eye.original.right.y;
                X = 0 - bob.eye.original.right.x;
                Y = 0 - bob.eye.original.right.y;
                dx = x / X * dR;
                dy = y / Y * dR;
                bob.eye.to.left.x = bob.eye.original.left.x + dx;
                bob.eye.to.left.y = bob.eye.original.left.y - dy;
                bob.eye.to.right.x = bob.eye.original.right.x - dx;
                bob.eye.to.right.y = bob.eye.original.right.y - dy;
            } else {
                x = mx - bob.eye.original.right.x;
                y = my - bob.eye.original.right.y;
                X = 0 - bob.eye.original.right.x;
                Y = 0 - bob.eye.original.right.y;
                dx = x / X * dR;
                dy = y / Y * dR;
                bob.eye.to.left.x = bob.eye.original.left.x - dx;
                bob.eye.to.left.y = bob.eye.original.left.y - dy;
                bob.eye.to.right.x = bob.eye.original.right.x - dx;
                bob.eye.to.right.y = bob.eye.original.right.y - dy;
            }

            bob.eye.step.left.x=(bob.eye.to.left.x-bob.eye.now.left.x)/animate.count;
            bob.eye.step.left.y=(bob.eye.to.left.y-bob.eye.now.left.y)/animate.count;
            bob.eye.step.right.x =(bob.eye.to.right.x-bob.eye.now.right.x)/animate.count;
            bob.eye.step.right.y =(bob.eye.to.right.y-bob.eye.now.right.y)/animate.count;


            loop();

        }, 300);
    }


    paintFace();
    paintMouth();
    paintRightEye();
    paintLeftEye();
    paintEyeBall(bob.eye.now.left);
    paintEyeBall(bob.eye.now.right);


    canvas.addEventListener('mousemove', mouseMove, false)
}());