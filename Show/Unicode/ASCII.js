var num="";
var str1="";
var str2="";
var str3="";
var str4="";
for(var i=0;i<178;i++){
    var code=String.fromCharCode(i);
    num+="<li>"+i+"</li>";
    str1+="<li>"+code+"</li>";
    if(code==escape(code)){
        str2+="<li>"+escape(code)+"</li>";
    }else{
        str2+="<li class='transform'>"+escape(code)+"</li>";
    }

    if(code==encodeURI(code)){
        str3+="<li>"+encodeURI(code)+"</li>";
    }else{
        str3+="<li class='transform'>"+encodeURI(code)+"</li>";
    }

    if(code==encodeURIComponent(code)){
        str4+="<li>"+encodeURIComponent(code)+"</li>";
    }else{
        str4+="<li class='transform'>"+encodeURIComponent(code)+"</li>";
    }
}
$("#num").append(num);
$("#show1").append(str1);
$("#escape").append(str2);
$("#encodeURI").append(str3);
$("#encodeURIComponent").append(str4);