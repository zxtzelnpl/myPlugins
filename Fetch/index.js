'use strict'

const url = 'www.zxt.com'

/**第一种写法**/
{
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  let body = 'name=zxt&age=18'
  let init={
    method:'GET',
    mode: 'no-cors', //是否跨域
    headers:myHeaders,
    credentials:'include',  //默认是omit，改成include则会带cookie
    cache: 'default', //缓存
    body:body
  }
  fetch(url,init).then(res=>res.json).then(json=>{console.log(json)})
}






/**第二种写法**/
{
  let myHeaders={
    'Content-Type':'application/json'
  }
  let value={name:'zxt',age:18}
  let init={
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(value),
    headers:myHeaders
  }
  fetch(url,init).then(res=>res.json).then(json=>{console.log(json)})
}


/**第三种写法**/
{
  let value={name:'zxt',age:18}
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  let request = new Request(url, {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify(value),
  headers: myHeaders
  });
  fetch(request).then(res=>res.json).then(json=>{console.log(json)})
}

