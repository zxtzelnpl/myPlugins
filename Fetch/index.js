'use strict'

// let myHeaders = new Headers()
// myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
let body = 'name=zxt&age=18'
let init={
  method:'GET',
  mode: 'no-cors', //是否跨域
  headers:myHeaders,
  cache: 'default', //缓存
  body:body
}
let myHeaders={
  'Content-Type':'application/x-www-form-urlencoded'
}
fetch(url,init)
    .then(res=>res.json)
    .then(json=>{
      console.log(json)
    })

