//http://dz.pi7.info/thread0806.php?fid=7&search=&page=1
var url = 'http://dz.pi7.info/thread0806.php?fid=7&search=&page=';
var jquery = 'http://www.jyzqsh.com/javascript/jquery-1.9.1.min.js';
var test = 'http://www.jyzqsh.com/';

var page = require('webpage').create();
console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';


// page.open(url+1, function (status) {
//     if (status !== 'success') {
//         console.log('Unable to access network');
//     } else {
//         var ua = page.evaluate(function () {
//             var urls=[];
//             var table=document.getElementById('ajaxtable');
//             var links=table.querySelectorAll('.tal h3 a');
//             var length=links.length;
//             for(var i=0;i<length;i++){
//                 urls.push({
//                     name:links[i].innerHTML,
//                     url:links[i].getAttribute('href')
//                 })
//             }
//             return urls;
//         });
//         ua.forEach(function(td){
//             if(td.name.indexOf('红杏出墙系列')>-1){
//                 console.log('红杏出墙'+td.name,'http://dz.pi7.info/'+td.url);
//             }
//         });
//     }
// });


function craw(index) {
    if(index>100){
        phantom.exit();
    }

    page.open(url + index, function (status) {
        if (status !== 'success') {
            console.log('Unable to access network');
        } else {
            var ua = page.evaluate(function () {
                var urls = [];
                var table = document.getElementById('ajaxtable');
                var links = table.querySelectorAll('.tal h3 a');
                var length = links.length;
                for (var i = 0; i < length; i++) {
                    urls.push({
                        name: links[i].innerHTML,
                        url: links[i].getAttribute('href')
                    })
                }
                return urls;
            });
            console.log(index);
            ua.forEach(function (td) {
                if (td.name.indexOf('磁') > -1) {
                    console.log('磁：' + td.name, 'http://dz.pi7.info/' + td.url);
                }
            });
            index++;
            arrFun[index]();
        }
    });
}

var arrFun = [0];
for (var i = 1; i <= 100; i++) {
    (function (i) {
        arrFun.push(function () {
            return craw(i)
        })
    })(i)
}

arrFun[1]();

