// var str = "%5Cu6E38%5Cu5BA2cecFh645";
// var str2="\u6E38\u5BA2cecFh645";
function unicodeToChina(str){
    // return eval("'" + str + "'");
    return unescape(str.replace(/\\u/g, "%u"));
}
