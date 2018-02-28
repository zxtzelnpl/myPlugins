//通篇代码还有些问题

var DESIGN_W = 320;
var DESIGN_H = 1136;
var remFont = 16;
var rootFont = remFont;
var winWidth;
var winHeight;

function setFontREM() {
  var winWidth2 = document.documentElement.clientWidth || window.innerWidth;
  var winHeight2 = document.documentElement.clientHeight || window.innerHeight;
  if(winWidth2 !== winWidth || winHeight2 !== winHeight) {
    winWidth = winWidth2;
    winHeight = winHeight2;
    rootFont = winWidth / DESIGN_W * remFont;
    if(document && document.childNodes && document.childNodes[1] && document.childNodes[1].style) {
      document.childNodes[1].style.fontSize = rootFont + "px";
    }
  }
}
var fontTimeoutRef;
var FONT_TIME_OUT_GAP = 50;

function setFontRemTimeout() {
  if(fontTimeoutRef !== null && fontTimeoutRef !== undefined) {
    window.clearTimeout(fontTimeoutRef);
  }
  fontTimeoutRef = setTimeout(setFontREM, FONT_TIME_OUT_GAP);
}

setFontREM();
window.addEventListener("DOMContentLoaded", setFontREM);
window.addEventListener("load", setFontREM);
window.addEventListener("resize", setFontRemTimeout);
