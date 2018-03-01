(function($){
    'use strict'

    var LoadMore = (function(){
        function LoadMore($element,options){
            this.check(options);

            this.loadMoreElement = $element;
            this.loadTime = null;
            this.loadControl = true;
            this.loadFunction = options.loadFunction;
            this.init();
        }

        LoadMore.prototype = {
            check:function(options){
                if(typeof options!=='object'){
                    throw new Error('需要传入一个对象')
                }
                if(typeof options.loadFunction!=='function'){
                    throw new Error('没有加载函数')
                }
            },
            init:function(){
                window.addEventListener('scroll',function(){
                    clearTimeout(this.loadTime);
                    this.loadTime = setTimeout(this.load.bind(this),300);
                }.bind(this));
                console.info('loadMore组件加载完毕')
            },
            load:function(){
                console.log('loadMore');
                if(this.loadControl){
                    console.log(this.loadMoreElement);
                    var loadMoreElement = this.loadMoreElement[0];
                    var bottom = loadMoreElement.getBoundingClientRect().bottom;
                    var height = window.innerHeight;
                    var hasMore = this.loadMoreElement.data('hasmore');//是否有更多数据
                    // console.table({bottom,height,hasMore});
                    if(bottom<=height+30&&hasMore==1){
                        this.loadControl = false;
                        this.loadFunction(this.loadEnd.bind(this));
                    }
                }

            },
            loadEnd:function(){
                console.info('加载完毕');
                this.loadControl = true;
            }
        };

        return LoadMore
    })();

    $.fn.loadMore = function(options){
        return this.each(function(){
            var me = $(this),
                instance = me.data('LoadMore');
            if(!instance){
                me.data('LoadMore', (instance = new LoadMore(me,options)));
            }
        })
    }
})(jQuery);