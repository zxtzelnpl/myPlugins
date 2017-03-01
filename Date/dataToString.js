var str='2017-02-28T07:31:54.375Z';
var data=new Date(str);
var now=new Date();

console.log(data);
console.log(now);

console.log('toDateString');
console.log(data.toDateString());
console.log(now.toDateString());
console.log('');

console.log('toISOString');
console.log(data.toISOString());
console.log(now.toISOString());
console.log('');

console.log('toJSON');
console.log(data.toJSON());
console.log(now.toJSON());
console.log('');

console.log('toLocaleDateString');
console.log(data.toLocaleDateString());
console.log(now.toLocaleDateString());
console.log('');

console.log('toLocaleString');
console.log(data.toLocaleString());
console.log(now.toLocaleString());
console.log('');

console.log('toLocaleTimeString');
console.log(data.toLocaleTimeString());
console.log(now.toLocaleTimeString());
console.log('');

console.log('toString');
console.log(data.toString());
console.log(now.toString());
console.log('');

console.log('toTimeString');
console.log(data.toTimeString());
console.log(now.toTimeString());
console.log('');

console.log('toUTCString');
console.log(data.toUTCString());
console.log(now.toUTCString());
console.log('');

console.log('valueOf');
console.log(data.valueOf());
console.log(now.valueOf());
console.log('');



