/**
 * Created by zxt_z on 2017/3/4.
 */
$.ajax_me = (function (_ajax) {
    var queue = []   //用于维护的队列
        , index = 0; //记录目前的执行顺序
    //执行之前先维护队列
    function _beforesend(options) {
        queue.push({
            options: options
            , data: undefined
            , err: undefined
        })
    }

    // 每次获得结果这个函数都会执行一遍
    function excute() {
        // console.log('excute',index);
        for (; index < queue.length; index++) {
            if (queue[index].data) {
                queue[index].options._success(queue[index].data)
            } else if (queue[index].err) {
                queue[index].options._error(queue[index].err)
            } else {
                return;
            }
        }
    }

    return function (url, options) {

        // 合并属性
        if (typeof url === "object") {
            options = url;
            url = undefined;
        } else {
            options.url = url;
        }

        // 标记便于回头查找
        options._id = queue.length;
        options.success = function (data) {
            queue[options._id].data = data;
            excute()
        };
        options.error = function (err) {
            queue[options._id].err = err;
            excute()
        };
        _beforesend(options);
        // console.log(options);
        // console.log(queue);
        _ajax(options);
    };
})($.ajax);