'use strict'

function getMoble() {
  let prefixArray = ["130", "131", "132", "133", "135", "137", "138", "150", "156", "157", "159", "170", "176", "177", "178", "182", "185", "187", "188", "189"];
  let len = prefixArray.length
  let i = Math.floor(len * Math.random());
  let prefix = prefixArray[i] + '****';
  for (let j = 0; j < 4; j++) {
    prefix += Math.floor(Math.random() * 10);
  }
  return prefix
}