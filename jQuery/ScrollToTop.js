/*滚回顶部插件*/
(function ($) {
    var ScrollToTop = (function(){
        function ScrollToTop (element, options){
            this.settings = $.extend(true, $.fn.ScrollToTop.defaults, options||{});
            this.element = element;
            this.init();
        }
        ScrollToTop.prototype={
            init:function(){
                var me = this;
                me._initEvent();
            },
            _initEvent:function(){
                var me = this;
                $(window).on('scroll',function(){
                    if ($(window).scrollTop()>me.settings.pageHeight){
                        me.element.fadeIn(me.settings.showTime);
                    }
                    else
                    {
                        me.element.fadeOut(me.settings.showTime);
                    }
                })
                /*当点击跳转链接后，回到页面顶部位置*/
                me.element.on('click',function(){
                    $('body,html').animate({scrollTop:0},me.settings.scrollTime,me.settings.easing);
                    return false;
                })
            }
        }
        return ScrollToTop;
    })();
    $.fn.ScrollToTop = function (options) {
        return this.each(function () {
            var me = $(this),
                instance = me.data('ScrollToTop');
            if (!instance) {
                me.data('ScrollToTop', (instance = new ScrollToTop(me, options)));
            }
        })
    };
    $.fn.ScrollToTop.defaults={
        pageHeight:500,//一屏的高度
        showTime:1000,//按钮淡入淡出事件
        scrollTime:1000,//滚动时间
        easing:'swing'//滚动效果
    }
    $(function(){
        $('[data-ScrollToTop]').ScrollToTop();
    });
})(jQuery);